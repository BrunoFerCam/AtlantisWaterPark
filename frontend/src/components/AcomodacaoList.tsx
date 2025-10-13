import React, { useEffect, useState } from 'react'

export default function AcomodacaoList(){
  const [acomodacoes, setAcomodacoes] = useState<any[]>([])
  const [tipo, setTipo] = useState('solteiro-simples')
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(()=>{ fetchList() }, [])

  function fetchList(){ fetch('http://localhost:3333/acomodacoes').then(r=>r.json()).then(setAcomodacoes).catch(()=>setAcomodacoes([])) }

  async function criar(){
    setMsg(null)
    try {
      const res = await fetch('http://localhost:3333/acomodacoes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo }) })
      if (!res.ok) {
        const body = await res.json().catch(()=>({ error: 'erro' }))
        setMsg('Erro: ' + (body.error || 'não foi possível criar'))
        return
      }
      const created = await res.json()
      setMsg('Criado: ' + (created.nomeAcomadacao || 'acomodacao'))
      fetchList()
    } catch (e) { setMsg('Erro de rede') }
  }

  return (
    <section>
      <h2>Acomodações</h2>
      <div style={{ marginBottom: 8 }}>
        <button onClick={fetchList}>Atualizar</button>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Tipo: <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="solteiro-simples">Solteiro Simples</option>
          <option value="solteiro-mais">Solteiro +</option>
          <option value="casal-simples">Casal Simples</option>
          <option value="familia-simples">Família Simples</option>
          <option value="familia-mais">Família +</option>
          <option value="familia-super">Família Super</option>
        </select></label>
        <button style={{ marginLeft: 8 }} onClick={criar}>Criar acomodação</button>
        {msg && <div style={{ marginTop: 6 }}>{msg}</div>}
      </div>

      <ul>
        {acomodacoes.map((a,i)=> <li key={i}>{a.nomeAcomadacao} — solteiro:{a.camaSolteiro} casal:{a.camaCasal} suite:{a.suite} clim:{String(a.climatizacao)} garagem:{String(a.garagem)}</li>)}
      </ul>
    </section>
  )
}
