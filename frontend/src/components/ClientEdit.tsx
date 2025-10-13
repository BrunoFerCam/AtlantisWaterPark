import React, { useEffect, useState } from 'react'

type Props = { index: number, onDone?: () => void }

export default function ClientEdit({ index, onDone }: Props){
  const [cliente, setCliente] = useState<any>(null)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(()=>{ fetch(`http://localhost:3333/clientes`).then(r=>r.json()).then(data=>setCliente(data[index])) }, [index])

  function updateEndereco(e: React.FormEvent){
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const body = Object.fromEntries(new FormData(form) as any)
    fetch(`http://localhost:3333/clientes/${index}/endereco`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
      .then(r => r.json()).then(()=>{ setMsg('Endereço atualizado'); onDone && onDone() })
  }

  function addTelefone(e: React.FormEvent){
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const body = Object.fromEntries(new FormData(form) as any)
    fetch(`http://localhost:3333/clientes/${index}/telefones`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
      .then(r => r.json()).then(()=>{ setMsg('Telefone adicionado'); onDone && onDone() })
  }

  function addRg(e: React.FormEvent){
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const body = Object.fromEntries(new FormData(form) as any)
    fetch(`http://localhost:3333/clientes/${index}/documentos/rg`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
      .then(r => r.json()).then(()=>{ setMsg('RG adicionado'); onDone && onDone() })
  }

  function deleteCliente(){
    if (!confirm('Confirma exclusão do titular e todos os dependentes?')) return
    fetch(`http://localhost:3333/clientes/${index}`, { method: 'DELETE' })
      .then(r => {
        if (!r.ok) throw new Error('Falha ao excluir')
        return r.json().catch(()=>({}))
      })
      .then(()=>{ setMsg('Cliente excluído'); onDone && onDone() })
      .catch(()=> setMsg('Erro ao excluir cliente'))
  }

  if (!cliente) return <div>Carregando cliente...</div>

  return (
    <div>
      <h3>Editar {cliente.nome}</h3>
      <div style={{ marginBottom: 8 }}>
        <strong>CPF:</strong> {cliente.cpf || '—'}<br/>
        <strong>Data de nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}<br/>
        <strong>Data de cadastro:</strong> {cliente.dataCadastro ? new Date(cliente.dataCadastro).toLocaleString() : '—'}
      </div>

      <form onSubmit={updateEndereco}>
        <h4>Endereço</h4>
        <label>Rua<br/><input name="rua" defaultValue={cliente.endereco?.rua || ''} required/></label>
        <label>Bairro<br/><input name="bairro" defaultValue={cliente.endereco?.bairro || ''} required/></label>
        <label>Cidade<br/><input name="cidade" defaultValue={cliente.endereco?.cidade || ''} required/></label>
        <label>Estado<br/><input name="estado" defaultValue={cliente.endereco?.estado || ''} required/></label>
        <label>Pais<br/><input name="pais" defaultValue={cliente.endereco?.pais || ''} required/></label>
        <label>Codigo Postal<br/><input name="codigoPostal" defaultValue={cliente.endereco?.codigoPostal || ''} required/></label>
        <button type="submit">Atualizar Endereço</button>
      </form>

      <form onSubmit={addTelefone}>
        <h4>Adicionar Telefone</h4>
        <label>DDD<br/><input name="ddd" required/></label>
        <label>Número<br/><input name="numero" required/></label>
        <button type="submit">Adicionar</button>
      </form>

      <form onSubmit={addRg}>
        <h4>Adicionar RG</h4>
        <label>Número<br/><input name="numero" required/></label>
        <label>Data Expedição<br/><input name="dataExpedicao" type="date" required/></label>
        <button type="submit">Adicionar RG</button>
      </form>

      <div style={{ marginTop: 12 }}>
        <h4>Telefones</h4>
        {(!cliente.telefones || cliente.telefones.length === 0) && <div>— nenhum —</div>}
        <ul>
          {cliente.telefones && cliente.telefones.map((t: any, i: number) => (
            <li key={i}>{t.ddd} {t.numero}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Documentos</h4>
        {(!cliente.documentos || cliente.documentos.length === 0) && <div>— nenhum —</div>}
        <ul>
          {cliente.documentos && cliente.documentos.map((d: any, i: number) => (
            <li key={i}>{d.tipo || 'RG'}: {d.numero} {d.dataExpedicao ? `(${new Date(d.dataExpedicao).toLocaleDateString()})` : ''}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Dependentes</h4>
        {(!cliente.dependentes || cliente.dependentes.length === 0) && <div>— nenhum —</div>}
        <ul>
          {cliente.dependentes && cliente.dependentes.map((d: any, i: number) => (
            <li key={d.cpf || i}>{d.nome} — CPF: {d.cpf || '—'}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 12 }}>
        <button style={{ background: '#c33', color: 'white' }} onClick={deleteCliente}>Excluir titular e dependentes</button>
      </div>

      {msg && <div>{msg}</div>}
    </div>
  )
}
