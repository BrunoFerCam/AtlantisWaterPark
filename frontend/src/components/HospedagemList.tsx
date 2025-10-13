import React, { useEffect, useState } from 'react'

export default function HospedagemList(){
  const [hospedagens, setHospedagens] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [acomodacoes, setAcomodacoes] = useState<any[]>([])
  const [selectedCliente, setSelectedCliente] = useState<number>(0)
  const [selectedAcomodacao, setSelectedAcomodacao] = useState<number>(0)

  useEffect(()=>{ fetch('http://localhost:3333/hospedagens').then(r=>r.json()).then(setHospedagens); fetch('http://localhost:3333/clientes').then(r=>r.json()).then(setClientes); fetch('http://localhost:3333/acomodacoes').then(r=>r.json()).then(setAcomodacoes) }, [])

  function criar(){
    fetch('http://localhost:3333/hospedagens', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ clienteIndex: selectedCliente, acomodacaoIndex: selectedAcomodacao }) })
      .then(async r => {
        if (!r.ok) {
          const b = await r.json().catch(()=>({ error: 'erro' }))
          alert('Erro: ' + (b.error || 'falha'))
          return
        }
        return fetch('http://localhost:3333/hospedagens').then(r=>r.json()).then(setHospedagens)
      })
  }

  return (
    <section>
      <h2>Hospedagens</h2>
      <button onClick={()=>fetch('http://localhost:3333/hospedagens').then(r=>r.json()).then(setHospedagens)}>Atualizar</button>
      <div>
        <label>Cliente<br/>
          <select onChange={e=>setSelectedCliente(Number(e.target.value))}>
            {clientes.map((c,i)=> <option value={i} key={i}>{c.nome}</option>)}
          </select>
        </label>
        <label>Acomodação<br/>
          <select onChange={e=>setSelectedAcomodacao(Number(e.target.value))}>
            {acomodacoes.map((a,i)=> {
              const booked = hospedagens.some(h => h.acomodacao && h.acomodacao.nome === a.nomeAcomadacao)
              return <option value={i} key={i} disabled={booked}>{a.nomeAcomadacao}{booked ? ' (ocupada)' : ''}</option>
            })}
          </select>
        </label>
        <button onClick={criar}>Criar hospedagem</button>
      </div>
      <ul>
        {hospedagens.map(h=> <li key={h.id}>{h.cliente.nome} — {h.acomodacao.nome} — {h.checkin} <button onClick={()=>fetch(`http://localhost:3333/hospedagens/${h.id}`, { method: 'DELETE' }).then(()=>fetch('http://localhost:3333/hospedagens').then(r=>r.json()).then(setHospedagens))}>Excluir</button></li>)}
      </ul>
    </section>
  )
}
