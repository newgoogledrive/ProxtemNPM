## Complete Setup and Usage

1. **Install Node.js (includes npm and npx)**:

- Download and install from [https://nodejs.org/](https://nodejs.org/).

2. **Install Proxtem globally** (optional):

```bash
npm install -g proxtem
```

3. **Create a new proxy project**:

```bash
npx proxtem create my-proxy
cd my-proxy
npm install
```

4. **Run the proxy locally**:

```bash
node server.js
```

5. **Optional Dev Mode**:

```bash
npx proxtem dev
```

6. **Manual Deployment to Render**:

- Create a Web Service on Render.
- Connect your repository or upload your project manually.
- Set the Start Command to `node server.js`.
- Install dependencies manually or let Render run `npm install`.
- Your proxy is live at the Render-assigned URL.
