const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Cria um banco de dados SQLite em memória
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_NAME);

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS cadastro (id INTEGER PRIMARY KEY, nome TEXT, email TEXT UNIQUE, senha TEXT)");
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS agendamento (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, data DATE, hora TEXT)");
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, mensagem TEXT)");
});


app.use(express.json());
const cors = require('cors');
app.use(cors()); // Adicione esta linha


// Rota para criar agendamento
app.post('/agendamento', (req, res) => {
    const { nome, email, data, hora } = req.body;

    // Verifica se já existe um agendamento para a mesma data e hora
    const checkAppointmentQuery = `SELECT * FROM agendamento WHERE data = ? AND hora = ?`;
    db.get(checkAppointmentQuery, [data, hora], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // Se já existir, retorna um erro
            return res.status(400).json({ error: 'Agendamento já existente para esta data e hora.' });
        }

        // Se não existir, insere o novo agendamento
        const query = `INSERT INTO agendamento (nome, email, data, hora) VALUES (?, ?, ?, ?)`;
        db.run(query, [nome, email, data, hora], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ message: 'Agendamento realizado com sucesso', id: this.lastID });
            }
        });
    });
});

app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se o e-mail já existe
    const checkEmailQuery = `SELECT * FROM cadastro WHERE email = ?`;
    db.get(checkEmailQuery, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // Se o e-mail já existir, retorna um erro
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        // Se o e-mail não existir, insere o novo registro
        const query = `INSERT INTO cadastro (nome, email, senha) VALUES (?, ?, ?)`;
        db.run(query, [nome, email, senha], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ message: 'Cadastro realizado com sucesso', id: this.lastID, nome });
            }
        });
    });
});

app.post('/feedback', (req, res) => {
    const { nome, email, mensagem } = req.body;

    const query = `INSERT INTO feedback (nome, email, mensagem) VALUES (?, ?, ?)`;
    db.run(query, [nome, email, mensagem], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Agradecemos o seu feedback!', id: this.lastID, nome });
        }
    });
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
 });

module.exports = { app, server, db };