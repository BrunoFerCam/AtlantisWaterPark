import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Hospedagem from "../modelos/hospedagem";

export default class CadastroHospedagem extends Processo {
    private hospedagens = Armazem.InstanciaUnica.Hospedagens
    private clientes = Armazem.InstanciaUnica.Clientes
    private acomodacoes = Armazem.InstanciaUnica.Acomodacoes

    constructor() {
        super()
    }

    processar(): void {
        if (this.clientes.length === 0) {
            console.log('Não há clientes cadastrados. Cadastre um cliente antes de criar uma hospedagem.')
            return
        }
        if (this.acomodacoes.length === 0) {
            console.log('Não há acomodações cadastradas. Cadastre acomodações antes de criar uma hospedagem.')
            return
        }

        console.log('Clientes:')
        this.clientes.forEach((c, i) => console.log(`${i} - ${c.Nome}`))
        let indiceCliente = this.entrada.receberNumero('Informe o índice do cliente:')
        if (indiceCliente < 0 || indiceCliente >= this.clientes.length) {
            console.log('Índice de cliente inválido.')
            return
        }

        console.log('Acomodações:')
        this.acomodacoes.forEach((a, i) => console.log(`${i} - ${a.NomeAcomadacao}`))
        let indiceAcomodacao = this.entrada.receberNumero('Informe o índice da acomodação:')
        if (indiceAcomodacao < 0 || indiceAcomodacao >= this.acomodacoes.length) {
            console.log('Índice de acomodação inválido.')
            return
        }

        let cliente = this.clientes[indiceCliente]
        let acomodacao = this.acomodacoes[indiceAcomodacao]
        let hospedagem = new Hospedagem(cliente, acomodacao)
        this.hospedagens.push(hospedagem)
        console.log('Hospedagem cadastrada com sucesso.')
    }
}
