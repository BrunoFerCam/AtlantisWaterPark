import Processo from "../abstracoes/processo";
import MenuAcomodacao from "../menus/menuAcomodacao";
import DiretorCasalSimples from "../diretores/diretorCasalSimples";
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSuper from "../diretores/DiretorFamiliaSuper";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";
import Cliente from "../modelos/cliente";
import Acomodacao from "../modelos/acomodacao";
import Armazem from "../dominio/armazem";

export default class AssociarAcomodacaoCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        const menuAcomodacao = new MenuAcomodacao();
        menuAcomodacao.mostrar();
        const opcao = this.entrada.receberNumero('Qual tipo de acomodação desejada?');

        let diretor;
        switch (opcao) {
            case 1:
                diretor = new DiretorCasalSimples();
                break;
            case 2:
                diretor = new DiretorFamiliaSimples();
                break;
            case 3:
                diretor = new DiretorFamiliaMais();
                break;
            case 4:
                diretor = new DiretorFamiliaSuper();
                break;
            case 5:
                diretor = new DiretorSolteiroSimples();
                break;
            case 6:
                diretor = new DiretorSolteiroMais();
                break;
            default:
                console.log('Opção inválida.');
                return;
        }

        const acomodacao = diretor.construir(this.cliente);
        Armazem.InstanciaUnica.adicionarAcomodacao(acomodacao);
        console.log(`Acomodação associada ao cliente ${this.cliente.Nome}:`, acomodacao);
    }
}