import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class CadastroCpf extends Processo {
    private cliente: Cliente;
    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Cadastro de CPF');
        let numero = this.entrada.receberTexto('Digite o número do CPF: ');
        let dataExpedicao = this.entrada.receberData('Digite a data de expedição do CPF: ');
        let documento = new Documento(numero, TipoDocumento.CPF, dataExpedicao);
        this.cliente.Documentos.push(documento);
        console.log('CPF cadastrado com sucesso!');
    }
}