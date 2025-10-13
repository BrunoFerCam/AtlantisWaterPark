import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"

export default class ExcluirCliente extends Processo {
    private clientes = Armazem.InstanciaUnica.Clientes
    processar(): void {
        if (this.clientes.length === 0) { console.log('Nenhum cliente cadastrado.'); return }
        this.clientes.forEach((c, i) => console.log(`${i} - ${c.Nome} (${c.CPF || 'sem CPF'})`))
        const idx = this.entrada.receberNumero('Informe o índice do cliente a excluir:')
        if (idx < 0 || idx >= this.clientes.length) { console.log('Índice inválido.'); return }
        const cpf = this.clientes[idx].CPF
        const armazem = Armazem.InstanciaUnica
        const ok = armazem.removerClientePorCpf(cpf)
        if (ok) console.log('Cliente e seus dependentes removidos.')
        else console.log('Falha ao remover cliente.')
    }
}
