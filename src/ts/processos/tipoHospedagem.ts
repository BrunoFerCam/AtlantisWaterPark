import Processo from "../abstracoes/processo";
import MenuHospedagem from "../menus/menuHospedagem";
import CadastroHospedagem from "./cadastroHospedagem";
import ListagemHospedagens from "./listagemHospedagens";
import BuscarHospedePorAcomodacao from "./buscarHospedePorAcomodacao";
import BuscarAcomodacaoPorHospede from "./buscarAcomodacaoPorHospede";
import ExcluirHospedagem from "./excluirHospedagem";

export default class TipoHospedagem extends Processo {
    constructor() {
        super()
        this.menu = new MenuHospedagem()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroHospedagem()
                this.processo.processar()
                break
            case 2:
                this.processo = new ListagemHospedagens()
                this.processo.processar()
                break
            case 3:
                this.processo = new BuscarHospedePorAcomodacao()
                this.processo.processar()
                break
            case 4:
                this.processo = new BuscarAcomodacaoPorHospede()
                this.processo.processar()
                break
            case 5:
                this.processo = new ExcluirHospedagem()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}
