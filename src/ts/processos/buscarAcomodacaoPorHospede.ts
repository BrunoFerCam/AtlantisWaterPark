import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class BuscarAcomodacaoPorHospede extends Processo {
    private hospedagens = Armazem.InstanciaUnica.Hospedagens
    private clientes = Armazem.InstanciaUnica.Clientes

    constructor() { super() }

    processar(): void {
        if (this.clientes.length === 0) { console.log('Não há clientes cadastrados.'); return }
        this.clientes.forEach((c, i) => console.log(`${i} - ${c.Nome}`))
        let idx = this.entrada.receberNumero('Informe o índice do cliente:')
        if (idx < 0 || idx >= this.clientes.length) { console.log('Índice inválido.'); return }
        let cliente = this.clientes[idx]
        let encontrados = this.hospedagens.filter(h => h.Cliente === cliente)
        if (encontrados.length === 0) { console.log('Nenhuma acomodação para esse hóspede.'); return }
        encontrados.forEach(h => console.log(`Acomodação: ${h.Acomodacao.NomeAcomadacao} | Check-in: ${h.DataCheckin}`))
    }
}
