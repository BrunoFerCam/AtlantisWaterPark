import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem();
    private clientes: Cliente[] = [];
    private constructor() { 
        this.inicializarClientesPadrao();
    }

    private inicializarClientesPadrao(): void {
        // Cliente 1 - João Silva (Titular)
        let cliente1 = new Cliente(1, "João Silva", "João", new Date("1985-03-15"));
        cliente1.Telefones = [new Telefone("11", "99999-1111")];
        cliente1.Endereco = new Endereco("Rua das Flores, 123", "Centro", "São Paulo", "SP", "Brasil", "01234-567");
        cliente1.Documentos = [
            new Documento("123.456.789-01", TipoDocumento.CPF, new Date("2020-01-15")),
            new Documento("12.345.678-9", TipoDocumento.RG, new Date("2019-05-10"))
        ];

        // Cliente 2 - Maria Silva (Dependente do João)
        let cliente2 = new Cliente(2, "Maria Silva", "Maria", new Date("1990-07-22"));
        cliente2.Telefones = [new Telefone("11", "99999-2222")];
        cliente2.Endereco = new Endereco("Rua das Flores, 123", "Centro", "São Paulo", "SP", "Brasil", "01234-567");
        cliente2.Documentos = [
            new Documento("987.654.321-00", TipoDocumento.CPF, new Date("2020-02-10")),
            new Documento("98.765.432-1", TipoDocumento.RG, new Date("2019-08-15"))
        ];
        cliente2.Titular = cliente1;
        cliente1.adicionarDependente(cliente2);

        // Cliente 3 - Ana Costa (Titular)
        let cliente3 = new Cliente(3, "Ana Costa", "Ana", new Date("1992-12-05"));
        cliente3.Telefones = [new Telefone("21", "99999-3333")];
        cliente3.Endereco = new Endereco("Av. Atlântica, 456", "Copacabana", "Rio de Janeiro", "RJ", "Brasil", "22070-000");
        cliente3.Documentos = [
            new Documento("456.789.123-45", TipoDocumento.CPF, new Date("2021-03-20")),
            new Documento("AB123456", TipoDocumento.Passaporte, new Date("2022-01-10"))
        ];

        // Cliente 4 - Pedro Costa (Dependente da Ana)
        let cliente4 = new Cliente(4, "Pedro Costa", "Pedro", new Date("2010-04-18"));
        cliente4.Telefones = [new Telefone("21", "99999-4444")];
        cliente4.Endereco = new Endereco("Av. Atlântica, 456", "Copacabana", "Rio de Janeiro", "RJ", "Brasil", "22070-000");
        cliente4.Documentos = [
            new Documento("789.123.456-78", TipoDocumento.CPF, new Date("2021-04-25"))
        ];
        cliente4.Titular = cliente3;
        cliente3.adicionarDependente(cliente4);

        // Cliente 5 - Carlos Oliveira (Titular)
        let cliente5 = new Cliente(5, "Carlos Oliveira", "Carlos", new Date("1978-09-30"));
        cliente5.Telefones = [new Telefone("31", "99999-5555")];
        cliente5.Endereco = new Endereco("Rua da Liberdade, 789", "Centro", "Belo Horizonte", "MG", "Brasil", "30112-000");
        cliente5.Documentos = [
            new Documento("321.654.987-11", TipoDocumento.CPF, new Date("2020-12-05")),
            new Documento("32.165.498-7", TipoDocumento.RG, new Date("2020-11-20"))
        ];

        this.clientes.push(cliente1, cliente2, cliente3, cliente4, cliente5);
        console.log("Clientes padrão carregados no sistema:");
        console.log(`   - ${cliente1.Nome} (ID: ${cliente1.Id}) - Titular`);
        console.log(`   - ${cliente2.Nome} (ID: ${cliente2.Id}) - Dependente de ${cliente1.Nome}`);
        console.log(`   - ${cliente3.Nome} (ID: ${cliente3.Id}) - Titular`);
        console.log(`   - ${cliente4.Nome} (ID: ${cliente4.Id}) - Dependente de ${cliente3.Nome}`);
        console.log(`   - ${cliente5.Nome} (ID: ${cliente5.Id}) - Titular`);
        console.log("");
    }

    public static get InstanciaUnica() {
        return this.instanciaUnica;
    }

    public get Clientes() {
        return this.clientes;
    }

    public adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public removerCliente(cliente: Cliente): void {
        this.clientes = this.clientes.filter(c => c.Id !== cliente.Id);
    }
}