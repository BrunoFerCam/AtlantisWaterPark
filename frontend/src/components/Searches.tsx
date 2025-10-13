import React, { useEffect, useState } from 'react'

export default function Searches(){
  const [clientes, setClientes] = useState<any[]>([])
  const [acomodacoes, setAcomodacoes] = useState<any[]>([])
  const [res, setRes] = useState<any[]>([])
  const [selCliente, setSelCliente] = useState(0)
  const [selAcom, setSelAcom] = useState(0)

  useEffect(()=>{ fetch('http://localhost:3333/clientes').then(r=>r.json()).then(setClientes); fetch('http://localhost:3333/acomodacoes').then(r=>r.json()).then(setAcomodacoes) }, [])

  function buscarHospedePorAcomodacao(){
    fetch(`http://localhost:3333/buscar/hospedePorAcomodacao/${selAcom}`).then(r=>r.json()).then(setRes)
  }
  function buscarAcomodacaoPorHospede(){
    fetch(`http://localhost:3333/buscar/acomodacaoPorHospede/${selCliente}`).then(r=>r.json()).then(setRes)
  }

  return (
    <section>
      <h2>Buscas</h2>
      <div>
        <label>Acomodação<br/>
          <select onChange={e=>setSelAcom(Number(e.target.value))}>{acomodacoes.map((a,i)=> <option value={i} key={i}>{a.nomeAcomadacao}</option>)}</select>
        </label>
        <button onClick={buscarHospedePorAcomodacao}>Buscar hóspedes</button>
      </div>
      <div>
        <label>Cliente<br/>
          <select onChange={e=>setSelCliente(Number(e.target.value))}>{clientes.map((c,i)=> <option value={i} key={i}>{c.nome}</option>)}</select>
        </label>
        <button onClick={buscarAcomodacaoPorHospede}>Buscar acomodações</button>
      </div>
      <ul>
        {res.map((r,i)=> <li key={i}>{JSON.stringify(r)}</li>)}
      </ul>
    </section>
  )
}
