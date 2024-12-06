import promptSync from "prompt-sync";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";
export default class Entrada {
    public receberNumero(mensagem: string): number {
        let prompt = promptSync();
        let valor = prompt(`${mensagem}: `)
        let numero = new Number(valor)
        return numero.valueOf()
    }
    public receberTexto(mensagem: string): string {
        let prompt = promptSync();
        let texto = prompt(`${mensagem}: `)
        return texto
    }
    public receberData(mensagem: string): Date {
        let prompt = promptSync();
        let texto = prompt(`${mensagem}, no padrão dd/MM/yyyy: `)
        let partes = texto.split('/')
        let ano = new Number(partes[2])
        let mes = new Number(partes[1])
        let dia = new Number(partes[0])
        let data = new Date(ano.valueOf(), mes.valueOf() - 1, dia.valueOf())
        return data
    }public receberTipo(mensagem: string): TipoDocumento | string {
        const prompt = promptSync();
        const tipo = prompt(`${mensagem}`).toLowerCase();

        if (tipo === 'cpf') {
            return TipoDocumento.CPF;
        } else if (tipo === 'rg') {
            return TipoDocumento.RG;
        } else if (tipo === 'passaporte') {
            return TipoDocumento.Passaporte;
        } else {
            return 'Operação não compreendida';
        }
    }
}