"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const tipoDocumento_1 = require("../enumeracoes/tipoDocumento");
class Entrada {
    receberNumero(mensagem) {
        let prompt = (0, prompt_sync_1.default)();
        let valor = prompt(`${mensagem}: `);
        let numero = new Number(valor);
        return numero.valueOf();
    }
    receberTexto(mensagem) {
        let prompt = (0, prompt_sync_1.default)();
        let texto = prompt(`${mensagem}: `);
        return texto;
    }
    receberData(mensagem) {
        let prompt = (0, prompt_sync_1.default)();
        let texto = prompt(`${mensagem}, no padrão dd/MM/yyyy: `);
        let partes = texto.split('/');
        let ano = new Number(partes[2]);
        let mes = new Number(partes[1]);
        let dia = new Number(partes[0]);
        let data = new Date(ano.valueOf(), mes.valueOf() - 1, dia.valueOf());
        return data;
    }
    receberTipo(mensagem) {
        const prompt = (0, prompt_sync_1.default)();
        const tipo = prompt(`${mensagem}`).toLowerCase();
        if (tipo === 'cpf') {
            return tipoDocumento_1.TipoDocumento.CPF;
        }
        else if (tipo === 'rg') {
            return tipoDocumento_1.TipoDocumento.RG;
        }
        else if (tipo === 'passaporte') {
            return tipoDocumento_1.TipoDocumento.Passaporte;
        }
        else {
            return 'Operação não compreendida';
        }
    }
}
exports.default = Entrada;
