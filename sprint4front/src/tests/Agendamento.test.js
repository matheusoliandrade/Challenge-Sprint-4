import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; // Importando jest-dom
import Agendamento from '../pages/Agendamento'; // Supondo que esse é o seu componente

describe('Componente Agendamento', () => {
    beforeEach(() => {
        render(<Agendamento />);
    });

    test('deve renderizar o formulário corretamente', () => {
        // Verifica se todos os campos do formulário estão no documento
        expect(screen.getByLabelText(/data/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/hora/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    });

    test('deve permitir preencher o formulário', async () => {
        const nomeInput = screen.getByLabelText(/nome/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const dataInput = screen.getByLabelText(/data/i);
        const horaInput = screen.getByLabelText(/hora/i); // Sem a barra extra

        // Preenche os campos do formulário
        await userEvent.type(nomeInput, 'João Silva');
        await userEvent.type(emailInput, 'joao@example.com');
        await userEvent.type(dataInput, '2024-12-31');
        await userEvent.type(horaInput, '10:00');

        // Verifica se os campos foram preenchidos corretamente
        expect(nomeInput).toHaveValue('João Silva');
        expect(emailInput).toHaveValue('joao@example.com');
        expect(dataInput).toHaveValue('2024-12-31');
        expect(horaInput).toHaveValue('10:00');
    });

    test('deve exibir uma mensagem de sucesso após a submissão', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Agendamento realizado com sucesso' }),
            })
        );

        const button = screen.getByRole('button', { name: /agendar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/agendamento realizado com sucesso/i)).toBeInTheDocument();
    });

    test('deve exibir uma mensagem de erro após a submissão de agendamento já existente', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ error: 'Agendamento já existente para esta data e hora.' }),
            })
        );

        const button = screen.getByRole('button', { name: /agendar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/agendamento já existente para esta data e hora/i)).toBeInTheDocument();
    });

    test('deve exibir uma mensagem de erro generica após a submissão com erro indefinido', async () => {
        // Simulação de uma função de envio de dados
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        const button = screen.getByRole('button', { name: /agendar/i });
        await userEvent.click(button);

        // Verifica se a mensagem de sucesso aparece
        expect(await screen.findByText(/erro ao realizar o agendamento/i)).toBeInTheDocument();
    });
});
