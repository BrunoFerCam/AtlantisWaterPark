import Processo from "../abstracoes/processo";
import MenuPrincipal from "../menus/menuPricipal";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoListagemClientes from "./tipoListagemClientes";
import AtualizacaoCliente from "./atualizacaoCliente";
import AssociarAcomodacaoCliente from "./associarAcomodacaoCliente";
import MostrarAcomodacaoCliente from "./mostrarAcomodacaoCliente";
import RemocaoCliente from "./remocaoCliente";
import Entrada from "../io/entrada";
import Armazem from "../dominio/armazem";

export default class Principal extends Processo {
    public menu: MenuPrincipal;

    constructor() {
        super();
        this.execucao = true;
        this.menu = new MenuPrincipal();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente();
                this.processo.processar();
                break;
            case 2:
                this.atualizarCliente();
                break;
            case 3:
                this.processo = new TipoListagemClientes();
                this.processo.processar();
                break;
            case 4:
                this.removerCliente();
                break;
            case 5:
                this.associarAcomodacaoCliente();
                break;
            case 6:
                this.mostrarAcomodacaoCliente();
                break;
            case 0:
                this.execucao = false;
                console.log('Até logo!');
                console.clear();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }

    private atualizarCliente(): void {
        let clienteId = this.entrada.receberTexto('ID do Cliente: ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(clienteId));
        if (cliente) {
            this.processo = new AtualizacaoCliente(cliente);
            this.processo.processar();
        }
    }

    private removerCliente(): void {
        let clienteId = this.entrada.receberTexto('ID do Cliente: ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(clienteId));
        if (cliente) {
            this.processo = new RemocaoCliente(cliente);
            this.processo.processar();
        } else {
            console.log('Cliente não encontrado!');
        }
    }

    private associarAcomodacaoCliente(): void {
        let clienteId = this.entrada.receberTexto('ID do Cliente: ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(clienteId));
        if (cliente) {
            this.processo = new AssociarAcomodacaoCliente(cliente);
            this.processo.processar();
        } else {
            console.log('Cliente não encontrado.');
        }
    }

    private mostrarAcomodacaoCliente(): void {
        let clienteId = this.entrada.receberTexto('ID do Cliente: ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(clienteId));
        if (cliente) {
            this.processo = new MostrarAcomodacaoCliente(cliente);
            this.processo.processar();
        } else {
            console.log('Cliente não encontrado.');
        }
    }
}