# Atlantis Water Park - Atividades

Este repositório contém as atividades desenvolvidas para o projeto **Atlantis Water Park**.

## Links para as Branches

- [Atividade 1](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-1)
- [Atividade 2](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-2)
- [Atividade 3](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-3)

## Local dev: adapter server + frontend

I added a small adapter server (Node + Express + TypeScript) that loads the original project domain under `src/ts` and exposes a minimal REST API. A small React + Vite frontend consumes that API.

Quick start (PowerShell)

1) Start the adapter server (imports the original domain)

```powershell
cd server
npm install      # first time only
npm run dev
```

The adapter listens on http://localhost:3333 and exposes these endpoints:
- `GET /` — API information
- `GET /clientes` — list clientes
- `POST /clientes` — create titular (body: { nome, nomeSocial, dataNascimento })
- `POST /clientes/:index/dependentes` — create dependent for titular at numeric index (body: { nome, nomeSocial, dataNascimento, clonarContato })

2) Start the frontend (Vite + React)

```powershell
cd frontend
npm install      # first time only
npm run dev
```

Open http://localhost:5173 in your browser. The UI includes:
- Listar clientes (fetches `GET /clientes`)
- Criar titular (posts to `POST /clientes`)

Notes and next steps
- Persistence: adapter stores data in-memory on the singleton `Armazem`. Server restarts will clear data. If you want persistence, I can add JSON-file persistence or switch to IDs + database.
- IDs: The current API uses numeric indices to identify titular (path param). I can add stable UUID ids if you prefer.
- Dependents: I can add a UI to create dependents and the `clonarContato` checkbox which uses the `Endereco.clonar()` prototype. Tell me if you want that next.

If you run into errors starting either server, paste the terminal output here and I will debug.

