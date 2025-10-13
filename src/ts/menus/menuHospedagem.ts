import Menu from "../interfaces/menu";

export default class MenuHospedagem implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| MENU ATLANTIS - HOSPEDAGEM`)
        console.log(`----------------------`)
        console.log(`| 1 - Registrar Hospedagem (vincular hóspede → acomodação)`)
        console.log(`| 2 - Listar Hospedagens Atuais`)
        console.log(`| 3 - Buscar Hóspede por Acomodação`)
        console.log(`| 4 - Buscar Acomodação por Hóspede`)
        console.log(`| 5 - Excluir Hospedagem`)
        console.log(`----------------------`)
        console.log(`| 0 - Voltar`)
        console.log(`****************************`)
    }
}
