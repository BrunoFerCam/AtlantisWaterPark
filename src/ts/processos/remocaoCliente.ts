import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class RemocaoCliente extends Processo {
    private cliente: Cliente;
    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica;
        armazem.removerCliente(this.cliente);
        console.log(`Cliente ${this.cliente.Nome} removido com sucesso.`);
    }
}