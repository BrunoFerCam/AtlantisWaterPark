import express from 'express'
import cors from 'cors'
import Armazem from '../../src/ts/dominio/armazem'
import Cliente from '../../src/ts/modelos/cliente'
// Attempt to load DB API; if it fails (dependency missing) we'll continue with in-memory Armazem
let dbApi: any = null
try {
  const createDbApi = require('./db').default
  dbApi = createDbApi()
  console.log('DB API loaded, persistence enabled')
} catch (err) {
  console.warn('DB API not available, using in-memory store. Run `npm install` in server/ to enable DB persistence.')
}
import type { Request, Response } from 'express'

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3333

const armazem = Armazem.InstanciaUnica

// Seed some default data so the UI has content on first load
function seedData(){
  try {
    if (armazem.Clientes.length > 0 || armazem.Acomodacoes.length > 0) return

    const ClienteClass = require('../../src/ts/modelos/cliente').default
    const EnderecoClass = require('../../src/ts/modelos/endereco').default
    const TelefoneClass = require('../../src/ts/modelos/telefone').default
    const DocumentoClass = require('../../src/ts/modelos/documento').default
    const { TipoDocumento } = require('../../src/ts/enumeracoes/TipoDocumento')

    // Titular 1
    const joao = new ClienteClass('João Silva', '', new Date('1985-04-12'), '11111111111')
    joao.Endereco = new EnderecoClass('Rua A, 123', 'Centro', 'Cidade X', 'Estado Y', 'Brasil', '12345-678')
    joao.Telefones.push(new TelefoneClass('11','99999-0001'))
    joao.Documentos.push(new DocumentoClass('MG-12.345.678', TipoDocumento.RG, new Date('2000-01-01')))

    // Dependent for João
    const maria = new ClienteClass('Maria Silva', '', new Date('2010-06-22'), '22222222222')
    // use domain method to add dependent (will clone endereco/telefones)
    joao.adicionarDependente(maria)

    // Titular 2
    const ana = new ClienteClass('Ana Pereira', 'Aninha', new Date('1990-09-05'), '33333333333')
    ana.Endereco = new EnderecoClass('Av. B, 456', 'Bairro', 'Cidade Z', 'Estado W', 'Brasil', '98765-432')
    ana.Telefones.push(new TelefoneClass('21','98888-1111'))

    // add to armazem
    if (typeof armazem.adicionarCliente === 'function') {
      armazem.adicionarCliente(joao)
      armazem.adicionarCliente(ana)
    } else {
      armazem.Clientes.push(joao)
      armazem.Clientes.push(ana)
    }

    // Create a couple of acomodacoes using directors
    const DiretorSolteiroSimples = require('../../src/ts/diretores/diretorSolteiroSimples').default
    const DiretorCasalSimples = require('../../src/ts/diretores/diretorCasalSimples').default
    const d1 = new DiretorSolteiroSimples(); armazem.Acomodacoes.push(d1.construir())
    const d2 = new DiretorCasalSimples(); armazem.Acomodacoes.push(d2.construir())

    // create a hospedagem for joao in the first acomodacao
    if (armazem.Acomodacoes.length > 0) {
      const Hospedagem = require('../../src/ts/modelos/hospedagem').default
      const hospedagem = new Hospedagem(joao, armazem.Acomodacoes[0])
      armazem.Hospedagens.push(hospedagem)
    }

    console.log('Seeded default data: 2 titulares, 1 dependente, 2 acomodacoes, 1 hospedagem')
  } catch (err) {
    console.error('Error seeding data:', err)
  }
}

seedData()

// Helper: serialize Cliente to plain object
function clienteToPlain(c: any) {
  return {
    id: c.id || null,
    nome: c.Nome,
    cpf: c.CPF,
    nomeSocial: c.NomeSocial,
    dataNascimento: c.DataNascimento,
    dataCadastro: c.DataCadastro,
    telefones: c.Telefones ? c.Telefones.map((t: any) => ({ ddd: t.Ddd, numero: t.Numero })) : [],
    endereco: c.Endereco ? {
      rua: c.Endereco.Rua,
      bairro: c.Endereco.Bairro,
      cidade: c.Endereco.Cidade,
      estado: c.Endereco.Estado,
      pais: c.Endereco.Pais,
      codigoPostal: c.Endereco.CodigoPostal
    } : null,
    documentos: c.Documentos || [],
    dependentes: c.Dependentes ? c.Dependentes.map((d: any) => ({ nome: d.Nome, nomeSocial: d.NomeSocial, cpf: d.CPF })) : []
  }
}

