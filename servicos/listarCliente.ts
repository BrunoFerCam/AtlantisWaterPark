import Cliente from "../modelos/valores/cliente";
import promptSync from 'prompt-sync';

const prompt = promptSync();

export default function ListarClientes(clientes: Cliente[]): void {
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    console.log(`\n=====> Lista de Clientes Registrados <=====`);

    clientes.forEach((clientes, index) => {
        console.log(`\nCliente ${index + 1}:`);
        console.log(`Nome: ${clientes.nome}`);
        console.log(`Nome Social: ${clientes.nomeSocial}`);
        console.log(`Data de Nascimento: ${clientes.dataNascimento.toDateString()}`);
        console.log(`Data de Cadastro: ${clientes.dataCadastro.toDateString()}`);
        console.log(`Endereço: ${clientes.endereco.rua}, ${clientes.endereco.bairro}, ${clientes.endereco.cidade}, ${clientes.endereco.estado}, ${clientes.endereco.codigoPostal}`);

        clientes.telefones.forEach((telefone, telIndex) => {
            console.log(`Telefone ${telIndex + 1}: (${telefone.ddd}) ${telefone.numero}`);
        });

        clientes.documentos.forEach((documento, docIndex) => {
            console.log(`Documento ${docIndex + 1}: Tipo: ${documento.tipo}, Número: ${documento.numero}, Data de Emissão: ${documento.dataExpedicao.toDateString()}`);
        });

        if (clientes.dependentes.length > 0) {
            console.log("\nDependentes:");
            clientes.dependentes.forEach((dependente, depIndex) => {
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
}
