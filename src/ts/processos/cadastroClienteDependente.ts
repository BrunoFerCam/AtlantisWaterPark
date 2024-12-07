import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";

export default class CadastroClienteDependente extends Processo {
    private titular: Cliente;
    constructor(titular: Cliente) {
        super();
        this.titular = titular;
    }

    processar(): void {
        console.log('Iniciando o cadastro de um novo dependente...');
        let nome = this.entrada.receberTexto('Qual o nome do novo dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
        let armazem = Armazem.InstanciaUnica;
        let id = armazem.Clientes.length + 1;
        let dependente = new Cliente(id, nome, nomeSocial, dataNascimento);
        dependente.Titular = this.titular;

        this.processo = new CadastroEnderecoTitular(dependente);
        this.processo.processar();

        this.processo = new CadastrarDocumentosCliente(dependente);
        this.processo.processar();

        this.titular.adicionarDependente(dependente);
        armazem.adicionarCliente(dependente);

        console.log('Finalizando o cadastro do dependente...');
    }
}