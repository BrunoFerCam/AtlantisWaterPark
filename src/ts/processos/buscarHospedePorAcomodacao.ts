import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class BuscarHospedePorAcomodacao extends Processo {
    private hospedagens = Armazem.InstanciaUnica.Hospedagens
    private acomodacoes = Armazem.InstanciaUnica.Acomodacoes

    constructor() { super() }

    processar(): void {
        if (this.acomodacoes.length === 0) {
            console.log('Não há acomodações cadastradas.')
            return
        }
        this.acomodacoes.forEach((a, i) => console.log(`${i} - ${a.NomeAcomadacao}`))
        let idx = this.entrada.receberNumero('Informe o índice da acomodação:')
        if (idx < 0 || idx >= this.acomodacoes.length) { console.log('Índice inválido.'); return }
        let acomodacao = this.acomodacoes[idx]
        let encontrados = this.hospedagens.filter(h => h.Acomodacao === acomodacao)
        if (encontrados.length === 0) { console.log('Nenhum hóspede para essa acomodação.'); return }
        encontrados.forEach(h => console.log(`Hóspede: ${h.Cliente.Nome} | Check-in: ${h.DataCheckin}`))
    }
}
