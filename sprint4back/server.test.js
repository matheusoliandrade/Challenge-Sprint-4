const request = require('supertest');
const { app, db, server } = require('./server'); 

describe('Criação do banco e das tabelas', () => {
    it('deve criar a tabela cadastro', async () => {
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='cadastro'", (err, row) => {
            expect(err).toBeNull();
            expect(row).not.toBeUndefined();
            expect(row.name).toBe('cadastro');
        });
    });
        it('deve criar a tabela agendamento', (done) => {
            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='agendamento'", (err, row) => {
                expect(err).toBeNull();
                expect(row).not.toBeUndefined();
                expect(row.name).toBe('agendamento');
                done();
            });
        });
    
        it('deve criar a tabela feedback', (done) => {
            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='feedback'", (err, row) => {
                expect(err).toBeNull();
                expect(row).not.toBeUndefined();
                expect(row.name).toBe('feedback');
                done();
        });
    });
});

describe('POST /agendamento', () => {
    it('deve criar um novo agendamento e retornar mensagem de sucesso', async () => {
        const res = await request(app)
            .post('/agendamento')
            .send({
                nome: 'João',
                email: 'joao@example.com',
                data: '2024-11-01',
                hora: '10:00'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Agendamento realizado com sucesso');
    });

    it('deve retornar erro para agendamento duplicado na mesma data e hora', async () => {
        await request(app).post('/agendamento').send({
            nome: 'João',
            email: 'joao@example.com',
            data: '2024-11-01',
            hora: '10:00'
        });

        const res = await request(app)
            .post('/agendamento')
            .send({
                nome: 'Maria',
                email: 'maria@example.com',
                data: '2024-11-01',
                hora: '10:00'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Agendamento já existente para esta data e hora.');
    });
});

// Testes para rota de cadastro
describe('POST /cadastro', () => {
    it('deve realizar cadastro de usuário novo', async () => {
        const res = await request(app)
            .post('/cadastro')
            .send({
                nome: 'Alice',
                email: 'alice@example.com',
                senha: 'senha123'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Cadastro realizado com sucesso');
    });

    it('deve retornar erro para email já cadastrado', async () => {
        await request(app).post('/cadastro').send({
            nome: 'Alice',
            email: 'alice@example.com',
            senha: 'senha123'
        });

        const res = await request(app)
            .post('/cadastro')
            .send({
                nome: 'Alice',
                email: 'alice@example.com',
                senha: 'senha1234'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('E-mail já cadastrado.');
    });
});

// Testes para rota de feedback
describe('POST /feedback', () => {
    it('deve criar um novo feedback', async () => {
        const res = await request(app)
            .post('/feedback')
            .send({
                nome: 'Carlos',
                email: 'carlos@example.com',
                mensagem: 'Gostei muito do serviço!'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Agradecemos o seu feedback!');
    });
});

// Fecha o banco de dados e o servidor após todos os testes
afterAll((done) => {
    server.close(() => {
        console.log('Servidor encerrado após os testes.');
    });
    db.close(() => {
        console.log('Banco de dados SQLite encerrado após os testes.');
        done();
    });
});
