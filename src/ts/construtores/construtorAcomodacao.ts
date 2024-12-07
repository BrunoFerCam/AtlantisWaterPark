import { NomeAcomodacao } from "../enumeracoes/nomeAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";

export default class ConstrutorAcomodacao {
    public NomeAcomodacao: NomeAcomodacao;
    public CamaCasal: number;
    public CamaSolteiro: number;
    public Climatizacao: boolean;
    public Garagem: number;
    public Suite: number;
    public Cliente: Cliente | null;

    constructor() {
        this.NomeAcomodacao = NomeAcomodacao.CasalSimples; // Valor padrão
        this.CamaCasal = 0;
        this.CamaSolteiro = 0;
        this.Climatizacao = false;
        this.Garagem = 0;
        this.Suite = 0;
        this.Cliente = null;
    }

    public definirNomeAcomodacao(nome: NomeAcomodacao): this {
        this.NomeAcomodacao = nome;
        return this;
    }

    public definirCamaCasal(camaCasal: number): this {
        this.CamaCasal = camaCasal;
        return this;
    }

    public definirCamaSolteiro(camaSolteiro: number): this {
        this.CamaSolteiro = camaSolteiro;
        return this;
    }

    public definirClimatizacao(climatizacao: boolean): this {
        this.Climatizacao = climatizacao;
        return this;
    }

    public definirGaragem(garagem: number): this {
        this.Garagem = garagem;
        return this;
    }

    public definirSuite(suite: number): this {
        this.Suite = suite;
        return this;
    }

    public definirCliente(cliente: Cliente): this {
        this.Cliente = cliente;
        return this;
    }

    public construir(): Acomodacao {
        return new Acomodacao(this);
    }
}