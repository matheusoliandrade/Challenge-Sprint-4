import React, { useState } from 'react';
import './Feedback.css'; // Estilos da página

const Feedback = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, mensagem }),
            });

            const dataResponse = await response.json();

            if (response.ok) {
                // Limpa os campos após cadastro bem-sucedido
                setNome('');
                setEmail('');
                setMensagem('');
                setErro('');
                setSucesso(dataResponse.message || "Agradecemos o seu feedback!");
            } else {
                setSucesso('');
                setErro(dataResponse.error || 'Erro ao enviar o feedback.');
            }
        } catch (error) {
            console.error('Erro ao enviar o feedbaack:', error);
            setSucesso('');
            setErro('Erro ao enviar o feedback.');
        }
    };

    return (
        <div className="feedback-container">
            <h1>Feedback e Suporte</h1>
            {erro && <p className="error-message">{erro}</p>}
            {sucesso && <p className="success-message">{sucesso}</p>}
            <form className="feedback-form" onSubmit={handleSubmit}>
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
                <div className="form-group">
                    <label htmlFor="mensagem">Mensagem:</label>
                    <textarea
                        id="mensagem"
                        name="mensagem"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        rows="5"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
        </div>
    );
};

export default Feedback;
