import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Catalogos from './pages/Catalogos';
import Agendamento from './pages/Agendamento';
import Cadastro from './pages/Cadastro';
import Feedback from './pages/Feedback';

function AnimatedRoutes({ animation, setAnimation }) {
  const location = useLocation();

  const handleAnimationEnd = () => {
    setAnimation(''); // Remove a classe após a animação
  };

  return (
    <main className={`main-content ${animation}`} onAnimationEnd={handleAnimationEnd}>
      <Routes location={location}>
        <Route path="/" element={
          <>
            <h1>Bem-vindo ao Citizen Experience</h1>
            <p>Nós somos uma iniciativa que visa integrar diversos serviços públicos em um único espaço...</p>
          </>
        } />
        <Route path="/catalogos" element={<Catalogos />} />
        <Route path="/agendamentos" element={<Agendamento />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </main>
  );
}

function App() {
  const [animation, setAnimation] = useState('');

  return (
    <Router>
      <div className="container">
        <aside className="sidebar">
          <div className="logo">
            <img src="https://attachments.gupy.io/production/companies/72539/career/177588/images/2024-07-17_19-01_companyLogoUrl.png" alt="Shopping do Cidadão" />
          </div>
          <nav className="menu">
            <p>Descobrir</p>
            <ul>
              <li><Link to="/" onClick={() => setAnimation('slide-in-right')}>🏠<span> Home</span></Link></li>
              <li><Link to="/catalogos" onClick={() => setAnimation('slide-in-right')}>🛍<span> Catálogo de Serviços</span></Link></li>
              <li><Link to="/agendamentos" onClick={() => setAnimation('slide-in-right')}>📅<span> Agendamentos</span></Link></li>
              <li><Link to="/cadastro" onClick={() => setAnimation('slide-in-right')}>👤<span> Cadastro</span></Link></li>
              <li><Link to="/feedback" onClick={() => setAnimation('slide-in-right')}>💬<span> FeedBack e Suporte</span></Link></li>
            </ul>
          </nav>
          <div class="help">

          </div>
        </aside>


        {/* Passando animation como prop para AnimatedRoutes */}
        <AnimatedRoutes animation={animation} setAnimation={setAnimation} />
      </div>
    </Router>
  );
}

export default App;
