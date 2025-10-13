import Cliente from "./cliente";
import Acomodacao from "./acomodacao";

export default class Hospedagem {
    private cliente: Cliente
    private acomodacao: Acomodacao
    private dataCheckin: Date

    constructor(cliente: Cliente, acomodacao: Acomodacao, dataCheckin: Date = new Date()){
        this.cliente = cliente
        this.acomodacao = acomodacao
        this.dataCheckin = dataCheckin
    }

    public get Cliente(){ return this.cliente }
    public get Acomodacao(){ return this.acomodacao }
    public get DataCheckin(){ return this.dataCheckin }
}
