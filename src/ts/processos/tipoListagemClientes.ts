import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemTitulares from "./listagemTitulares";
import Armazem from "../dominio/armazem";

export default class TipoListagemClientes extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoListagemClientes()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break
            case 2:
                const clientes = Armazem.InstanciaUnica.Clientes
                if (clientes.length === 0) { console.log('Nenhum titular cadastrado.'); return }
                clientes.forEach((c, i) => console.log(`${i} - ${c.Nome} (${c.CPF || 'sem CPF'})`))
                const idx = this.entrada.receberNumero('Informe o índice do titular para listar dependentes:')
                if (idx < 0 || idx >= clientes.length) { console.log('Índice inválido.'); return }
                const titular = clientes[idx]
                if (!titular.Dependentes || titular.Dependentes.length === 0) { console.log('Nenhum dependente para este titular.'); return }
                titular.Dependentes.forEach((d, i) => console.log(`${i} - ${d.Nome} (${d.CPF})`))
                break

            default:
                console.log('Opção não entendida... :(')
        }
    }
}