import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; // Importando jest-dom
import Cadastro from '../pages/Cadastro'; // Supondo que esse é o seu componente

describe('Componente Cadastro', () => {
    beforeEach(() => {
        render(<Cadastro />);
    });

    test('deve renderizar o formulário corretamente', () => {
        // Verifica se todos os campos do formulário estão no documento
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        const campos_senha = screen.getAllByLabelText(/senha/i);
        expect(campos_senha[0] == "Senha:");
        expect(campos_senha[1] == "Confirmar Senha:");
    });

    test('deve permitir preencher o formulário', async () => {
        const nomeInput = screen.getByLabelText(/nome/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const campos_senha = screen.getAllByLabelText(/senha/i);
        const senhaInput = campos_senha[0]
        const confirmarSenhaInput = campos_senha[1]
        // Preenche os campos do formulário
        await userEvent.type(nomeInput, 'João Silva');
        await userEvent.type(emailInput, 'joao@example.com');
        await userEvent.type(senhaInput, '123');
        await userEvent.type(confirmarSenhaInput, '123');

        // Verifica se os campos foram preenchidos corretamente
        expect(nomeInput).toHaveValue('João Silva');
        expect(emailInput).toHaveValue('joao@example.com');
        expect(senhaInput).toHaveValue('123');
        expect(confirmarSenhaInput).toHaveValue('123');
    });

    test('deve exibir uma mensagem de sucesso após a submissão', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Cadastro realizado com sucesso' }),
            })
        );

        const button = screen.getByRole('button', { name: /cadastrar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/cadastro realizado com sucesso/i)).toBeInTheDocument();
    });

    test('deve exibir uma mensagem de erro após a submissão de senha e confirmar senha incorretos', async () => {

        const nomeInput = screen.getByLabelText(/nome/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const campos_senha = screen.getAllByLabelText(/senha/i);
        const senhaInput = campos_senha[0]
        const confirmarSenhaInput = campos_senha[1]

        await userEvent.type(nomeInput, 'João Silva');
        await userEvent.type(emailInput, 'joao@example.com');
        await userEvent.type(senhaInput, '123');
        await userEvent.type(confirmarSenhaInput, '321');

        const button = screen.getByRole('button', { name: /cadastrar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/as senhas não coincidem/i)).toBeInTheDocument();
    });

    test('deve exibir uma mensagem de erro após a submissão de email já cadastrado', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'E-mail já cadastrado.' }),
            })
        );

        const button = screen.getByRole('button', { name: /cadastrar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/e-mail já cadastrado/i)).toBeInTheDocument();
    });

    test('deve exibir uma mensagem de erro generica após a submissão com erro indefinido', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        const button = screen.getByRole('button', { name: /cadastrar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/erro ao realizar o cadastro/i)).toBeInTheDocument();
    });
});
