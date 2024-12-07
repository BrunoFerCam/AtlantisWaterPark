import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"

export default class Cliente {
    private id: number;
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes: Cliente[] = []
    private titular!: Cliente

    constructor(id: number, nome: string, nomeSocial: string, dataNascimento: Date) {
        this.id = id;
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
    }

    public get Id() { return this.id; }
    public get Nome() { return this.nome }
    public get NomeSocial() { return this.nomeSocial }
    public get DataNascimento() { return this.dataNascimento }
    public get DataCadastro() { return this.dataCadastro }
    public get Telefones() { return this.telefones }
    public get Endereco() { return this.endereco }
    public get Documentos() { return this.documentos }
    public get Dependentes() { return this.dependentes }
    public get Titular() { return this.titular }

    public set Nome(nome: string) { this.nome = nome }
    public set NomeSocial(nomeSocial: string) { this.nomeSocial = nomeSocial }
    public set DataNascimento(dataNascimento: Date) { this.dataNascimento = dataNascimento }
    public set Telefones(telefones: Telefone[]) { this.telefones = telefones }
    public set Endereco(endereco: Endereco) { this.endereco = endereco }
    public set Documentos(documentos: Documento[]) { this.documentos = documentos }
    public set Dependentes(dependentes: Cliente[]) { this.dependentes = dependentes }
    public set Titular(titular: Cliente) { this.titular = titular }

    public adicionarDependente(dependente: Cliente): void {
        this.dependentes.push(dependente);
    }

    public listarDependentes(): Cliente[] {
        return this.dependentes;
    }
}