app.get('/clientes', (req: Request, res: Response) => {
  if (dbApi) {
    const titulares = dbApi.getTitulares()
    const list = titulares.map((t: any) => ({
      id: t.id,
      nome: t.nome,
      nomeSocial: t.nomeSocial,
      dataNascimento: t.dataNascimento,
      dataCadastro: t.dataCadastro,
      cpf: t.cpf,
      telefones: t.telefones,
      endereco: t.endereco,
      documentos: t.documentos,
      dependentes: dbApi.getDependentesOf(t.cpf).map((d: any) => ({ nome: d.nome, cpf: d.cpf, nomeSocial: d.nomeSocial }))
    }))
    return res.json(list)
  }
  const list = armazem.Clientes.map((c: any) => clienteToPlain(c))
  res.json(list)
})

app.post('/clientes', (req: Request, res: Response) => {
  const { nome, nomeSocial, dataNascimento } = req.body
  if (!nome || !dataNascimento) {
    return res.status(400).json({ error: 'nome and dataNascimento required' })
  }
  const nascimento = new Date(dataNascimento)
  const cpf = req.body.cpf
  if (cpf && ((dbApi && dbApi.cpfExists(cpf)) || armazem.cpfExiste(cpf))) return res.status(400).json({ error: 'cpf already exists' })
  // If DB enabled, persist
  if (dbApi) {
    try {
      const created = dbApi.insertCliente({ nome, nomeSocial, dataNascimento, cpf })
      return res.status(201).json(created)
    } catch (err) {
      console.error('DB insert error:', err)
      return res.status(500).json({ error: 'db error' })
    }
  }

  const cliente = new Cliente(nome, nomeSocial || '', nascimento, cpf)
  armazem.Clientes.push(cliente)
  return res.status(201).json(clienteToPlain(cliente))
})

app.post('/clientes/:index/dependentes', (req: Request, res: Response) => {
  const idx = Number(req.params.index)
  console.log('POST /clientes/' + req.params.index + '/dependentes', req.body)
  const { nome, nomeSocial, dataNascimento, clonarContato, cpf } = req.body
  if (!nome || !dataNascimento || !cpf) return res.status(400).json({ error: 'nome, dataNascimento and cpf required' })

  // When DB is enabled, we expect :index to be titular id
  if (dbApi) {
    const titularId = Number(req.params.index)
    const titulares = dbApi.getTitulares()
    const titular = titulares.find((t: any) => t.id === titularId)
    if (!titular) return res.status(404).json({ error: 'titular not found' })
    if (dbApi.cpfExists(cpf)) return res.status(400).json({ error: 'cpf already exists' })
    try {
      const dependente = dbApi.insertDependente(titular.cpf, { nome, nomeSocial, dataNascimento, cpf, endereco: clonarContato ? titular.endereco : null, telefones: clonarContato ? titular.telefones : [] })
      return res.status(201).json(dependente)
    } catch (err) {
      console.error('DB error inserting dependente:', err)
      return res.status(500).json({ error: 'db error' })
    }
  }

  const idxNum = Number(req.params.index)
  const titular = armazem.Clientes[idxNum]
  if (!titular) return res.status(404).json({ error: 'titular not found' })
  const nascimento = new Date(dataNascimento)
  if (armazem.cpfExiste(cpf)) return res.status(400).json({ error: 'cpf already exists' })
  const dependente = new Cliente(nome, nomeSocial || '', nascimento, cpf)
  try {
    titular.adicionarDependente(dependente)
  } catch (err) {
    console.error('Erro ao adicionar dependente:', err)
    return res.status(500).json({ error: 'erro ao cadastrar dependente' })
  }
  return res.status(201).json(clienteToPlain(dependente))
})

// Delete dependent by cpf for a titular
app.delete('/clientes/:index/dependentes/:cpf', (req: Request, res: Response) => {
  const cpf = req.params.cpf
  if (dbApi) {
    const titularId = Number(req.params.index)
    const titulares = dbApi.getTitulares()
    const titular = titulares.find((t: any) => t.id === titularId)
    if (!titular) return res.status(404).json({ error: 'titular not found' })
    const ok = dbApi.removeDependente(titular.cpf, cpf)
    if (ok) return res.json({ msg: 'dependente removido' })
    return res.status(404).json({ error: 'dependente não encontrado' })
  }
  const idx = Number(req.params.index)
  const titular = armazem.Clientes[idx]
  if (!titular) return res.status(404).json({ error: 'titular not found' })
  const ok = titular.removerDependentePorCpf(cpf)
  if (ok) return res.json({ msg: 'dependente removido' })
  return res.status(404).json({ error: 'dependente não encontrado' })
})

