import fs from 'fs';
import path from 'path';

export function createCommand(projectName) {
  const projectPath = path.join(process.cwd(), projectName);
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }
  fs.writeFileSync(path.join(projectPath, 'index.js'), '// Your Proxtem project\n');
  console.log(`[Proxtem] Project "${projectName}" created!`);
}
