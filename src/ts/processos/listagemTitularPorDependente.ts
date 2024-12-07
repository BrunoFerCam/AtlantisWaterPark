import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ListagemTitularPorDependente extends Processo {
    processar(): void {
        let dependenteId = this.entrada.receberTexto('ID do Dependente: ');
        let titular = Armazem.InstanciaUnica.Clientes.find(titular => 
            titular.Dependentes.some(dependente => dependente.Id === Number(dependenteId))
        );
        if (titular) {
            console.log(`Titular do Dependente ${dependenteId}:`);
            console.log(`ID: ${titular.Id}, Nome: ${titular.Nome}`);
        } else {
            console.log('Dependente não encontrado!');
        }
    }
}