"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cadastrar;
const cliente_1 = __importDefault(require("../modelos/valores/cliente"));
const endereco_1 = __importDefault(require("../modelos/valores/endereco"));
const telefone_1 = __importDefault(require("../modelos/valores/telefone"));
const prompt = require('prompt-sync')();
function Cadastrar(clientes = []) {
    let cliente = new cliente_1.default('', '', new Date(), new endereco_1.default(), [], []);
    let dependentes = new cliente_1.default('', '', new Date(), new endereco_1.default(), [], []);
    cliente.nome = prompt("Nome: ");
    cliente.nomeSocial = prompt("Nome Social: ");
    cliente.dataNascimento = new Date(prompt("Data de Nascimento: "));
    cliente.dataCadastro = new Date(prompt("Data de Cadastro: "));
    cliente.titular = cliente;
    console.log(`\nEndereço:`);
    let endereco = new endereco_1.default();
    endereco.rua = prompt("Rua: ");
    endereco.bairro = prompt("Bairro: ");
    endereco.cidade = prompt("Cidade: ");
    endereco.estado = prompt("Estado: ");
    endereco.codigoPostal = prompt("Código Postal: ");
    cliente.endereco = endereco;
    let numTelefones = parseInt(prompt("\nQuantos telefones deseja cadastrar? "));
    for (let i = 0; i < numTelefones; i++) {
        let telefone = new telefone_1.default();
        telefone.ddd = prompt("DDD do telefone " + (i + 1) + ": ");
        telefone.numero = prompt("Número do telefone " + (i + 1) + ": ");
        console.log("\n");
        cliente.telefones.push(telefone);
    }
    let dependentesOpc = parseInt(prompt("Quantos dependentes deseja cadastrar? "));
    for (let i = 0; i < dependentesOpc; i++) {
        dependentes.nome = prompt("Nome do dependente " + (i + 1) + ": ");
        dependentes.nomeSocial = prompt("Nome Social do dependente " + (i + 1) + ": ");
        dependentes.dataNascimento = new Date(prompt("Data de Nascimento: "));
        dependentes.dataCadastro = new Date(prompt("Data de Cadastro: "));
        dependentes.endereco = cliente.endereco.clonar();
        dependentes.telefones = cliente.telefones.map((telefone) => telefone.clonar());
        dependentes.titular = cliente;
        cliente.dependentes.push(dependentes);
        console.log("\n");
    }
    clientes.push(cliente);
    console.log("Cadastrado com sucesso!");
}
