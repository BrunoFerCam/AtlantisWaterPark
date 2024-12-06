import { TipoDocumento } from "../../enumeracoes/tipoDocumento";

export default class Documento {
    public numero: string
    public tipo: TipoDocumento | String
    public dataExpedicao: Date
}