// Delete titular (cascade dependents)
app.delete('/clientes/:index', (req: Request, res: Response) => {
  // When DB enabled, :index is id
  if (dbApi) {
    const id = Number(req.params.index)
    const titulares = dbApi.getTitulares()
    const titular = titulares.find((t: any) => t.id === id)
    if (!titular) return res.status(404).json({ error: 'cliente not found' })
    const ok = dbApi.removeClienteByCpf(titular.cpf)
    if (ok) return res.json({ msg: 'cliente e dependentes removidos' })
    return res.status(500).json({ error: 'falha ao remover' })
  }
  const idx = Number(req.params.index)
  const cliente = armazem.Clientes[idx]
  if (!cliente) return res.status(404).json({ error: 'cliente not found' })
  const cpf = cliente.CPF
  const ok = armazem.removerClientePorCpf(cpf)
  if (ok) return res.json({ msg: 'cliente e dependentes removidos' })
  return res.status(500).json({ error: 'falha ao remover' })
})

// Acomodações
app.get('/acomodacoes', (req: Request, res: Response) => {
  const list = armazem.Acomodacoes.map((a: any) => ({
    nomeAcomadacao: a.NomeAcomadacao,
    camaSolteiro: a.CamaSolteiro,
    camaCasal: a.CamaCasal,
    suite: a.Suite,
    climatizacao: a.Climatizacao,
    garagem: a.Garagem
  }))
  res.json(list)
})

app.post('/acomodacoes', (req: Request, res: Response) => {
  // Accept optional tipo in body to choose the director implementation
  const tipo: string = req.body && req.body.tipo ? String(req.body.tipo) : 'solteiro-simples'
  let DiretorClass: any = null
  try {
    switch (tipo) {
      case 'solteiro-simples':
        DiretorClass = require('../../src/ts/diretores/diretorSolteiroSimples').default
        break
      case 'solteiro-mais':
        DiretorClass = require('../../src/ts/diretores/diretorSolteiroMais').default
        break
      case 'casal-simples':
        DiretorClass = require('../../src/ts/diretores/diretorCasalSimples').default
        break
      case 'familia-simples':
        DiretorClass = require('../../src/ts/diretores/diretorFamiliaSimples').default
        break
      case 'familia-mais':
        DiretorClass = require('../../src/ts/diretores/diretorFamiliaMais').default
        break
      case 'familia-super':
        DiretorClass = require('../../src/ts/diretores/diretorFamiliaSuper').default
        break
      default:
        DiretorClass = require('../../src/ts/diretores/diretorSolteiroSimples').default
    }
  } catch (err) {
    console.error('Erro ao carregar diretor:', err)
    return res.status(500).json({ error: 'erro ao criar acomodacao' })
  }

  try {
    const diretor = new DiretorClass()
    const acomodacao = diretor.construir()
    armazem.Acomodacoes.push(acomodacao)
    // return the created acomodacao in the same shape as GET
    return res.status(201).json({
      nomeAcomadacao: acomodacao.NomeAcomadacao,
      camaSolteiro: acomodacao.CamaSolteiro,
      camaCasal: acomodacao.CamaCasal,
      suite: acomodacao.Suite,
      climatizacao: acomodacao.Climatizacao,
      garagem: acomodacao.Garagem
    })
  } catch (err) {
    console.error('Erro ao construir acomodacao:', err)
    return res.status(500).json({ error: 'erro ao criar acomodacao' })
  }
})

// Hospedagens
app.get('/hospedagens', (req: Request, res: Response) => {
  const list = armazem.Hospedagens.map((h: any, i: number) => ({
    id: i,
    cliente: { nome: h.Cliente.Nome },
    acomodacao: { nome: h.Acomodacao.NomeAcomadacao },
    checkin: h.DataCheckin
  }))
  res.json(list)
})

