import Menu from "../interfaces/menu";

export default class MenuTipoDocumento implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o tipo de documento para cadastro? `);
        console.log(`----------------------`);
        console.log(`| 1 - CPF`);
        console.log(`| 2 - RG`);
        console.log(`| 3 - Passaporte`);
        console.log(`| 0 - Sair`);
        console.log(`----------------------`);
    }
}