import React, { useEffect, useState } from 'react'
import DependentForm from './DependentForm'
import ClientEdit from './ClientEdit'

type Dependente = { nome: string; nomeSocial?: string; cpf?: string }
type Cliente = {
  nome: string
  nomeSocial?: string
  dataNascimento: string
  endereco?: any
  telefones?: any[]
  dependentes?: Dependente[]
  cpf?: string
}

export default function ClientList(){
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)
  const [creatingFor, setCreatingFor] = useState<number | null>(null)
  const [editingFor, setEditingFor] = useState<number | null>(null)

  useEffect(() => { fetchList() }, [])

  function fetchList(){
    setLoading(true)
    fetch('http://localhost:3333/clientes')
      .then(r => r.json())
      .then(data => setClientes(data))
      .catch(() => setClientes([]))
      .finally(() => setLoading(false))
  }

  return (
    <section>
      <h2>Clientes</h2>
      <button onClick={fetchList}>Atualizar</button>
      {loading && <p>Carregando...</p>}
      {!loading && clientes.length === 0 && <p>Nenhum cliente cadastrado.</p>}
      <ul>
        {clientes.map((c, i) => (
          <li key={i} className="client-card">
            <div className="avatar-sun" aria-hidden />
            <div className="client-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong style={{ fontSize: 16 }}>{c.nome}</strong>
                  <div className="muted">{c.nomeSocial || '—'} • {new Date(c.dataNascimento).toLocaleDateString()}</div>
                </div>
                <div className="client-actions">
                  <button onClick={() => setCreatingFor(i)} className="primary">Adicionar dependente</button>
                  <button onClick={async () => {
                    if (!confirm('Confirma exclusão do titular e todos os dependentes?')) return
                    try {
                      const r = await fetch(`http://localhost:3333/clientes/${i}`, { method: 'DELETE' })
                      if (!r.ok) {
                        const body = await r.json().catch(()=>({ error: 'Erro' }))
                        alert('Erro ao excluir: ' + (body.error || 'unknown'))
                        return
                      }
                      fetchList()
                    } catch (e) { alert('Erro de rede ao excluir') }
                  }}>Excluir</button>
                  <button onClick={() => setEditingFor(i)}>Editar</button>
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <strong>Dependentes:</strong>
                {(!c.dependentes || c.dependentes.length === 0) && <div className="muted">— nenhum —</div>}
                <ul>
                  {c.dependentes && c.dependentes.map(d => (
                    <li key={d.cpf || d.nome} style={{ marginTop: 6 }}>{d.nome} <span className="muted">(CPF: {d.cpf})</span> <button onClick={async () => {
                      if (!confirm(`Confirma exclusão do dependente ${d.nome} (CPF: ${d.cpf})?`)) return
                      try {
                        const r = await fetch(`http://localhost:3333/clientes/${i}/dependentes/${d.cpf}`, { method: 'DELETE' })
                        if (!r.ok) {
                          const body = await r.json().catch(()=>({ error: 'Erro' }))
                          alert('Erro ao excluir dependente: ' + (body.error || 'unknown'))
                          return
                        }
                        fetchList()
                      } catch (e) { alert('Erro de rede ao excluir dependente') }
                    }} style={{ marginLeft: 8 }}>Excluir</button></li>
                  ))}
                </ul>
              </div>

              {creatingFor === i && (
                <div style={{ marginTop: 12 }}>
                  <DependentForm titularIndex={i} onDone={() => { setCreatingFor(null); fetchList() }} />
                </div>
              )}
              {editingFor === i && (
                <div style={{ marginTop: 12 }}>
                  <ClientEdit index={i} onDone={() => { setEditingFor(null); fetchList() }} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
  // component neutralized
  // The duplicate export has been removed.
