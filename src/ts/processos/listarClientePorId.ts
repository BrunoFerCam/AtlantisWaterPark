import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";

export default class ListarClientePorId extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log(`Detalhes do cliente ${this.cliente.Nome}:`);
        console.log(`ID: ${this.cliente.Id}`);
        console.log(`Nome: ${this.cliente.Nome}`);
        console.log(`Nome Social: ${this.cliente.NomeSocial}`);
        console.log(`Data de Nascimento: ${this.cliente.DataNascimento}`);
        console.log(`Data de Cadastro: ${this.cliente.DataCadastro}`);
        console.log(`Telefones: ${this.cliente.Telefones.join(", ")}`);
        console.log(`Endereço: ${this.formatarEndereco(this.cliente.Endereco)}`);
        console.log(`Documentos: ${this.cliente.Documentos.map(doc => this.formatarDocumento(doc)).join(", ")}`);
        console.log(`Dependentes: ${this.cliente.Dependentes.map(dep => dep.Nome).join(", ")}`);
        console.log(`Titular: ${this.cliente.Titular ? this.cliente.Titular.Nome : 'N/A'}`);
    }

    private formatarEndereco(endereco: any): string {
        return `${endereco.rua}, ${endereco.numero} - ${endereco.cidade}, ${endereco.estado}, ${endereco.cep}`;
    }

    private formatarDocumento(documento: any): string {
        return `${documento.tipo}: ${documento.numero}`;
    }
}