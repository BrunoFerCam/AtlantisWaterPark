import React, { useState } from 'react'

type Props = { onCreated?: () => void }

export default function ClientForm({ onCreated }: Props){
  const [nome, setNome] = useState('')
  const [nomeSocial, setNomeSocial] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [cpf, setCpf] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    fetch('http://localhost:3333/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, nomeSocial, dataNascimento, cpf })
    })
    .then(r => {
      if (!r.ok) return r.json().then(body => { throw new Error(body && body.error ? body.error : 'failed') })
      return r.json()
    })
    .then(() => {
      setMessage('Criado com sucesso')
      setNome(''); setNomeSocial(''); setDataNascimento('')
      onCreated && onCreated()
    })
    .catch(() => setMessage('Erro ao criar'))
  }

  return (
    <section>
      <h2>Criar Titular</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome<br/><input value={nome} onChange={e=>setNome(e.target.value)} required/></label>
        <label>Nome Social<br/><input value={nomeSocial} onChange={e=>setNomeSocial(e.target.value)} /></label>
        <label>Data nascimento<br/><input type="date" value={dataNascimento} onChange={e=>setDataNascimento(e.target.value)} required/></label>
  <label>CPF (opcional)<br/><input value={cpf} onChange={e=>setCpf(e.target.value)} /></label>
        <button type="submit">Criar</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  )
}
// component implemented
