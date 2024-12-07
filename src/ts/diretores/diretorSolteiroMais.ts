import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/nomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Diretor from "../abstracoes/diretor";
import Cliente from "../modelos/cliente";

export default class DiretorSolteiroSimples extends Diretor<Acomodacao> {
    constructor() {
        super();
        this.construtor = new ConstrutorAcomodacao();
    }

    public construir(cliente: Cliente): Acomodacao {
        return this.construtor
            .definirNomeAcomodacao(NomeAcomodacao.SolteiroSimples)
            .definirCamaCasal(0)
            .definirCamaSolteiro(1)
            .definirClimatizacao(true)
            .definirGaragem(0)
            .definirSuite(1)
            .definirCliente(cliente)
            .construir();
    }
}