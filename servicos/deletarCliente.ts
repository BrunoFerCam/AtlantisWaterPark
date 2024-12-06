import Cliente from "../modelos/valores/cliente";
import promptSync from 'prompt-sync';

const prompt = promptSync();

export default function deletarCliente(clientes: Cliente[]): void {
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    console.log(`\n=====> Lista de Clientes Registrados <=====`);

    clientes.forEach((cliente, index) => {
        console.log(`\nCliente ${index + 1}:`);
        console.log(`Nome: ${cliente.nome}`);
        console.log(`Nome Social: ${cliente.nomeSocial}`);
        console.log(`Data de Nascimento: ${cliente.dataNascimento.toDateString()}`);
        console.log(`Data de Cadastro: ${cliente.dataCadastro.toDateString()}`);
        console.log(`Endereço: ${cliente.endereco.rua}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade}, ${cliente.endereco.estado}, ${cliente.endereco.codigoPostal}`);

        cliente.telefones.forEach((telefone, telIndex) => {
            console.log(`Telefone ${telIndex + 1}: (${telefone.ddd}) ${telefone.numero}`);
        });

        cliente.documentos.forEach((documento, docIndex) => {
            console.log(`Documento ${docIndex + 1}: Tipo: ${documento.tipo}, Número: ${documento.numero}, Data de Emissão: ${documento.dataExpedicao.toDateString()}`);
        });

        if (cliente.dependentes.length > 0) {
            console.log("\nDependentes:");
            cliente.dependentes.forEach((dependente, depIndex) => {
                console.log(`Dependente ${depIndex + 1}:`);
                console.log(`   Nome: ${dependente.nome}`);
                console.log(`   Nome Social: ${dependente.nomeSocial}`);
                console.log(`   Data de Nascimento: ${dependente.dataNascimento.toDateString()}`);
                console.log(`   Data de Cadastro: ${dependente.dataCadastro.toDateString()}`);
                console.log(`   Endereço: ${dependente.endereco.rua}, ${dependente.endereco.bairro}, ${dependente.endereco.cidade}, ${dependente.endereco.estado}, ${dependente.endereco.codigoPostal}`);
                dependente.telefones.forEach((telefone, depTelIndex) => {
                    console.log(`   Telefone ${depTelIndex + 1}: (${telefone.ddd}) ${telefone.numero}`);
                });
                dependente.documentos.forEach((documento, depDocIndex) => {
                    console.log(`   Documento ${depDocIndex + 1}: Tipo: ${documento.tipo}, Número: ${documento.numero}, Data de Emissão: ${documento.dataExpedicao.toDateString()}`);
                });
            });
        } else {
            console.log("   Não há dependentes registrados para este cliente.");
        }
    });

    const clienteIndex = prompt("Digite o número do cliente que deseja deletar: ");
    const index = parseInt(clienteIndex) - 1;

    if (index >= 0 && index < clientes.length) {
        clientes.splice(index, 1);
        console.log("Cliente deletado com sucesso.");
    } else {
        console.log("Cliente não encontrado.");
    }
}
