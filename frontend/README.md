# Atlantis - Frontend (SPA)

Projeto protótipo em React + TypeScript para gerenciamento de clientes e dependentes.

Como usar

1. Entrar na pasta frontend

2. Instalar dependências

   npm install

   (Dependências importantes: react, react-dom, react-router-dom, vite, typescript, uuid)

3. Rodar em desenvolvimento:

   npm run dev

Arquitetura e onde o padrão Protótipo é aplicado

- `src/store/armazem.ts`: Armazém singleton em memória com persistência via localStorage opcional.
- `src/types.ts`: Modelos `Cliente` e `Dependente`.
- `src/hooks/useArmazem.ts`: Hook que encapsula operações do armazém.
- `src/components/DependentForm.tsx`: Ao criar um dependente, o formulário inicializa os campos de endereço e telefone copiando os valores do titular — isto aplica o padrão Protótipo: o objeto do titular serve como protótipo cujas propriedades de contato são clonadas para o novo dependente.

Validações

- Campos obrigatórios: nome e CPF.
- CPF único validado no `Armazem` (tanto para clientes quanto para dependentes).

Funcionalidades extras

- Busca dependentes por titular: `Armazem.buscarDependentesPorTitular`.
- Buscar titular por dependente: `Armazem.buscarTitularPorDependente`.
