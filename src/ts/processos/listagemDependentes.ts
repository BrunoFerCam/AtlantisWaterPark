import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ListagemDependentes extends Processo {
    processar(): void {
        let titularId = this.entrada.receberTexto('ID do Titular: ');
        let titular = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(titularId));
        if (titular) {
            console.log(`Dependentes do Titular ${titular.Nome}:`);
            titular.Dependentes.forEach(dependente => {
                console.log(`ID: ${dependente.Id}, Nome: ${dependente.Nome}`);
            });
        } else {
            console.log('Titular não encontrado!');
        }
    }
}