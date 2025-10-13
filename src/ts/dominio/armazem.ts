import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem()
    private clientes: Cliente[] = []
    private acomodacoes: Acomodacao[] = []
    private hospedagens: Hospedagem[] = []
    private constructor() { }
    public static get InstanciaUnica() {
        return this.instanciaUnica
    }
    public get Clientes() {
        return this.clientes
    }
    public get Acomodacoes(){
        return this.acomodacoes
    }

    public get Hospedagens(){
        return this.hospedagens
    }

    // Add a client to the store
    public adicionarCliente(cliente: Cliente) {
        this.clientes.push(cliente)
    }

    // Check whether a CPF is already used by any titular or dependent
    public cpfExiste(cpf: string): boolean {
        if (!cpf) return false
        // check titulares
        for (const c of this.clientes) {
            if (c.CPF === cpf) return true
            // check dependentes
            if (c.Dependentes && c.Dependentes.some(d => d.CPF === cpf)) return true
        }
        return false
    }

    // Remove a titular by CPF; cascades dependents removal
    public removerClientePorCpf(cpf: string): boolean {
        const idx = this.clientes.findIndex(c => c.CPF === cpf)
        if (idx === -1) return false
        // remove dependents (they exist only as nested arrays under titular)
        this.clientes.splice(idx, 1)
        return true
    }

    // Find client by CPF
    public buscarClientePorCpf(cpf: string): Cliente | undefined {
        return this.clientes.find(c => c.CPF === cpf)
    }

}