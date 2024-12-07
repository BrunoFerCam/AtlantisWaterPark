import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class CadastroRg extends Processo {
    private cliente: Cliente;
    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Cadastro de RG');
        let numero = this.entrada.receberTexto('Digite o número do RG: ');
        let dataExpedicao = this.entrada.receberData('Digite a data de expedição do RG: ');
        let documento = new Documento(numero, TipoDocumento.RG, dataExpedicao);
        this.cliente.Documentos.push(documento);
        console.log('RG cadastrado com sucesso!');
    }
}