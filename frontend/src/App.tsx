import React, { useEffect, useState } from 'react'
import ClientList from './components/ClientList'
import ClientForm from './components/ClientForm'
import AcomodacaoList from './components/AcomodacaoList'
import HospedagemList from './components/HospedagemList'
import Searches from './components/Searches'

export default function App(){
	const [view, setView] = useState<'clients-list'|'clients-create'|'acomodacoes'|'hospedagens'|'searches'>('clients-list')

	return (
		<div className="app">
			<header>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div style={{ width: 56, height: 56, borderRadius: 10, background: 'linear-gradient(90deg,#fff7d6,#ffd07a)', boxShadow: '0 6px 18px rgba(255,120,80,0.12)' }} />
					<h1>Atlantis Water Park</h1>
				</div>
				<nav>
					<button onClick={() => setView('clients-list')}>Clientes</button>
					<button onClick={() => setView('clients-create')}>Criar Titular</button>
					<button onClick={() => setView('acomodacoes')}>Acomodações</button>
					<button onClick={() => setView('hospedagens')}>Hospedagens</button>
					<button onClick={() => setView('searches')}>Buscas</button>
				</nav>
			</header>

			{/* hero */}
			<div className="hero">
				<div className="hero-inner">
					<h2>Bem-vindo ao Atlantis Water Park</h2>
					<p className="muted">Gerencie clientes, dependentes, acomodações e hospedagens com rapidez.</p>
				</div>
			</div>

			{/* main content sits on a sand card */}
			<div className="content">
				<main>
					{view === 'clients-list' && <ClientList />}
					{view === 'clients-create' && <ClientForm onCreated={() => setView('clients-list')} />}
					{view === 'acomodacoes' && <AcomodacaoList />}
					{view === 'hospedagens' && <HospedagemList />}
					{view === 'searches' && <Searches />}
				</main>
			</div>
		</div>
	)
}
