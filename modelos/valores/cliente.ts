import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    public dataNascimento: Date;
    public dataCadastro: Date;
    public telefones: Telefone[];
    public endereco: Endereco;
    public documentos: Documento[];
    public dependentes: Cliente[];
    public titular?: Cliente | string;

    constructor(
        nome: string,
        nomeSocial: string,
        dataNascimento: Date,
        endereco: Endereco,
        telefones: Telefone[] = [],
        documentos: Documento[] = [],
        dependentes: Cliente[] = [],
        titular?: Cliente | string
    ) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date();
        this.endereco = endereco;
        this.telefones = telefones;
        this.documentos = documentos;
        this.dependentes = dependentes;
        this.titular = titular;
    }
}