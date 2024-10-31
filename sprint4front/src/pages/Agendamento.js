import React, { useState } from 'react';
import './Agendamento.css'; // Estilos da página

const Agendamento = () => {
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/agendamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, data, hora }),
            });

            const dataResponse = await response.json();

            if (response.ok) {
                
                setNome('');
                setHora('');
                setData('');
                setNome('');
                setEmail('');
                setErro('');
                setSucesso(dataResponse.message || 'Agendamento realizado com sucesso');
            } else {
                setSucesso('')
                setErro(dataResponse.error || 'Erro ao realizar o agendamento.');
            }
        } catch (error) {
            console.log('Erro ao enviar o agendamento:', error);
            setSucesso('');
            setErro('Erro ao realizar o agendamento.');
        }
    };

    return (
        <div className="agendamento-container">
            <h1>Agendamento</h1>
            {erro && <p className="error-message">{erro}</p>}
            {sucesso && <p className="success-message">{sucesso}</p>}
            <form className="appointment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="data">Data:</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hora">Hora:</label>
                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Agendar</button>
            </form>
        </div>
    );
};

export default Agendamento;
