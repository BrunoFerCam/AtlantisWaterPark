import Menu from "../interfaces/menu";

export default class MenuPrincipal implements Menu {
    mostrar(): void {
        console.log(`\n====================================`)
        console.log(`    MENU PRINCIPAL - Sistema Atlantis`)
        console.log(`====================================`)
        console.log(``)
        console.log(`CLIENTES TITULARES`)
        console.log(`1 - Cadastrar Cliente Titular`)
        console.log(`2 - Listar Todos os Clientes`)
        console.log(`3 - Buscar Cliente por CPF`)
        console.log(`4 - Atualizar Dados de Cliente`)
        console.log(`5 - Excluir Cliente`)
        console.log(``)
        console.log(`DEPENDENTES`)
        console.log(`6 - Adicionar Dependente a um Titular`)
        console.log(`7 - Listar Dependentes de um Titular`)
        console.log(`8 - Encontrar Titular de um Dependente`)
        console.log(`9 - Excluir Dependente`)
        console.log(``)
        console.log(`0 - Sair do Sistema`)
        console.log(`====================================`)
        console.log(`\nDigite sua opção: `)
    }
}