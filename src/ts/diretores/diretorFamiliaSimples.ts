import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/nomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Diretor from "../abstracoes/diretor";
import Cliente from "../modelos/cliente";

export default class DiretorFamiliaSimples extends Diretor<Acomodacao> {
    constructor() {
        super();
        this.construtor = new ConstrutorAcomodacao();
    }

    public construir(cliente: Cliente): Acomodacao {
        return this.construtor
            .definirNomeAcomodacao(NomeAcomodacao.FamiliaSimples)
            .definirCamaCasal(1)
            .definirCamaSolteiro(2)
            .definirClimatizacao(true)
            .definirGaragem(1)
            .definirSuite(1)
            .definirCliente(cliente)
            .construir();
    }
}