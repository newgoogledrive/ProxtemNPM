# Proxtem

Proxtem is a Node.js toolkit for creating and managing **proxy servers**, with a CLI for scaffolding projects, running a dev environment, and deploying to cloud platforms like **Render** and **Vercel**.  

## Features
- Create and run proxy servers quickly.
- Middleware for logging or modifying requests.
- HTML rewriting utilities.
- CLI commands to scaffold projects and deploy them.
- Project templates for rapid prototyping.

## Installation
Install globally to use the CLI:

npm install -g proxtem

Or install locally in a project:

npm install proxtem

## Usage

### Library Usage

import { createProxy, middleware, rewriteHTML, resolveURL } from 'proxtem';
import express from 'express';

const app = createProxy('http://example.com');
app.use(middleware());

app.listen(3000, () => console.log('Proxy running on port 3000'));

### CLI Usage

#### Create a new project

proxtem create my-app

This will copy the `base-app` template into `my-app/`.

#### Run development server

proxtem dev

Starts a proxy development server on port 4000 (default).

#### Deploy your project

proxtem deploy:render
proxtem deploy:vercel

Deploy your project to **Render** or **Vercel** (currently stubs, implement deployment logic).

## Templates

Templates are stored in `templates/`:
- `base-app/` – basic HTML + server scaffold.

You can add more templates in the future and reference them in the CLI.

## Contributing

Contributions are welcome!  
- For **code or feature suggestions**, submit a pull request or issue.  
- Use the **enhancements** label for features or bug fixes.  
- Use the **bug** label for bug reports.  

## License

MIT License ©newgoogledrive
