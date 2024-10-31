import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; // Importando jest-dom
import Feedback from '../pages/Feedback'; // Supondo que esse é o seu componente

describe('Componente Cadastro', () => {
    beforeEach(() => {
        render(<Feedback />);
    });

    test('deve renderizar o formulário corretamente', () => {
        // Verifica se todos os campos do formulário estão no documento
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    });

    test('deve permitir preencher o formulário', async () => {
        const nomeInput = screen.getByLabelText(/nome/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const mensagemInput = screen.getByLabelText(/mensagem/i);

        // Preenche os campos do formulário
        await userEvent.type(nomeInput, 'João Silva');
        await userEvent.type(emailInput, 'joao@example.com');
        await userEvent.type(mensagemInput, 'Muito bom o site!');

        // Verifica se os campos foram preenchidos corretamente
        expect(nomeInput).toHaveValue('João Silva');
        expect(emailInput).toHaveValue('joao@example.com');
        expect(mensagemInput).toHaveValue('Muito bom o site!');
    });

    test('deve exibir uma mensagem de sucesso após a submissão', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Agradecemos o seu feedback!' }),
            })
        );

        const button = screen.getByRole('button', { name: /enviar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/agradecemos o seu feedback/i)).toBeInTheDocument();
    });

    test('deve exibir uma mensagem de erro generica após a submissão com erro indefinido', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        const button = screen.getByRole('button', { name: /enviar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/erro ao enviar o feedback/i)).toBeInTheDocument();
    });
});
