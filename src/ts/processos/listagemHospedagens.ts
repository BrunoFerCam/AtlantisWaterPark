import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ListagemHospedagens extends Processo {
    private hospedagens = Armazem.InstanciaUnica.Hospedagens
    constructor() {
        super()
    }

    processar(): void {
        if (this.hospedagens.length === 0) {
            console.log('Nenhuma hospedagem encontrada.')
            return
        }
        this.hospedagens.forEach((h, i) => {
            console.log(`${i} - Hóspede: ${h.Cliente.Nome} | Acomodação: ${h.Acomodacao.NomeAcomadacao} | Check-in: ${h.DataCheckin}`)
        })
    }
}
