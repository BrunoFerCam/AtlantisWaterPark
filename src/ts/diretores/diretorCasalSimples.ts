import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/nomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Diretor from "../abstracoes/diretor";
import Cliente from "../modelos/cliente";

export default class DiretorCasalSimples extends Diretor<Acomodacao> {
    constructor() {
        super();
        this.construtor = new ConstrutorAcomodacao();
    }

    public construir(cliente: Cliente): Acomodacao {
        return this.construtor
            .definirNomeAcomodacao(NomeAcomodacao.CasalSimples)
            .definirCamaCasal(1)
            .definirCamaSolteiro(0)
            .definirClimatizacao(true)
            .definirGaragem(1)
            .definirSuite(1)
            .definirCliente(cliente)
            .construir();
    }
}