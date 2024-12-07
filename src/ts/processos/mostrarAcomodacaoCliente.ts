import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class MostrarAcomodacaoCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        const acomodacoes = Armazem.InstanciaUnica.Acomodacoes.filter(a => a.Cliente?.Id === this.cliente.Id);
        if (acomodacoes.length > 0) {
            console.log(`Acomodações do cliente ${this.cliente.Nome}:`);
            acomodacoes.forEach(acomodacao => {
                console.log(`- ${acomodacao.NomeAcomodacao}: ${acomodacao.CamaCasal} cama(s) de casal, ${acomodacao.CamaSolteiro} cama(s) de solteiro, ${acomodacao.Suite} suíte(s), climatização: ${acomodacao.Climatizacao ? 'Sim' : 'Não'}, garagem: ${acomodacao.Garagem}`);
            });
        } else {
            console.log(`O cliente ${this.cliente.Nome} não possui acomodações associadas.`);
        }
    }
}