"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Endereco {
    clonar() {
        let endereco = new Endereco();
        endereco.rua = this.rua;
        endereco.bairro = this.bairro;
        endereco.cidade = this.cidade;
        endereco.estado = this.estado;
        endereco.codigoPostal = this.codigoPostal;
        return endereco;
    }
}
exports.default = Endereco;
