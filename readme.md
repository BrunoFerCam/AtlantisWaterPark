## Repositório-Téc2

Repositório criado para envio das atividades do exercício Atlantis Water Park.

## Atividade II

## Instruções para execução do projeto:

```
npm install typescript
```

```
npx tsc
```

```
node src/js/app/app.js
```

## Proposta da atividade II:

O desenvolvimento do primeiro MVP do sistema Atlantis está incompleto. Após duas novas sprints, uma versão atualizada foi entregue utilizando os padrões de projeto Singleton e Strategy, além de princípios SOLID.

O sistema é do tipo CLI e não utiliza um SGBD. Para armazenamento temporário dos dados durante a execução, foi criada a classe Armazém, que implementa o padrão Singleton, possuindo construtor privado e garantindo apenas uma instância responsável por gerenciar os dados em memória.

O padrão Strategy foi aplicado amplamente no sistema, principalmente por meio da interface Menu e da classe abstrata Processo, que define ações ou comportamentos do sistema. As classes concretas implementam ou estendem essas estruturas, representando os diferentes processos executáveis pelo sistema.

O objetivo é preparar o sistema para seu primeiro lançamento (MVP), implementando as funcionalidades obrigatórias abaixo, mantendo os padrões existentes e aplicando novos, se necessário.

Funcionalidades obrigatórias:

CRUD completo de clientes, incluindo seus dependentes.

Listagem de todos os dependentes de um titular específico.

Listagem do titular responsável por um dependente específico.
