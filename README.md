# Atlantis Water Park - Atividades

Repositório com as atividades do projeto **Atlantis Water Park**.

## Branches

- [Atividade 1](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-1)
- [Atividade 2](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-2)
- [Atividade 3](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-3)

---

## Estrutura do Projeto

O projeto é composto por dois módulos principais:

- **server/** — Servidor Node.js com Express e TypeScript, responsável pela API.
- **frontend/** — Aplicação React + Vite que consome a API e exibe a interface.

---

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (ou yarn/pnpm)

---

## Como rodar o servidor

```bash
cd server
npm install
npm run dev
```

O servidor será iniciado em **http://localhost:3333**

### Endpoints principais

| Método | Rota | Descrição |
|---------|------|-----------|
| GET | `/clientes` | Lista todos os clientes |
| POST | `/clientes` | Cria um novo cliente titular |
| POST | `/clientes/:index/dependentes` | Adiciona um dependente ao titular especificado |

---

## Como rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em **http://localhost:5173**
