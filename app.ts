import Entrada from "./teste/entrada";
import ListarClientes from "./servicos/listarCliente";
import CadastrarCliente from "./servicos/cadastrarCliente";
import Cliente from "./modelos/valores/cliente";
import deletarCliente from "./servicos/deletarCliente";
import Telefone from "./modelos/valores/telefone";
import Endereco from "./modelos/valores/endereco";
import Documento from "./modelos/valores/documento";
import atualizarCliente from "./servicos/atualizarCliente";

const clientes = new Array<Cliente>();



console.log(`Inciando sequência de interação com o usuário.`);
console.log(` `)
console.log(` `)
console.log(` `)
console.log(`Bem-vindo/a ao Atlantis Water Park.`);
let execucao = true
while(execucao){
    console.log(`Insira o processo desejado: `)
    console.log(`*---------------------------*`)    
    console.log(`1 - Cadastrar cliente`)
    console.log(`2 - Listar Clientes`)
    console.log(`3 - Deletar Cliente`)
    console.log(`4 - Atualizar Cliente`)
    console.log(`0 - sair`)
    let entrada = new Entrada()
    let opcao = entrada.receberNumero("Insira o número da opção desejada: ");

    switch (opcao) {
        case 1:
            CadastrarCliente(clientes);
            break;
        case 2:
            ListarClientes(clientes);
            break;
        case 3:
            deletarCliente(clientes);
            break;
        case 4:
            atualizarCliente(clientes);
            break;
        case 0:
            execucao = false;
            console.log(`Encerrando o sistema...`);
            break;
        default:
            console.log(`Opção inválida.`);
    }
}