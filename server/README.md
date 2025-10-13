# Atlantis adapter server

This small Express TypeScript server exposes a minimal REST adapter around the project's original `src/ts` domain so a frontend can interact with the same domain objects during development.

Quick start (from repository root):

1. Install server dependencies:

```powershell
cd server; npm install
```

2. Run server in dev mode:

```powershell
cd server; npm run dev
```

The server listens on port 3333 by default.

Notes:
- This adapter imports code from `../src/ts` and therefore expects the TypeScript domain files to be valid for runtime use under Node. If you encounter runtime type issues, we can add small adapters to convert domain instances into plain objects safely.
