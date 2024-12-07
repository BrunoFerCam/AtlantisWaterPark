import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";
import Endereco from "../modelos/endereco";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class AtualizacaoCliente extends Processo {
    private cliente: Cliente;
    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Atualizando dados do cliente...');
        let opcao: number;
        do {
            console.log('Escolha o campo que deseja atualizar:');
            console.log('1. Nome');
            console.log('2. Nome Social');
            console.log('3. Data de Nascimento');
            console.log('4. Telefones');
            console.log('5. Endereço');
            console.log('6. Documentos');
            console.log('0. Sair');
            opcao = this.entrada.receberNumero('Opção: ');

            switch (opcao) {
                case 1:
                    let nome = this.entrada.receberTexto(`Nome atual: ${this.cliente.Nome}. Novo nome (deixe em branco para manter): `);
                    if (nome) this.cliente.Nome = nome;
                    break;
                case 2:
                    let nomeSocial = this.entrada.receberTexto(`Nome social atual: ${this.cliente.NomeSocial}. Novo nome social (deixe em branco para manter): `);
                    if (nomeSocial) this.cliente.NomeSocial = nomeSocial;
                    break;
                case 3:
                    let dataNascimento = this.entrada.receberData(`Data de nascimento atual: ${this.cliente.DataNascimento}. Nova data de nascimento (deixe em branco para manter): `);
                    if (dataNascimento) this.cliente.DataNascimento = dataNascimento;
                    break;
                case 4:
                    let telefones: Telefone[] = [];
                    let adicionarMais = true;
                    while (adicionarMais) {
                        let numero = this.entrada.receberTexto('Digite o número do telefone: ');
                        let ddd = this.entrada.receberTexto('Digite o DDD do telefone: ');
                        let telefone = new Telefone(ddd, numero);
                        telefones.push(telefone);
                        adicionarMais = this.entrada.receberTexto('Deseja adicionar mais um telefone? (s/n): ').toLowerCase() === 's';
                    }
                    if (telefones.length > 0) this.cliente.Telefones = telefones;
                    break;
                case 5:
                    let endereco = new Endereco(
                        this.entrada.receberTexto('Digite a rua: '),
                        this.entrada.receberTexto('Digite o número: '),
                        this.entrada.receberTexto('Digite o bairro: '),
                        this.entrada.receberTexto('Digite a cidade: '),
                        this.entrada.receberTexto('Digite o estado: '),
                        this.entrada.receberTexto('Digite o país: '),
                    );
                    this.entrada.receberTexto('Digite o CEP: ');
                    this.cliente.Endereco = endereco;
                    break;
                case 6:
                    let documentos: Documento[] = [];
                    let adicionarMaisDocs = true;
                    while (adicionarMaisDocs) {
                        let tipoString = this.entrada.receberTexto('Digite o tipo do documento (CPF, RG, Passaporte): ');
                        let tipo: TipoDocumento;
                        switch (tipoString.toUpperCase()) {
                            case 'CPF':
                                tipo = TipoDocumento.CPF;
                                break;
                            case 'RG':
                                tipo = TipoDocumento.RG;
                                break;
                            case 'PASSAPORTE':
                                tipo = TipoDocumento.Passaporte;
                                break;
                            default:
                                console.log('Tipo de documento inválido.');
                                continue;
                        }
                        let numero = this.entrada.receberTexto('Digite o número do documento: ');
                        let dataExpedicao = this.entrada.receberData('Digite a data de expedição do documento: ');
                        let documento = new Documento(numero, tipo, dataExpedicao);
                        documentos.push(documento);
                        adicionarMaisDocs = this.entrada.receberTexto('Deseja adicionar mais um documento? (s/n): ').toLowerCase() === 's';
                    }
                    if (documentos.length > 0) this.cliente.Documentos = documentos;
                    break;
                case 0:
                    console.log('Saindo da atualização de dados.');
                    break;
                default:
                    console.log('Opção inválida.');
            }
        } while (opcao !== 0);

        console.log('Dados do cliente atualizados.');
    }
}