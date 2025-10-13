"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Telefone {
    constructor(ddd = '', numero = '') {
        this.ddd = ddd;
        this.numero = numero;
    }
    clonar() {
        let telefone = new Telefone();
        telefone.ddd = this.ddd;
        telefone.numero = this.numero;
        return telefone;
    }
}
exports.default = Telefone;
