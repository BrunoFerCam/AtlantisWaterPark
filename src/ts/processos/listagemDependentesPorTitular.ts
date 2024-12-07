import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";

export default class ListagemDependentesPorTitular extends Processo {
    private titular: Cliente;
    constructor(titular: Cliente) {
        super();
        this.titular = titular;
    }

    processar(): void {
        console.clear();
        console.log(`Dependentes do titular ${this.titular.Nome}:`);
        this.titular.listarDependentes().forEach(dependente => {
            console.log(`- ${dependente.Nome}`);
        });
    }
}