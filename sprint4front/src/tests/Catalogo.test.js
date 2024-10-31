import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; // Importando jest-dom
import Catalogos from '../pages/Catalogos'; // Supondo que esse é o seu componente

describe('Componente Catalogo', () => {
    beforeEach(() => {
        render(<Catalogos />);
    });

    test('deve renderizar os textos dos catalogos corretamente', () => {
        // Verifica se todos os campos do formulário estão no documento
        const catalogos = document.getElementsByClassName("catalog-item")
        expect(catalogos.length).toBe(6);
        expect(catalogos[0].textContent != null);
        expect(catalogos[1].textContent != null);
        expect(catalogos[2].textContent != null);
        expect(catalogos[3].textContent != null);
        expect(catalogos[4].textContent != null);
        expect(catalogos[5].textContent != null);
    });

    test('deve renderizar as imagens dos catalogos corretamente', () => {
        // Verifica se todos os campos do formulário estão no documento
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(6);
        expect(images[0]).toHaveAttribute('src');
        expect(images[1]).toHaveAttribute('src');
        expect(images[2]).toHaveAttribute('src');
        expect(images[3]).toHaveAttribute('src');
        expect(images[4]).toHaveAttribute('src');
        expect(images[5]).toHaveAttribute('src');
        
    });

});
