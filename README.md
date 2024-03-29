
<p align='center'><img width='400' src="./.github/logo.svg"/></p>

 <p align='center'>

<img src="https://img.shields.io/github/repo-size/Savio-Anjos/API-FindAFriend?color=1890FF">
<img src="https://img.shields.io/github/languages/count/Savio-Anjos/API-FindAFriend?color=1890FF">
<img src="https://img.shields.io/github/last-commit/Savio-Anjos/API-FindAFriend?color=1890FF">
</p>

## 🚀 Tecnologias

Esse projeto está utilizando as seguintes tecnologias:

- [Node](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Swagger](<https://swagger.io/>)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io//)

## 📜 Descrição

Esse projeto consiste em uma API para uma aplicação de adoção de animais,
nele foi utilizado padrões de arquitetura de software e foram desenvolvidos
testes unitários e E2E.

## ⚙️ Como funciona?

## RFs (Requisitos funcionais)

- [x] É possível cadastrar um pet
- [x] É possível listar todos os pets disponíveis para adoção em uma cidade
- [x] É possível filtrar pets por suas características
- [x] É possível visualizar detalhes de um pet para adoção
- [x] É possível deletar um pet
- [x] É possível se cadastrar
- [x] É possível realizar login
- [x] É possível realizar login com github
- [x] É possível se cadastrar como uma ORG
- [x] É possível realizar login como uma ORG

## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] Todos os filtros, além da cidade, são opcionais

## 🎲 Como usar o projeto?

### Clone esse repositório

```bash
git clone https://github.com/tilo1306/FindAFriend-API.git
```

### Navegue até o diretório do projeto

```bash
cd FindAFriend-API
```

### Execute atravez do docker

```bash
docker compose up -d
```

### Acessar ao swagger

```bash
http://localhost:3333/docs/static/index.html
```

<p align='center'><img width='100%' src="./.github/swagger.gif"/></p>
