import Menu from "../interfaces/menu";

export default class MenuAcomodacao implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Selecione o tipo de acomodação:`)
        console.log(`----------------------`)
        console.log(`| 1 - Casal Simples`)
        console.log(`| 2 - Família Simples`)
        console.log(`| 3 - Família Mais`)
        console.log(`| 4 - Família Super`)
        console.log(`| 5 - Solteiro Simples`)
        console.log(`| 6 - Solteiro Mais`)
        console.log(`****************************`)
    }
}