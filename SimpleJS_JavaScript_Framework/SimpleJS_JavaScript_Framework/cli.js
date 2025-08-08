#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

const [,, command, projectName] = process.argv;

if (command !== "create" || !projectName) {
  console.log("Usage: simplejs create <project-name>");
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);

async function createSimpleJSProject() {
  try {
    await fs.ensureDir(targetDir);

    // Write index.html
    await fs.writeFile(path.join(targetDir, "index.html"), `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${projectName}</title>
</head>
<body>
  <div id="app"></div>
  <script src="simplejs.js"></script>
  <script src="main.js"></script>
</body>
</html>
`);

    // Write simplejs.js (minimal core framework)
    await fs.writeFile(path.join(targetDir, "simplejs.js"), `// SimpleJS core framework

const doc = {
  getId(id) {
    return document.getElementById(id);
  },
  setText(id, text) {
    const el = this.getId(id);
    if (el) el.innerText = text;
  },
  // ...add your SimpleJS functions here
};

window.SimpleJS = doc;
`);

    // Write main.js (starter code)
    await fs.writeFile(path.join(targetDir, "main.js"), `window.onload = () => {
  SimpleJS.setText("app", "Hello from SimpleJS project '${projectName}'!");
};
`);

    // Write README.md
    await fs.writeFile(path.join(targetDir, "README.md"), `# ${projectName}

This is a SimpleJS starter project created with simplejs CLI.

Open index.html in your browser to get started.
`);

    console.log(`SimpleJS project '${projectName}' created successfully at ${targetDir}`);
  } catch (err) {
    console.error("Error creating project:", err);
  }
}

createSimpleJSProject();