app.post('/hospedagens', (req: Request, res: Response) => {
  const { clienteIndex, acomodacaoIndex } = req.body
  const clientes = armazem.Clientes
  const acoms = armazem.Acomodacoes
  if (typeof clienteIndex !== 'number' || typeof acomodacaoIndex !== 'number') return res.status(400).json({ error: 'indices required' })
  if (clienteIndex < 0 || clienteIndex >= clientes.length) return res.status(400).json({ error: 'invalid cliente index' })
  if (acomodacaoIndex < 0 || acomodacaoIndex >= acoms.length) return res.status(400).json({ error: 'invalid acomodacao index' })
  // Prevent double-booking of the same acomodacao instance
  const acomodacaoSelecionada = acoms[acomodacaoIndex]
  const ocupada = armazem.Hospedagens.some((h: any) => h.Acomodacao === acomodacaoSelecionada)
  if (ocupada) return res.status(400).json({ error: 'acomodacao already booked' })

  // Prevent the same cliente from booking the same acomodacao twice
  const clienteSelecionado = clientes[clienteIndex]
  const clienteJaHospedado = armazem.Hospedagens.some((h: any) => h.Cliente === clienteSelecionado && h.Acomodacao === acomodacaoSelecionada)
  if (clienteJaHospedado) return res.status(400).json({ error: 'cliente already has this hospedagem' })
  const Hospedagem = require('../../src/ts/modelos/hospedagem').default
  const hospedagem = new Hospedagem(clientes[clienteIndex], acoms[acomodacaoIndex])
  armazem.Hospedagens.push(hospedagem)
  res.status(201).json({ msg: 'hospedagem criada' })
})

app.delete('/hospedagens/:index', (req: Request, res: Response) => {
  const idx = Number(req.params.index)
  if (isNaN(idx) || idx < 0 || idx >= armazem.Hospedagens.length) return res.status(400).json({ error: 'invalid index' })
  armazem.Hospedagens.splice(idx, 1)
  res.json({ msg: 'hospedagem excluida' })
})

// Update endereco for titular
app.put('/clientes/:index/endereco', (req: Request, res: Response) => {
  const idx = Number(req.params.index)
  const titular = armazem.Clientes[idx]
  if (!titular) return res.status(404).json({ error: 'titular not found' })
  const { rua, bairro, cidade, estado, pais, codigoPostal } = req.body
  const Endereco = require('../../src/ts/modelos/endereco').default
  const endereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal)
  titular.Endereco = endereco
  res.json({ msg: 'endereco atualizado' })
})

// Add telefone to titular
app.post('/clientes/:index/telefones', (req: Request, res: Response) => {
  const idx = Number(req.params.index)
  const titular = armazem.Clientes[idx]
  if (!titular) return res.status(404).json({ error: 'titular not found' })
  const { ddd, numero } = req.body
  const Telefone = require('../../src/ts/modelos/telefone').default
  const tel = new Telefone(ddd, numero)
  titular.Telefones.push(tel)
  res.status(201).json({ msg: 'telefone adicionado' })
})

// Documentos: only RG for now (mirrors CadastroRg)
app.post('/clientes/:index/documentos/rg', (req: Request, res: Response) => {
  const idx = Number(req.params.index)
  const titular = armazem.Clientes[idx]
  if (!titular) return res.status(404).json({ error: 'titular not found' })
  const { numero, dataExpedicao } = req.body
  const Documento = require('../../src/ts/modelos/documento').default
  const { TipoDocumento } = require('../../src/ts/enumeracoes/TipoDocumento')
  const doc = new Documento(numero, TipoDocumento.RG, new Date(dataExpedicao))
  titular.Documentos.push(doc)
  res.status(201).json({ msg: 'rg adicionado' })
})

// Search: buscarHospedePorAcomodacao (given acomodacao index -> list clientes in that acomodacao)
app.get('/buscar/hospedePorAcomodacao/:index', (req: Request, res: Response) => {
  const idx = Number(req.params.index)
  const hospedagens = armazem.Hospedagens.filter((h: any) => h.Acomodacao && h.Acomodacao === armazem.Acomodacoes[idx])
  const clientes = hospedagens.map((h: any) => ({ nome: h.Cliente.Nome }))
  res.json(clientes)
})

// Search: buscarAcomodacaoPorHospede (given cliente index -> list acomodacoes booked by that cliente)
app.get('/buscar/acomodacaoPorHospede/:index', (req: Request, res: Response) => {
  const idx = Number(req.params.index)
  const hospedagens = armazem.Hospedagens.filter((h: any) => h.Cliente && h.Cliente === armazem.Clientes[idx])
  const acoms = hospedagens.map((h: any) => ({ nome: h.Acomodacao.NomeAcomadacao }))
  res.json(acoms)
})

// Root route with API info
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Atlantis adapter server',
    endpoints: ['/clientes (GET, POST)', '/clientes/:index/dependentes (POST)']
  })
})

app.listen(port, () => {
  console.log(`Atlantis adapter server listening on http://localhost:${port}`)
})
