import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/nomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Diretor from "../abstracoes/diretor";
import Cliente from "../modelos/cliente";

export default class DiretorFamiliaMais extends Diretor<Acomodacao> {
    constructor() {
        super();
        this.construtor = new ConstrutorAcomodacao();
    }

    public construir(cliente: Cliente): Acomodacao {
        return this.construtor
            .definirNomeAcomodacao(NomeAcomodacao.FamiliaMais)
            .definirCamaCasal(1)
            .definirCamaSolteiro(5)
            .definirClimatizacao(true)
            .definirGaragem(2)
            .definirSuite(2)
            .definirCliente(cliente)
            .construir();
    }
}