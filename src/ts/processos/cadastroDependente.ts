import Processo from "../abstracoes/processo"
import Armazem from "../dominio/armazem"
import Cliente from "../modelos/cliente"

export default class CadastroDependente extends Processo {
    private clientes = Armazem.InstanciaUnica.Clientes
    processar(): void {
        console.log('Cadastro de dependente')
        if (this.clientes.length === 0) {
            console.log('Não há titulares cadastrados. Cadastre um titular antes de adicionar dependentes.')
            return
        }
        this.clientes.forEach((c, i) => console.log(`${i} - ${c.Nome} (${c.CPF || 'sem CPF'})`))
        const idx = this.entrada.receberNumero('Informe o índice do titular:')
        if (idx < 0 || idx >= this.clientes.length) { console.log('Índice inválido.'); return }
        const titular = this.clientes[idx]
        const nome = this.entrada.receberTexto('Nome do dependente:')
        const cpf = this.entrada.receberTexto('CPF do dependente:')
        const dataNascimento = this.entrada.receberData('Data de nascimento do dependente:')
        const dependente = new Cliente(nome, '', dataNascimento, cpf)
        titular.adicionarDependente(dependente)
        console.log('Dependente cadastrado com sucesso.')
    }
}
