## Sobre o projeto

### Resumo
____

O projeto consiste em uma plataforma digital web para oferecer aos cidadãos uma experiência simplificada e eficiente na busca e agendamento de serviços disponíveis em sua comunidade com uma interface amigável e intuitiva e e um backend conectado a um banco de dados que conecta todas as funcionalidades do sistema.

### Funcionalidades
----

**Catálogo de Serviços:** Nesta seção, os cidadãos podem explorar um catálogo diversificado de serviços oferecidos no Shopping Cidadão. Os usuários têm a oportunidade de conhecer os diferentes serviços disponíveis, permitindo que escolham aqueles que melhor atendem às suas necessidades.

**Tela de Agendamento:** A funcionalidade de agendamento permite que os usuários reservem serviços de maneira rápida e eficiente, com um fluxo de trabalho simplificado, os cidadãos podem escolher serviços e horários que melhor se encaixam em sua rotina, garantindo comodidade e flexibilidade.

**Cadastro:** A tela de cadastro oferece um formulário fácil de usar, as informações são registradas no banco de dados, permitindo um histórico acessível e útil para futuras interações.

**Feedback e Suporte:** Compreendendo a importância da experiência do usuário, o projeto inclui uma seção dedicada ao feedback e suporte, os cidadãos podem compartilhar suas opiniões e sugestões sobre os serviços, contribuindo para a melhoria contínua da plataforma e do atendimento.

### Garantia de Qualidade
----

A qualidade e a confiabilidade da plataforma são asseguradas por meio da implementação de testes automatizados

**O que foi testado?**
- Se a plataforma é renderizada de maneira adequada, não deixando nenhum texto ou imagem de fora.
- Se as funcionalidades funcionam de maneira esperada, verificando se estão realizando suas tarefas e se estão trazendo um feedback adequado.
- Se o banco de dados está armazenando as informações de maneira adequada, se está realmente devolvendo uma resposta para a requisição.
- Se a plataforma é responsiva a todos os tipos de telas, garantindo um visual agradável a todos os aparelhos

Para rodar os testes automáticos, apenas rodar os comandos abaixo:

```bash
npm test
```

Obs: Existem testes específicos para a plataforma web, e testes específicos para o backend
### Dependências
---
 
Aqui abaixo tem uma lista dos pacotes e frameworks utilizados no projeto

**Node.js:** v20.12.2
**npm:** 10.5.0

```javascript
//Front End
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "dotenv": "^16.4.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
```

```javascript
//Back End
  "dependencies": {
    "body-parser": "^1.20.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "sqlite3": "^5.1.7"
  }
```

## Implementação
----
### Setup

Para baixar as dependências, é só executar os comandos abaixo 

```bash
# Na pasta root do backend
npm install

# Utilizar o mesmo comando acima na pasta root do frontend
# Caso ocorra algum erro, utilize o comando abaixo
npm install --force
```

Depois de baixar as dependências

```bash
# Preparando o frontend para deploy
npm build
```
### Rodando

Agora o programa está pronto para deploy, caso queira testar o programa só rodar os seguintes comandos

```bash
# na pasta root do frontend
 npm install -g serve
 serve -s build -l 4000

# na pasta root do backend
node server.js
```

### Equipe
----

⭐ 552476 – Otavio Lira Neves

⭐ 98846 – Victor Candile Monteiro Barbosa

⭐ 550149 – Matheus Oliveira de Andrade

⭐ 98852 – Gustavo Candile Monteiro Barbosa

⭐ 99079 – Vitor Blankenburg Soares Tavares
