import Processo from "../abstracoes/processo";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import CadastroClienteDependente from "./cadastroClienteDependente";
import Armazem from "../dominio/armazem";

export default class TipoCadastroCliente extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoCadastroCliente();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitular();
                this.processo.processar();
                break;
            case 2:
                let titularId = this.entrada.receberTexto('ID do Titular: ');
                let titular = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(titularId));
                if (titular) {
                    this.processo = new CadastroClienteDependente(titular);
                    this.processo.processar();
                } else {
                    console.log('Titular não encontrado!');
                }
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}