import fs from 'fs'
import path from 'path'
import Database from 'better-sqlite3'

const DATA_DIR = path.resolve(__dirname, '..', 'data')
const DB_PATH = path.join(DATA_DIR, 'atlantis.db')

function ensureDataDir(){
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function init() {
  ensureDataDir()
  const db = new Database(DB_PATH)

  // clients table: titulares have titularCpf IS NULL, dependentes have titularCpf set
  db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      nomeSocial TEXT,
      dataNascimento TEXT,
      dataCadastro TEXT,
      cpf TEXT UNIQUE,
      endereco TEXT,
      telefones TEXT,
      documentos TEXT,
      titularCpf TEXT
    );
  `)

  // acomodações and hospedagens can be added later; keep schema minimal for now

  return db
}

function rowToCliente(row: any) {
  if (!row) return null
  return {
    id: row.id,
    nome: row.nome,
    nomeSocial: row.nomeSocial,
    dataNascimento: row.dataNascimento ? new Date(row.dataNascimento) : null,
    dataCadastro: row.dataCadastro ? new Date(row.dataCadastro) : null,
    cpf: row.cpf,
    endereco: row.endereco ? JSON.parse(row.endereco) : null,
    telefones: row.telefones ? JSON.parse(row.telefones) : [],
    documentos: row.documentos ? JSON.parse(row.documentos) : [],
    titularCpf: row.titularCpf
  }
}

export default function createDbApi(){
  const db = init()

  const getTitulares = () => {
    const stmt = db.prepare('SELECT * FROM clientes WHERE titularCpf IS NULL ORDER BY id')
    return stmt.all().map(rowToCliente)
  }

  const getDependentesOf = (titularCpf: string) => {
    const stmt = db.prepare('SELECT * FROM clientes WHERE titularCpf = ? ORDER BY id')
    return stmt.all(titularCpf).map(rowToCliente)
  }

  const cpfExists = (cpf: string) => {
    if (!cpf) return false
    const stmt = db.prepare('SELECT COUNT(1) as c FROM clientes WHERE cpf = ?')
    const row = stmt.get(cpf)
    return row && row.c > 0
  }

  const insertCliente = (plain: any, titularCpf: string | null = null) => {
    const now = new Date().toISOString()
    const stmt = db.prepare(`INSERT INTO clientes (nome, nomeSocial, dataNascimento, dataCadastro, cpf, endereco, telefones, documentos, titularCpf)
      VALUES (@nome,@nomeSocial,@dataNascimento,@dataCadastro,@cpf,@endereco,@telefones,@documentos,@titularCpf)`)

    const info = stmt.run({
      nome: plain.nome,
      nomeSocial: plain.nomeSocial || null,
      dataNascimento: plain.dataNascimento ? new Date(plain.dataNascimento).toISOString() : null,
      dataCadastro: now,
      cpf: plain.cpf || null,
      endereco: plain.endereco ? JSON.stringify(plain.endereco) : null,
      telefones: plain.telefones ? JSON.stringify(plain.telefones) : null,
      documentos: plain.documentos ? JSON.stringify(plain.documentos) : null,
      titularCpf: titularCpf
    })

    const getStmt = db.prepare('SELECT * FROM clientes WHERE id = ?')
    return rowToCliente(getStmt.get(info.lastInsertRowid))
  }

  const removeClienteByCpf = (cpf: string) => {
    const delDeps = db.prepare('DELETE FROM clientes WHERE titularCpf = ?')
    const delTit = db.prepare('DELETE FROM clientes WHERE cpf = ?')
    const t = db.transaction((cpfArg: string) => {
      delDeps.run(cpfArg)
      const info = delTit.run(cpfArg)
      return info.changes
    })
    return t(cpf)
  }

  const removeDependente = (titularCpf: string, cpf: string) => {
    const stmt = db.prepare('DELETE FROM clientes WHERE cpf = ? AND titularCpf = ?')
    const info = stmt.run(cpf, titularCpf)
    return info.changes > 0
  }

  return {
    db,
    getTitulares,
    getDependentesOf,
    insertCliente,
    insertDependente: (titularCpf: string, plain: any) => insertCliente(plain, titularCpf),
    removeClienteByCpf,
    removeDependente,
    cpfExists
  }
}
