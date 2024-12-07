import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import ImpressorDocumentos from "./impressorDocumentos";
import ImpressorEndereco from "./impressorEndereco";

export default class ImpressorCliente implements Impressor {
    private cliente: Cliente;
    private impressor!: Impressor;

    constructor(cliente: Cliente) {
        this.cliente = cliente;
    }

    imprimir(): string {
        let impressao = `****************************\n`
            + `| ID: ${this.cliente.Id}\n`
            + `| Nome: ${this.cliente.Nome}\n`
            + `| Nome social: ${this.cliente.NomeSocial}\n`
            + `| Data de nascimento: ${this.cliente.DataNascimento.toLocaleDateString()}\n`
            + `| Data de cadastro: ${this.cliente.DataCadastro.toLocaleDateString()}`;

        this.impressor = new ImpressorEndereco(this.cliente.Endereco);
        impressao = impressao + `\n${this.impressor.imprimir()}`;

        this.impressor = new ImpressorDocumentos(this.cliente.Documentos);
        impressao = impressao + `\n${this.impressor.imprimir()}`;

        if (this.cliente.Dependentes.length > 0) {
            impressao = impressao + `\n| Dependentes:`;
            this.cliente.Dependentes.forEach(dependente => {
                impressao = impressao + `\n  - ID: ${dependente.Id}, Nome: ${dependente.Nome}, Nome social: ${dependente.NomeSocial}, Data de nascimento: ${dependente.DataNascimento.toLocaleDateString()}`;
            });
        }

        impressao = impressao + `\n****************************`;
        return impressao;
    }
}