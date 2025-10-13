import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirHospedagem extends Processo {
    private hospedagens = Armazem.InstanciaUnica.Hospedagens
    constructor() { super() }

    processar(): void {
        if (this.hospedagens.length === 0) { console.log('Nenhuma hospedagem para excluir.'); return }
        this.hospedagens.forEach((h, i) => console.log(`${i} - Hóspede: ${h.Cliente.Nome} | Acomodação: ${h.Acomodacao.NomeAcomadacao}`))
        let idx = this.entrada.receberNumero('Informe o índice da hospedagem a excluir:')
        if (idx < 0 || idx >= this.hospedagens.length) { console.log('Índice inválido.'); return }
        this.hospedagens.splice(idx, 1)
        console.log('Hospedagem excluída.')
    }
}
