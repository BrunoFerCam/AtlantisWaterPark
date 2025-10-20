# Atlantis Water Park - Atividades

Repositório com as atividades do projeto **Atlantis Water Park**.

## Branches

- [Atividade 1](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-1)
- [Atividade 2](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-2)
- [Atividade 3](https://github.com/BrunoFerCam/AtlantisWaterPark/tree/ATV-3)

---

## Estrutura do Projeto

O projeto contém um servidor de adaptação (Node + Express + TypeScript) que carrega o domínio original do projeto em `src/ts` e fornece uma API REST simples.  
Um frontend em React + Vite consome essa API.

---

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

---

## Como executar localmente

### 1. Servidor (API)

```bash
cd server
npm install
npm run dev
```

O servidor roda em **http://localhost:3333**.

### Endpoints principais

| Método | Rota | Descrição |
|---------|------|-----------|
| GET | `/` | Informações da API |
| GET | `/clientes` | Lista de clientes |
| POST | `/clientes` | Cria um cliente titular |
| POST | `/clientes/:index/dependentes` | Cria um dependente para o titular especificado |

---

### 2. Frontend (Interface)

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em **http://localhost:5173**.

Funcionalidades atuais:
- Listar clientes (`GET /clientes`)
- Criar titular (`POST /clientes`)
