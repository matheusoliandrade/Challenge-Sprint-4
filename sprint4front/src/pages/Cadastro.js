import React, { useState } from 'react';
import './Cadastro.css'; // Estilos da página


const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        // Enviando dados para o servidor
        try {
            const response = await fetch('http://localhost:5000/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha }),
            });

            const dataResponse = await response.json();

            if (response.ok) {
                // Limpa os campos após cadastro bem-sucedido
                setNome('');
                setEmail('');
                setSenha('');
                setConfirmarSenha('');
                setErro('');
                setSucesso(dataResponse.message || 'Cadastro realizado com sucesso')
            } else {
                setSucesso('')
                setErro(dataResponse.error || 'Erro ao realizar o cadastro.');
            }
        } catch (error) {
            console.error('Erro ao enviar o cadastro:', error);
            setSucesso('');
            setErro('Erro ao realizar o cadastro.');
        }
    };

    return (
        <div className="cadastro-container">
            <h1>Cadastro</h1>
            {erro && <p className="error-message">{erro}</p>}
            {sucesso && <p className="success-message">{sucesso}</p>}
            <form className="registration-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;
