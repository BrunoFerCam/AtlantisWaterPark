import Processo from "../abstracoes/processo";
import MenuPrincipal from "../menus/menuPricipal";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoListagemClientes from "./tipoListagemClientes";
import AtualizacaoCliente from "./atualizacaoCliente";
import RemocaoCliente from "./remocaoCliente";
import Entrada from "../io/entrada";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class Principal extends Processo {
    constructor() {
        super();
        this.execucao = true;
        this.menu = new MenuPrincipal();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('');
        switch (this.opcao) {
            case 1:
                console.log('\nCadastrar Cliente Titular');
                this.processo = new TipoCadastroCliente();
                this.processo.processar();
                break;
            case 2:
                console.log('\nListar Todos os Clientes');
                this.processo = new TipoListagemClientes();
                this.processo.processar();
                break;
            case 3:
                console.log('\nBuscar Cliente por CPF');
                this.buscarClientePorCPF();
                break;
            case 4:
                console.log('\nAtualizar Dados de Cliente');
                this.atualizarCliente();
                break;
            case 5:
                console.log('\nExcluir Cliente');
                this.removerCliente();
                break;
            case 6:
                console.log('\nAdicionar Dependente a um Titular');
                this.adicionarDependente();
                break;
            case 7:
                console.log('\nListar Dependentes de um Titular');
                this.listarDependentes();
                break;
            case 8:
                console.log('\nEncontrar Titular de um Dependente');
                this.encontrarTitular();
                break;
            case 9:
                console.log('\nExcluir Dependente');
                this.excluirDependente();
                break;
            case 0:
                this.execucao = false;
                console.log('\nObrigado por usar o Sistema Atlantis! Até logo!');
                break;
            default:
                console.log('\nOpção não válida! Por favor, escolha uma opção de 0 a 9.');
        }
    }

    private atualizarCliente(): void {
        let clienteId = this.entrada.receberTexto('ID do Cliente: ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(clienteId));
        if (cliente) {
            this.processo = new AtualizacaoCliente(cliente);
            this.processo.processar();
        } else {
            console.log('Cliente não encontrado!');
        }
    }

    private removerCliente(): void {
        let clienteId = this.entrada.receberTexto('ID do Cliente: ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(clienteId));
        if (cliente) {
            this.processo = new RemocaoCliente(cliente);
            this.processo.processar();
        } else {
            console.log('Cliente não encontrado!');
        }
    }

    private buscarClientePorCPF(): void {
        let cpf = this.entrada.receberTexto('Digite o CPF do cliente (xxx.xxx.xxx-xx): ');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => 
            c.Documentos.some(doc => doc.Numero === cpf && doc.Tipo.toString() === 'Cadastro de Pessoas Física')
        );
        
        if (cliente) {
            console.log('\nCliente encontrado:');
            console.log(`ID: ${cliente.Id}`);
            console.log(`Nome: ${cliente.Nome}`);
            console.log(`Nome Social: ${cliente.NomeSocial}`);
            console.log(`Data de Nascimento: ${cliente.DataNascimento.toLocaleDateString()}`);
            console.log(`Data de Cadastro: ${cliente.DataCadastro.toLocaleDateString()}`);
            
            if (cliente.Endereco) {
                console.log(`Endereço: ${cliente.Endereco.Rua}, ${cliente.Endereco.Bairro}, ${cliente.Endereco.Cidade}-${cliente.Endereco.Estado}`);
            }
            
            if (cliente.Telefones.length > 0) {
                console.log(`Telefone: (${cliente.Telefones[0].Ddd}) ${cliente.Telefones[0].Numero}`);
            }
            
            if (cliente.Titular) {
                console.log(`Dependente de: ${cliente.Titular.Nome} (ID: ${cliente.Titular.Id})`);
            } else {
                console.log(`Status: Cliente Titular`);
                if (cliente.Dependentes.length > 0) {
                    console.log(`Dependentes: ${cliente.Dependentes.length}`);
                }
            }
        } else {
            console.log('Cliente não encontrado com esse CPF!');
        }
    }

    private adicionarDependente(): void {
        let titularId = this.entrada.receberTexto('Digite o ID do titular: ');
        let titular = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(titularId) && !c.Titular);
        
        if (!titular) {
            console.log('Titular não encontrado!');
            return;
        }
        
        console.log(`Adicionando dependente para: ${titular.Nome}`);
        let nome = this.entrada.receberTexto('Nome do dependente: ');
        let nomeSocial = this.entrada.receberTexto('Nome social do dependente: ');
        let dataNascimentoStr = this.entrada.receberTexto('Data de nascimento (dd/mm/aaaa): ');
        
        // Parse da data
        let [dia, mes, ano] = dataNascimentoStr.split('/').map(Number);
        let dataNascimento = new Date(ano, mes - 1, dia);
        
        // Criar novo ID único
        let novoId = Math.max(...Armazem.InstanciaUnica.Clientes.map(c => c.Id)) + 1;
        
        // Criar dependente usando padrão Protótipo (copiando endereço do titular)
        let dependente = new Cliente(novoId, nome, nomeSocial, dataNascimento);
        dependente.Titular = titular;
        
        // Clonar endereço do titular (padrão Protótipo)
        if (titular.Endereco) {
            dependente.Endereco = titular.Endereco.clonar() as any;
        }
        
        // Copiar telefones do titular
        dependente.Telefones = [...titular.Telefones];
        
        titular.adicionarDependente(dependente);
        Armazem.InstanciaUnica.adicionarCliente(dependente);
        
        console.log(`Dependente ${nome} adicionado com sucesso! ID: ${novoId}`);
        console.log(`Endereço e telefone copiados do titular usando padrão Protótipo.`);
    }

    private listarDependentes(): void {
        let titularId = this.entrada.receberTexto('Digite o ID do titular: ');
        let titular = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(titularId) && !c.Titular);
        
        if (!titular) {
            console.log('Titular não encontrado!');
            return;
        }
        
        console.log(`\nDependentes de ${titular.Nome}:`);
        
        if (titular.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes cadastrados.');
        } else {
            titular.Dependentes.forEach((dependente, index) => {
                console.log(`\n${index + 1}. ${dependente.Nome}`);
                console.log(`   ID: ${dependente.Id}`);
                console.log(`   Nome Social: ${dependente.NomeSocial}`);
                console.log(`   Data de Nascimento: ${dependente.DataNascimento.toLocaleDateString()}`);
            });
        }
    }

    private encontrarTitular(): void {
        let dependenteId = this.entrada.receberTexto('Digite o ID do dependente: ');
        let dependente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(dependenteId) && c.Titular);
        
        if (!dependente) {
            console.log('Dependente não encontrado!');
            return;
        }
        
        console.log('\nTitular encontrado:');
        console.log(`Nome: ${dependente.Titular.Nome}`);
        console.log(`ID: ${dependente.Titular.Id}`);
        console.log(`Data de Cadastro: ${dependente.Titular.DataCadastro.toLocaleDateString()}`);
        console.log(`Total de Dependentes: ${dependente.Titular.Dependentes.length}`);
        
        if (dependente.Titular.Endereco) {
            console.log(`Endereço: ${dependente.Titular.Endereco.Rua}, ${dependente.Titular.Endereco.Cidade}`);
        }
    }

    private excluirDependente(): void {
        let dependenteId = this.entrada.receberTexto('Digite o ID do dependente: ');
        let dependente = Armazem.InstanciaUnica.Clientes.find(c => c.Id === Number(dependenteId) && c.Titular);
        
        if (!dependente) {
            console.log('Dependente não encontrado!');
            return;
        }
        
        let confirmacao = this.entrada.receberTexto(`Confirma a exclusão do dependente ${dependente.Nome}? (s/n): `);
        
        if (confirmacao.toLowerCase() === 's') {
            // Remover dependente da lista do titular
            let titular = dependente.Titular;
            titular.Dependentes = titular.Dependentes.filter(d => d.Id !== dependente.Id);
            
            // Remover dependente do armazém
            Armazem.InstanciaUnica.removerCliente(dependente);
            
            console.log(`Dependente ${dependente.Nome} removido com sucesso!`);
        } else {
            console.log('Operação cancelada.');
        }
    }
}