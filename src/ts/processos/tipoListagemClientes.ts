import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemTitulares from "./listagemTitulares";
import ListagemDependentes from "./listagemDependentes";
import ListagemTitularPorDependente from "./listagemTitularPorDependente";
import ListarClientePorId from "./listarClientePorId";
import Armazem from "../dominio/armazem";

export default class TipoListagemClientes extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoListagemClientes();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares();
                this.processo.processar();
                break;
            case 2:
                this.processo = new ListagemDependentes();
                this.processo.processar();
                break;
            case 3:
                this.processo = new ListagemTitularPorDependente();
                this.processo.processar();
                break;
            case 4:
                this.listarClientePorId();
                break;
            default:
                console.log('Opção não entendida... :(');
        }
    }

    private listarClientePorId(): void {
        let clienteId = this.entrada.receberTexto('ID do Cliente: ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(clienteId));
        if (cliente) {
            this.processo = new ListarClientePorId(cliente);
            this.processo.processar();
        } else {
            console.log('Cliente não encontrado.');
        }
    }
}