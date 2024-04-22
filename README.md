# Projeto SIM Facilita - Backend 🚀

## 1. Introdução
O Projeto SIM Facilita - Backend é uma aplicação desenvolvida como resposta ao desafio proposto pela SIM Facilita, com o objetivo de criar uma plataforma de rede social. O backend oferece funcionalidades essenciais, como cadastro de usuários, autenticação, criação de posts, comentários, seguir/deixar de seguir usuários, atualização de informações de perfil e exclusão de conta.

## 2. Tecnologias Utilizadas
O projeto foi desenvolvido utilizando as seguintes tecnologias:
- Node.js
- Typescript
- PrismaORM
- Postgres
- Express
- Cors
- Express-async-errors
- Http-status
- Joi
- Dotenv

## 3. Como Executar 🛠️
Para executar o projeto localmente, siga os passos abaixo:
1. Clone este repositório.
2. Instale as dependências utilizando o comando `npm install`.
3. Crie os arquivos `.env` e `.env.test` na raiz do projeto, utilizando `.env.example` como referência e configurando o PostgreSQL.
4. Execute os scripts para executar as migrações de banco de dados:
   - `npm run dev:migration:run`
   - `npm run test:migration:run`
   - `npm run dev:migration:generate`
   - `npm run test:migration:generate`
5. Por fim, inicie o servidor local utilizando o comando `npm run dev`. Para executar os testes, utilize `npm run test`.
