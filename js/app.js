"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entrada_1 = __importDefault(require("./teste/entrada"));
const listarCliente_1 = __importDefault(require("./servicos/listarCliente"));
const cadastrarCliente_1 = __importDefault(require("./servicos/cadastrarCliente"));
const deletarCliente_1 = __importDefault(require("./servicos/deletarCliente"));
const atualizarCliente_1 = __importDefault(require("./servicos/atualizarCliente"));
const clientes = new Array();
console.log(`Inciando sequência de interação com o usuário.`);
console.log(` `);
console.log(` `);
console.log(` `);
console.log(`Bem-vindo/a ao Atlantis Water Park.`);
let execucao = true;
while (execucao) {
    console.log(`Insira o processo desejado: `);
    console.log(`*---------------------------*`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar Clientes`);
    console.log(`3 - Deletar Cliente`);
    console.log(`4 - Atualizar Cliente`);
    console.log(`0 - sair`);
    let entrada = new entrada_1.default();
    let opcao = entrada.receberNumero("Insira o número da opção desejada: ");
    switch (opcao) {
        case 1:
            (0, cadastrarCliente_1.default)(clientes);
            break;
        case 2:
            (0, listarCliente_1.default)(clientes);
            break;
        case 3:
            (0, deletarCliente_1.default)(clientes);
            break;
        case 4:
            (0, atualizarCliente_1.default)(clientes);
            break;
        case 0:
            execucao = false;
            console.log(`Encerrando o sistema...`);
            break;
        default:
            console.log(`Opção inválida.`);
    }
}
