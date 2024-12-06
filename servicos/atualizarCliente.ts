import Cliente from "../modelos/valores/cliente";
import Telefone from "../modelos/valores/telefone";
import promptSync from 'prompt-sync';

const prompt = promptSync();

export default function atualizarCliente(clientes: Cliente[]): void {
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    console.log(`\n=====> Lista de Clientes Registrados <=====`);
    clientes.forEach((cliente, index) => {
        console.log(`${index + 1} - ${cliente.nome}`);
    });

    const indice = parseInt(prompt("Digite o número do cliente que deseja atualizar: ")) - 1;

    if (indice < 0 || indice >= clientes.length) {
        console.log("Cliente não encontrado.");
        return;
    }

    const cliente = clientes[indice];

    console.log(`\nAtualizando dados do cliente: ${cliente.nome}`);
    cliente.nome = prompt(`Nome (${cliente.nome}): `) || cliente.nome;
    cliente.nomeSocial = prompt(`Nome Social (${cliente.nomeSocial}): `) || cliente.nomeSocial;
    cliente.dataNascimento = new Date(prompt(`Data de Nascimento (${cliente.dataNascimento.toDateString()}): `) || cliente.dataNascimento.toDateString());
    cliente.endereco.rua = prompt(`Rua (${cliente.endereco.rua}): `) || cliente.endereco.rua;
    cliente.endereco.bairro = prompt(`Bairro (${cliente.endereco.bairro}): `) || cliente.endereco.bairro;
    cliente.endereco.cidade = prompt(`Cidade (${cliente.endereco.cidade}): `) || cliente.endereco.cidade;
    cliente.endereco.estado = prompt(`Estado (${cliente.endereco.estado}): `) || cliente.endereco.estado;
    cliente.endereco.codigoPostal = prompt(`Código Postal (${cliente.endereco.codigoPostal}): `) || cliente.endereco.codigoPostal;

    // Atualizando telefones
    const atualizarTelefones = prompt("Deseja atualizar os telefones? (s/n): ");
    if (atualizarTelefones.toLowerCase() === 's') {
        cliente.telefones = [];
        let adicionarMais = true;
        while (adicionarMais) {
            const ddd = prompt("DDD: ");
            const numero = prompt("Número: ");
            cliente.telefones.push(new Telefone(ddd, numero));
            adicionarMais = prompt("Deseja adicionar outro telefone? (s/n): ").toLowerCase() === 's';
        }
    }

    // Atualizando dependentes
    const atualizarDependentes = prompt("Deseja atualizar os dependentes? (s/n): ");
    if (atualizarDependentes.toLowerCase() === 's') {
        cliente.dependentes = [];
        let adicionarMais = true;
        while (adicionarMais) {
            const nomeDependente = prompt("Nome do dependente: ");
            const nomeSocialDependente = prompt("Nome social do dependente: ");
            const dataNascimentoDependente = new Date(prompt("Data de nascimento do dependente (aaaa-mm-dd): "));
            const enderecoDependente = cliente.endereco; // Usando o mesmo endereço do titular
            cliente.dependentes.push(new Cliente(nomeDependente, nomeSocialDependente, dataNascimentoDependente, enderecoDependente));
            adicionarMais = prompt("Deseja adicionar outro dependente? (s/n): ").toLowerCase() === 's';
        }
    }

    console.log("Cliente atualizado com sucesso.");
}