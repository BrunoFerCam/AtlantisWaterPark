import React, { useState } from 'react'

type Props = { titularIndex: number, onDone?: () => void }

export default function DependentForm({ titularIndex, onDone }: Props){
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [clone, setClone] = useState(true)
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function fetchClientes(){
    try {
      const r = await fetch('http://localhost:3333/clientes')
      if (!r.ok) return []
      return await r.json()
    } catch { return [] }
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    setMsg(null)
    if (!cpf || cpf.trim().length === 0) { setMsg('CPF é obrigatório'); return }

    setBusy(true)
    try {
      const clientes = await fetchClientes()
      const exists = clientes.some((c: any) => c.cpf === cpf)
      if (exists) { setMsg('CPF já cadastrado (titular ou dependente).'); setBusy(false); return }

      const res = await fetch(`http://localhost:3333/clientes/${titularIndex}/dependentes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, dataNascimento: new Date().toISOString(), nomeSocial: '', cpf, clonarContato: clone })
      })

      if (!res.ok) {
        const body = await res.json().catch(()=>({ error: 'Erro' }))
        throw new Error(body && body.error ? body.error : 'Erro ao criar dependente')
      }

      setMsg('Dependente criado')
      onDone && onDone()
    } catch (err: any) {
      setMsg(err.message || 'Erro')
    } finally { setBusy(false) }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome<br/><input value={nome} onChange={e => setNome(e.target.value)} required/></label>
      </div>
      <div>
        <label>CPF<br/><input value={cpf} onChange={e => setCpf(e.target.value)} required/></label>
      </div>
      <div>
        <label><input type="checkbox" checked={clone} onChange={e => setClone(e.target.checked)} /> Clonar contato do titular</label>
      </div>
      <button type="submit" disabled={busy}>{busy ? 'Criando...' : 'Criar dependente'}</button>
      {msg && <div role="status" style={{ marginTop: 8 }}>{msg}</div>}
    </form>
  )
}

