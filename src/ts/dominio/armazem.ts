import Cliente from "../modelos/cliente";
import Acomodacao from "../modelos/acomodacao";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem();
    private clientes: Cliente[] = [];
    private acomodacoes: Acomodacao[] = [];
    private constructor() { }

    public static get InstanciaUnica() {
        return this.instanciaUnica;
    }

    public get Clientes() {
        return this.clientes;
    }

    public get Acomodacoes() {
        return this.acomodacoes;
    }

    public adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public removerCliente(cliente: Cliente): void {
        this.clientes = this.clientes.filter(c => c.Id !== cliente.Id);
    }

    public adicionarAcomodacao(acomodacao: Acomodacao): void {
        this.acomodacoes.push(acomodacao);
    }
}