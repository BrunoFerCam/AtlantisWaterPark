import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"

/**
 * Cliente model now supports optional CPF and dependent management.
 * Dependentes are represented as Cliente instances linked to a titular.
 */
export default class Cliente {
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private cpf: string = ''
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes: Cliente[] = []
    private titular!: Cliente

    // cpf is optional so existing constructors remain compatible
    constructor(nome: string, nomeSocial: string, dataNascimento: Date, cpf?: string) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
        if (cpf) this.cpf = cpf
    }

    public get Nome() { return this.nome }
    public get NomeSocial() { return this.nomeSocial }
    public get DataNascimento() { return this.dataNascimento }
    public get DataCadastro() { return this.dataCadastro }
    public get CPF() { return this.cpf }
    public get Telefones() { return this.telefones }
    public get Endereco() { return this.endereco }
    public get Documentos() { return this.documentos }
    public get Dependentes() { return this.dependentes }
    public get Titular() { return this.titular }

    public set CPF(cpf: string) { this.cpf = cpf }
    public set Endereco(endereco: Endereco) { this.endereco = endereco }

    /**
     * Adds a dependent to this titular.
     * The dependent should be a Cliente instance with its own Nome and CPF.
     * The dependent will inherit (clone) endereco and telefones from the titular.
     */
    public adicionarDependente(dependente: Cliente) {
        // set titular link
        dependente.titular = this

        // clone endereco using Prototipo pattern if present
        if (this.endereco && typeof this.endereco.clonar === 'function') {
            const enderecoClonado = this.endereco.clonar() as unknown as Endereco
            dependente.Endereco = enderecoClonado
        }

        // clone telefones (create new Telefone instances)
        if (this.telefones && this.telefones.length > 0) {
            const telefonesClonados = this.telefones.map(t => new Telefone(t.Ddd, t.Numero))
            telefonesClonados.forEach(t => dependente.Telefones.push(t))
        }

        this.dependentes.push(dependente)
    }

    /** Remove a dependent by its CPF. Returns true if removed. */
    public removerDependentePorCpf(cpf: string): boolean {
        const idx = this.dependentes.findIndex(d => d.CPF === cpf)
        if (idx >= 0) {
            this.dependentes.splice(idx, 1)
            return true
        }
        return false
    }

    /** Convenience: detect if this client is a titular (no titular assigned) */
    public get EhTitular(): boolean {
        return this.titular === undefined
    }
}