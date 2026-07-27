#!/usr/bin/env node
// Interactive skill/task builder.
//
// Serves a small browser form on localhost that asks the questions needed to
// scaffold a new skill (the "category") or add a task to an existing skill, and
// writes the files directly into this repository following the conventions in
// README.md and AGENTS.md. Zero dependencies — Node built-ins only.
//
// Usage:
//   npm run new-skill            # then open the printed URL
//   node scripts/skill-builder.mjs --port 5000
//
// The generated SKILL.md keeps the agency safety posture: every task includes a
// review-before-save checkpoint and a failure-handling section, and a routing
// marker so this tool can add more tasks later.

import { createServer } from 'node:http';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, '..');
const skillsRoot = join(repoRoot, 'skills');

const ROUTING_MARKER = '<!-- skill-builder:routing -->';

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isValidSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function titleCase(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function lines(value) {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function listSkills() {
  if (!existsSync(skillsRoot)) return [];
  return readdirSync(skillsRoot)
    .filter((entry) => {
      const dir = join(skillsRoot, entry);
      return statSync(dir).isDirectory() && existsSync(join(dir, 'SKILL.md'));
    })
    .sort();
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function writeGitkeep(dir) {
  const keep = join(dir, '.gitkeep');
  if (!existsSync(keep)) writeFileSync(keep, '');
}

function rel(absolutePath) {
  return relative(repoRoot, absolutePath).split('\\').join('/');
}

// ---------------------------------------------------------------------------
// Content generators
// ---------------------------------------------------------------------------

function buildSkillMd({ slug, description, title }) {
  return `---
name: ${slug}
description: ${description}
---

# ${title}

Use this skill for approved workflows in this domain. The procedures here are
agency-approved: do not invent a workflow from general knowledge when a
documented task file exists.

## Determine the requested mode

### Guidance mode

Use guidance mode when the user asks how to complete a task. Read the relevant
task file, explain the steps clearly, do not interact with the user's computer,
and identify any information the user must collect before beginning.

### Execution mode

Use execution mode only when the user asks the assistant to perform the task,
computer use is available, the target application is open, and the user has
provided enough information to proceed safely. Read the task file first, verify
the correct record, follow the documented screen path, and pause before any
final save action.

## Task routing

${ROUTING_MARKER}

### Requests without a documented task

If the user asks for an operation that has no task file above:

1. Say that the operation is not yet covered by an approved procedure.
2. In guidance mode, general advice may be offered only when clearly labeled as
   not agency-approved.
3. In execution mode, do not perform the operation. Never execute an
   undocumented workflow.

## Final-save rule

During development and testing, do not select a final button such as **Save**,
**Save Log**, **Finish**, **Submit**, **Bind**, **Cancel Policy**, or **Delete**
until the user approves the proposed action. After approval and completion,
verify the saved result.

## Current request

$ARGUMENTS
`;
}

function buildRoutingBlock({ taskTitle, taskSlug, triggers, referenceFiles, screenshots }) {
  const trigger = triggers.length
    ? triggers
    : ['(add the phrases a user would say to trigger this task)'];

  const readFiles = [`\`\${CLAUDE_SKILL_DIR}/tasks/${taskSlug}.md\``];
  for (const ref of referenceFiles) {
    readFiles.push(`\`\${CLAUDE_SKILL_DIR}/references/${ref}\``);
  }

  let block = `### ${taskTitle}

When the user asks to:

${trigger.map((t) => `- ${t}`).join('\n')}

Read these files before proceeding:

${readFiles.map((f) => `- ${f}`).join('\n')}
`;

  if (screenshots.length) {
    block += `
Use these screenshots when the visible interface needs clarification:

${screenshots
      .map(
        (s) => `- \`\${CLAUDE_SKILL_DIR}/screenshots/${s.workflow}/${s.file}\``
      )
      .join('\n')}

If a screenshot file is unavailable, continue with the written procedure and
explain that the screenshot should be added later.
`;
  }

  return block;
}

function buildTaskMd({
  taskTitle,
  purpose,
  screenPath,
  requiredInfo,
  steps,
  screenshots,
  failureConditions,
  workflow
}) {
  let md = `# ${taskTitle}\n\n## Purpose\n\n${purpose || '(Describe what this task accomplishes.)'}\n`;

  if (screenPath) {
    md += `\n## Screen path\n\nUse this exact action path:\n\n${screenPath}\n`;
  }

  if (requiredInfo.length) {
    md += `\n## Required information\n\nBefore beginning, obtain:\n\n${requiredInfo
      .map((item) => `- ${item}`)
      .join('\n')}\n\nIf the user has not provided enough information, ask for the missing details before starting.\n`;
  }

  md += `\n## Procedure\n`;

  steps.forEach((step, index) => {
    md += `\n### ${index + 1}. ${step.title}\n`;
    if (step.detail) md += `\n${step.detail}\n`;
    const shots = screenshots.filter((s) => Number(s.step) === index + 1);
    for (const shot of shots) {
      md += `\n![${shot.caption || step.title}](../screenshots/${shot.workflow}/${shot.file})\n`;
    }
  });

  const reviewNumber = steps.length + 1;
  md += `\n### ${reviewNumber}. Review before saving\n\nBefore any final action, confirm:\n\n- The correct record is open\n- The entered information is accurate and complete\n- No sensitive information is included\n- Any next step is clear\n\nDuring development, pause here. Show the proposed action to the user and ask for approval before selecting a final button such as **Save**.\n`;

  const saveNumber = steps.length + 2;
  md += `\n### ${saveNumber}. Save and verify\n\nAfter the user approves, complete the save, wait for the screen to update, and confirm that the entry appears as expected. Report completion to the user.\n`;

  md += `\n## Failure handling\n\nStop and report the problem when:\n\n${failureConditions
    .map((item) => `- ${item}`)
    .join('\n')}\n`;

  // Note any screenshots not tied to a specific step so they are not lost.
  const looseShots = screenshots.filter(
    (s) => !s.step || Number(s.step) < 1 || Number(s.step) > steps.length
  );
  if (looseShots.length) {
    md += `\n## Reference screenshots\n\n${looseShots
      .map((s) => `![${s.caption || 'Screenshot'}](../screenshots/${s.workflow}/${s.file})`)
      .join('\n\n')}\n`;
  }

  return md;
}

function normalizeScreenshotFile(name, index) {
  let file = slugify(name.replace(/\.png$/i, ''));
  if (!file) file = `screenshot-${index + 1}`;
  const prefix = String(index + 1).padStart(2, '0');
  return /^\d/.test(file) ? `${file}.png` : `${prefix}-${file}.png`;
}

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

function generate(payload) {
  const created = [];
  const modified = [];
  const warnings = [];

  const wantsNewSkill = payload.mode === 'new-skill';
  const wantsTask = wantsNewSkill ? payload.createTask !== false : true;

  // Resolve which skill we are working in.
  let skillSlug;
  if (wantsNewSkill) {
    skillSlug = slugify(payload.skillSlug || payload.skillTitle);
    if (!skillSlug) throw new Error('A skill name is required.');
    if (!isValidSlug(skillSlug)) {
      throw new Error(`Invalid skill name "${skillSlug}". Use lowercase-with-hyphens.`);
    }
    if (existsSync(join(skillsRoot, skillSlug))) {
      throw new Error(`Skill "${skillSlug}" already exists. Choose "add task" instead.`);
    }
  } else {
    skillSlug = payload.existingSkill;
    if (!skillSlug || !isValidSlug(skillSlug)) {
      throw new Error('Select a valid existing skill.');
    }
    if (!existsSync(join(skillsRoot, skillSlug, 'SKILL.md'))) {
      throw new Error(`Skill "${skillSlug}" was not found.`);
    }
  }

  const skillDir = join(skillsRoot, skillSlug);

  // Build the task (if any) first so we know what SKILL.md must route to.
  let task = null;
  if (wantsTask) {
    const taskTitle = (payload.taskTitle || '').trim();
    if (!taskTitle) throw new Error('A task title is required.');
    const taskSlug = slugify(payload.taskSlug || taskTitle);
    if (!isValidSlug(taskSlug)) throw new Error(`Invalid task name "${taskSlug}".`);

    const taskPath = join(skillDir, 'tasks', `${taskSlug}.md`);
    if (existsSync(taskPath)) {
      throw new Error(`Task "${taskSlug}.md" already exists in ${skillSlug}.`);
    }

    const workflow = slugify(payload.screenshotWorkflow || taskSlug) || taskSlug;

    const steps = (payload.steps || [])
      .map((s) => ({ title: (s.title || '').trim(), detail: (s.detail || '').trim() }))
      .filter((s) => s.title);
    if (!steps.length) {
      steps.push({ title: 'Complete the procedure', detail: '(Describe the step.)' });
      warnings.push('No steps were provided; a placeholder step was added.');
    }

    const screenshots = (payload.screenshots || [])
      .map((s, i) => ({
        file: normalizeScreenshotFile(s.file, i),
        caption: (s.caption || '').trim(),
        step: s.step ? Number(s.step) : null,
        workflow
      }))
      .filter((s) => s.file);

    const failureConditions = lines(payload.failureConditions);
    if (!failureConditions.length) {
      failureConditions.push(
        'The correct record cannot be verified.',
        'The visible interface does not match this procedure.',
        'The user has not supplied enough information.',
        'The application displays an error.'
      );
    }

    task = {
      taskTitle,
      taskSlug,
      workflow,
      purpose: (payload.purpose || '').trim(),
      screenPath: (payload.screenPath || '').trim(),
      requiredInfo: lines(payload.requiredInfo),
      steps,
      screenshots,
      failureConditions,
      triggers: lines(payload.triggers),
      referenceFiles: [],
      taskPath
    };
  }

  // Scaffold a brand-new skill.
  if (wantsNewSkill) {
    const description = (payload.description || '').trim();
    if (!description) throw new Error('A skill description is required.');
    const title = (payload.skillTitle || '').trim() || titleCase(skillSlug);

    ensureDir(skillDir);
    ensureDir(join(skillDir, 'tasks'));
    ensureDir(join(skillDir, 'references'));
    ensureDir(join(skillDir, 'screenshots'));
    writeGitkeep(join(skillDir, 'references'));
    writeGitkeep(join(skillDir, 'screenshots'));

    const skillMd = buildSkillMd({ slug: skillSlug, description, title });
    writeFileSync(join(skillDir, 'SKILL.md'), skillMd);
    created.push(rel(join(skillDir, 'SKILL.md')));
  }

  // Write the task file and its screenshot folder.
  if (task) {
    ensureDir(dirname(task.taskPath));
    writeFileSync(task.taskPath, buildTaskMd(task));
    created.push(rel(task.taskPath));

    if (task.screenshots.length) {
      const shotDir = join(skillDir, 'screenshots', task.workflow);
      ensureDir(shotDir);
      writeGitkeep(shotDir);
      created.push(rel(shotDir) + '/ (add PNG files here)');
    }

    // Insert routing into SKILL.md.
    const skillMdPath = join(skillDir, 'SKILL.md');
    let skillMd = readFileSync(skillMdPath, 'utf8');
    const block = buildRoutingBlock({
      taskTitle: task.taskTitle,
      taskSlug: task.taskSlug,
      triggers: task.triggers,
      referenceFiles: task.referenceFiles,
      screenshots: task.screenshots
    });

    if (skillMd.includes(ROUTING_MARKER)) {
      skillMd = skillMd.replace(ROUTING_MARKER, `${block}\n${ROUTING_MARKER}`);
    } else if (/\n### Requests without a documented task/.test(skillMd)) {
      skillMd = skillMd.replace(
        /\n### Requests without a documented task/,
        `\n${block}\n### Requests without a documented task`
      );
    } else if (/\n## Task routing\n/.test(skillMd)) {
      skillMd = skillMd.replace(/\n## Task routing\n/, `\n## Task routing\n\n${block}\n`);
    } else {
      skillMd += `\n## Task routing\n\n${block}\n`;
      warnings.push('SKILL.md had no routing section; one was appended at the end.');
    }

    writeFileSync(skillMdPath, skillMd);
    if (!wantsNewSkill) modified.push(rel(skillMdPath));
  }

  return { created, modified, warnings, skillSlug };
}

// ---------------------------------------------------------------------------
// HTTP + HTML
// ---------------------------------------------------------------------------

function page() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Skill Builder</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { font: 15px/1.5 system-ui, sans-serif; margin: 0; background: #f6f7f9; color: #16181d; }
  @media (prefers-color-scheme: dark) { body { background: #14161a; color: #e6e8ec; } }
  header { background: #1f6feb; color: #fff; padding: 20px 24px; }
  header h1 { margin: 0; font-size: 20px; }
  header p { margin: 4px 0 0; opacity: .9; font-size: 13px; }
  main { max-width: 820px; margin: 0 auto; padding: 24px; }
  fieldset { border: 1px solid #d0d4da; border-radius: 10px; margin: 0 0 20px; padding: 16px 18px; background: rgba(127,127,127,.04); }
  @media (prefers-color-scheme: dark) { fieldset { border-color: #303540; } }
  legend { font-weight: 600; padding: 0 6px; }
  label { display: block; font-weight: 600; margin: 12px 0 4px; font-size: 13px; }
  .hint { font-weight: 400; opacity: .7; font-size: 12px; }
  input[type=text], textarea, select { width: 100%; padding: 8px 10px; border: 1px solid #c3c8d0; border-radius: 7px; font: inherit; background: #fff; color: #16181d; }
  @media (prefers-color-scheme: dark) { input, textarea, select { background: #1c1f26; color: #e6e8ec; border-color: #3a4150; } }
  textarea { min-height: 70px; resize: vertical; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .repeat-item { border: 1px dashed #c3c8d0; border-radius: 8px; padding: 10px; margin: 8px 0; }
  .repeat-item .grip { display:flex; justify-content: space-between; align-items:center; margin-bottom: 6px; font-size:12px; opacity:.7; }
  button { font: inherit; cursor: pointer; border-radius: 7px; border: 1px solid transparent; padding: 8px 14px; }
  button.add { background: transparent; border-color: #1f6feb; color: #1f6feb; font-size: 13px; padding: 6px 10px; }
  button.remove { background: transparent; border: none; color: #d1242f; font-size: 12px; }
  button.primary { background: #1f6feb; color: #fff; font-size: 15px; font-weight: 600; padding: 11px 20px; }
  .mode { display: flex; gap: 16px; }
  .mode label { display: flex; align-items: center; gap: 6px; font-weight: 600; margin: 0; }
  .mode input { width: auto; }
  #result { white-space: pre-wrap; border-radius: 10px; padding: 16px; margin-top: 8px; display: none; }
  #result.ok { background: #e6f4ea; color: #10502a; border: 1px solid #9cd6ab; }
  #result.err { background: #fbe9ea; color: #86151b; border: 1px solid #eaa3a7; }
  @media (prefers-color-scheme: dark) {
    #result.ok { background: #10261a; color: #7ee2a8; border-color: #1f5236; }
    #result.err { background: #2a1416; color: #f0a5a9; border-color: #5a2226; }
  }
  code { background: rgba(127,127,127,.15); padding: 1px 5px; border-radius: 4px; }
</style>
</head>
<body>
<header>
  <h1>Skill Builder</h1>
  <p>Answer the questions to add a task to an existing skill, or scaffold a new HawkSoft category. Files are written straight into the repo.</p>
</header>
<main>
  <fieldset>
    <legend>What do you want to create?</legend>
    <div class="mode">
      <label><input type="radio" name="mode" value="add-task" checked> A task in an existing skill</label>
      <label><input type="radio" name="mode" value="new-skill"> A new HawkSoft category (its own <code>/hawksoft:</code> command)</label>
    </div>
    <p class="hint">Most additions are tasks. Create a new category only when the procedures deserve their own command and routing (e.g. claims, billing).</p>
  </fieldset>

  <fieldset id="skill-fields" style="display:none;">
    <legend>New HawkSoft category</legend>
    <label>Skill name <span class="hint">lowercase-with-hyphens; becomes the command <code>/hawksoft:&lt;name&gt;</code></span></label>
    <input type="text" id="skillSlug" placeholder="policy-servicing" />
    <label>Display title <span class="hint">optional; defaults from the name</span></label>
    <input type="text" id="skillTitle" placeholder="Policy Servicing" />
    <label>Description <span class="hint">what it does + when the assistant should use it (mention trigger words)</span></label>
    <textarea id="description" placeholder="Guide or perform approved policy servicing workflows. Use whenever the user asks to endorse, renew, or review a policy in HawkSoft."></textarea>
    <label style="margin-top:14px;"><input type="checkbox" id="createTask" checked style="width:auto;margin-right:6px;"> Also add a first task now</label>
  </fieldset>

  <fieldset id="existing-fields">
    <legend>Existing skill</legend>
    <label>Which skill gets the new task?</label>
    <select id="existingSkill"></select>
  </fieldset>

  <fieldset id="task-fields">
    <legend>Task</legend>
    <label>Task title</label>
    <input type="text" id="taskTitle" placeholder="Log an outbound phone call" />
    <label>File name <span class="hint">optional; defaults from the title</span></label>
    <input type="text" id="taskSlug" placeholder="log-outbound-phone-call" />
    <label>Purpose</label>
    <textarea id="purpose" placeholder="Document an outbound call to an insured in the correct client record."></textarea>
    <label>Screen path <span class="hint">breadcrumb style, e.g. Action &rarr; Phone &rarr; To &rarr; Insured &rarr; Log</span></label>
    <input type="text" id="screenPath" placeholder="Action → Phone → To → Insured → Log" />
    <label>Trigger phrases <span class="hint">one per line; how a user would ask for this</span></label>
    <textarea id="triggers" placeholder="Log an outbound call&#10;Record a call I made to a customer"></textarea>
    <label>Required information <span class="hint">one item per line</span></label>
    <textarea id="requiredInfo" placeholder="The correct client record&#10;Who was called&#10;Reason for the call&#10;Action taken"></textarea>

    <label>Steps</label>
    <div id="steps"></div>
    <button type="button" class="add" onclick="addStep()">+ Add step</button>

    <label style="margin-top:16px;">Screenshots <span class="hint">optional; folder + files you plan to capture</span></label>
    <input type="text" id="screenshotWorkflow" placeholder="workflow folder name (defaults from task name)" />
    <div id="screenshots"></div>
    <button type="button" class="add" onclick="addShot()">+ Add screenshot</button>

    <label style="margin-top:16px;">Failure conditions <span class="hint">one per line; leave blank for sensible defaults</span></label>
    <textarea id="failureConditions" placeholder="The client cannot be verified.&#10;The screen does not match this procedure."></textarea>
  </fieldset>

  <button type="button" class="primary" onclick="submitForm()">Create files</button>
  <div id="result"></div>
</main>

<script>
let stepN = 0, shotN = 0;
function addStep(title = '', detail = '') {
  stepN++;
  const el = document.createElement('div');
  el.className = 'repeat-item';
  el.innerHTML = '<div class="grip"><span>Step</span><button type="button" class="remove" onclick="this.closest(\\'.repeat-item\\').remove()">remove</button></div>' +
    '<input type="text" class="step-title" placeholder="Step title" />' +
    '<textarea class="step-detail" placeholder="What to do in this step" style="margin-top:6px;"></textarea>';
  document.getElementById('steps').appendChild(el);
  el.querySelector('.step-title').value = title;
  el.querySelector('.step-detail').value = detail;
}
function addShot() {
  shotN++;
  const el = document.createElement('div');
  el.className = 'repeat-item';
  el.innerHTML = '<div class="grip"><span>Screenshot</span><button type="button" class="remove" onclick="this.closest(\\'.repeat-item\\').remove()">remove</button></div>' +
    '<div class="row"><input type="text" class="shot-file" placeholder="file name (e.g. action-menu)" />' +
    '<input type="text" class="shot-step" placeholder="attach to step # (optional)" /></div>' +
    '<input type="text" class="shot-caption" placeholder="caption" style="margin-top:6px;" />';
  document.getElementById('screenshots').appendChild(el);
}

function refreshMode() {
  const mode = document.querySelector('input[name=mode]:checked').value;
  const isNew = mode === 'new-skill';
  document.getElementById('skill-fields').style.display = isNew ? '' : 'none';
  document.getElementById('existing-fields').style.display = isNew ? 'none' : '';
  const createTask = document.getElementById('createTask').checked;
  document.getElementById('task-fields').style.display = (!isNew || createTask) ? '' : 'none';
}
document.querySelectorAll('input[name=mode]').forEach(r => r.addEventListener('change', refreshMode));
document.getElementById('createTask').addEventListener('change', refreshMode);

async function loadSkills() {
  const res = await fetch('/api/skills');
  const skills = await res.json();
  const sel = document.getElementById('existingSkill');
  sel.innerHTML = skills.map(s => '<option value="' + s + '">' + s + '</option>').join('');
}

function collectTask() {
  const steps = [...document.querySelectorAll('#steps .repeat-item')].map(el => ({
    title: el.querySelector('.step-title').value,
    detail: el.querySelector('.step-detail').value
  }));
  const screenshots = [...document.querySelectorAll('#screenshots .repeat-item')].map(el => ({
    file: el.querySelector('.shot-file').value,
    step: el.querySelector('.shot-step').value,
    caption: el.querySelector('.shot-caption').value
  })).filter(s => s.file.trim());
  return {
    taskTitle: document.getElementById('taskTitle').value,
    taskSlug: document.getElementById('taskSlug').value,
    purpose: document.getElementById('purpose').value,
    screenPath: document.getElementById('screenPath').value,
    triggers: document.getElementById('triggers').value,
    requiredInfo: document.getElementById('requiredInfo').value,
    steps,
    screenshotWorkflow: document.getElementById('screenshotWorkflow').value,
    screenshots,
    failureConditions: document.getElementById('failureConditions').value
  };
}

async function submitForm() {
  const mode = document.querySelector('input[name=mode]:checked').value;
  const payload = { mode, ...collectTask() };
  if (mode === 'new-skill') {
    payload.skillSlug = document.getElementById('skillSlug').value;
    payload.skillTitle = document.getElementById('skillTitle').value;
    payload.description = document.getElementById('description').value;
    payload.createTask = document.getElementById('createTask').checked;
  } else {
    payload.existingSkill = document.getElementById('existingSkill').value;
  }
  const box = document.getElementById('result');
  box.style.display = 'block';
  box.className = '';
  box.textContent = 'Working...';
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Unknown error');
    box.className = 'ok';
    let out = 'Done — skill "' + data.skillSlug + '".\\n\\n';
    if (data.created.length) out += 'Created:\\n' + data.created.map(f => '  + ' + f).join('\\n') + '\\n';
    if (data.modified.length) out += '\\nUpdated:\\n' + data.modified.map(f => '  ~ ' + f).join('\\n') + '\\n';
    if (data.warnings.length) out += '\\nNotes:\\n' + data.warnings.map(w => '  ! ' + w).join('\\n') + '\\n';
    out += '\\nNext: run  npm test  , then /reload-plugins in Claude Code.';
    box.textContent = out;
    if (mode === 'add-task') loadSkills();
  } catch (e) {
    box.className = 'err';
    box.textContent = 'Error: ' + e.message;
  }
}

loadSkills();
addStep();
refreshMode();
</script>
</body>
</html>`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) reject(new Error('Payload too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function json(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(body);
}

function parseArgPort() {
  const idx = process.argv.indexOf('--port');
  if (idx !== -1 && process.argv[idx + 1]) return Number(process.argv[idx + 1]);
  if (process.env.PORT) return Number(process.env.PORT);
  return 4600;
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(page());
      return;
    }
    if (req.method === 'GET' && req.url === '/api/skills') {
      json(res, 200, listSkills());
      return;
    }
    if (req.method === 'POST' && req.url === '/api/generate') {
      const body = await readBody(req);
      let payload;
      try {
        payload = JSON.parse(body || '{}');
      } catch {
        json(res, 400, { error: 'Invalid JSON body.' });
        return;
      }
      try {
        const result = generate(payload);
        json(res, 200, result);
      } catch (err) {
        json(res, 400, { error: err.message });
      }
      return;
    }
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
  } catch (err) {
    json(res, 500, { error: err.message });
  }
});

const port = parseArgPort();
server.listen(port, '127.0.0.1', () => {
  console.log(`\nSkill Builder running at  http://127.0.0.1:${port}\n`);
  console.log('Open that URL in a browser, fill in the form, and files will be');
  console.log('written into skills/. Press Ctrl+C to stop.\n');
});
