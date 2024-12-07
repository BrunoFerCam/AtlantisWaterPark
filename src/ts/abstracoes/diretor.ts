import Cliente from "../modelos/cliente";

export default abstract class Diretor<T> {
    protected construtor: any;

    public abstract construir(cliente: Cliente): T;
}