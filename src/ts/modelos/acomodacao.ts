import { NomeAcomodacao } from "../enumeracoes/nomeAcomodacao";
import Cliente from "./cliente";
import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";

export default class Acomodacao {
    public NomeAcomodacao: NomeAcomodacao;
    public CamaCasal: number;
    public CamaSolteiro: number;
    public Climatizacao: boolean;
    public Garagem: number;
    public Suite: number;
    public Cliente: Cliente | null;

    constructor(construtor: ConstrutorAcomodacao) {
        this.NomeAcomodacao = construtor.NomeAcomodacao;
        this.CamaCasal = construtor.CamaCasal;
        this.CamaSolteiro = construtor.CamaSolteiro;
        this.Climatizacao = construtor.Climatizacao;
        this.Garagem = construtor.Garagem;
        this.Suite = construtor.Suite;
        this.Cliente = construtor.Cliente;
    }
}