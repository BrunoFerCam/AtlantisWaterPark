import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/nomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Diretor from "../abstracoes/diretor";
import Cliente from "../modelos/cliente";

export default class DiretorFamiliaSuper extends Diretor<Acomodacao> {
    constructor() {
        super();
        this.construtor = new ConstrutorAcomodacao();
    }

    public construir(cliente: Cliente): Acomodacao {
        return this.construtor
            .definirNomeAcomodacao(NomeAcomodacao.FamiliaSuper)
            .definirCamaCasal(2)
            .definirCamaSolteiro(6)
            .definirClimatizacao(true)
            .definirGaragem(2)
            .definirSuite(3)
            .definirCliente(cliente)
            .construir();
    }
}