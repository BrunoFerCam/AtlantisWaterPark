"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    constructor(nome, nomeSocial, dataNascimento, endereco, telefones = [], documentos = [], dependentes = [], titular) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date();
        this.endereco = endereco;
        this.telefones = telefones;
        this.documentos = documentos;
        this.dependentes = dependentes;
        this.titular = titular;
    }
}
exports.default = Cliente;
