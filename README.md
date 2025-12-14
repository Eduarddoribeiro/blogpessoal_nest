# Blog Pessoal API

API REST para um blog pessoal desenvolvida com **NestJS**, **TypeORM** e **MySQL**.

## 📋 Funcionalidades

- **Postagens** - CRUD completo de postagens
- **Temas** - Categorização de postagens por tema
- **Usuários** - Gerenciamento de usuários com autenticação
- **Relacionamentos** - Postagens vinculadas a temas e usuários
- **Autenticação JWT** - Login seguro com tokens JWT

## 🔐 Autenticação

O projeto implementa autenticação com **JWT (JSON Web Token)** usando **Passport.js**.

### Fluxo de Autenticação

```
1. Cliente envia POST /usuarios/logar com {usuario, senha}
2. LocalAuthGuard valida credenciais via LocalStrategy
3. AuthService verifica usuário e compara senha (bcrypt)
4. Se válido, gera token JWT com expiração de 1 hora
5. Cliente usa token no header: Authorization: Bearer <token>
6. JwtAuthGuard protege rotas que exigem autenticação
```

### Componentes

| Componente       | Descrição                        |
| ---------------- | -------------------------------- |
| `LocalStrategy`  | Valida usuário/senha no login    |
| `JwtStrategy`    | Valida token JWT nas requisições |
| `LocalAuthGuard` | Guard para rota de login         |
| `JwtAuthGuard`   | Guard para rotas protegidas      |
| `Bcrypt`         | Hash e comparação de senhas      |

### Exemplo de Login

```bash
# Request
curl -X POST http://localhost:4000/usuarios/logar \
  -H "Content-Type: application/json" \
  -d '{"usuario": "email@email.com", "senha": "senha123"}'

# Response
{
  "id": 1,
  "nome": "Nome do Usuário",
  "usuario": "email@email.com",
  "senha": "",
  "foto": "https://...",
  "token": "Bearer eyJhbGciOiJIUzI1NiIs..."
}
```

## 🏗️ Arquitetura

```
src/
├── auth/           # Módulo de autenticação
├── postagem/       # Módulo de postagens
├── tema/           # Módulo de temas
├── usuario/        # Módulo de usuários
├── app.module.ts   # Módulo principal
└── main.ts         # Ponto de entrada
```

## 🔧 Pré-requisitos (Windows)

### Node.js

Baixe e instale o [Node.js LTS](https://nodejs.org/) (versão 18 ou superior).

### MySQL

1. Baixe o [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
2. Durante a instalação, defina a senha do root como `mysql`
3. Crie o banco de dados:

```sql
CREATE DATABASE db_blogpessoal;
```

## 🚀 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd nestjs-generation

# Instale as dependências
npm install
```

## ▶️ Executando

```bash
# Desenvolvimento (com hot-reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:4000`.

## 📦 Dependências do Projeto

| Pacote            | Versão  | Descrição                  |
| ----------------- | ------- | -------------------------- |
| @nestjs/core      | ^11.0.1 | Framework NestJS           |
| @nestjs/typeorm   | ^11.0.0 | Integração TypeORM         |
| @nestjs/passport  | ^11.0.5 | Integração Passport        |
| @nestjs/jwt       | ^11.0.2 | Suporte JWT                |
| passport          | ^0.7.0  | Middleware de autenticação |
| passport-jwt      | ^4.0.1  | Estratégia JWT             |
| passport-local    | ^1.0.0  | Estratégia Local           |
| typeorm           | ^0.3.27 | ORM para banco de dados    |
| mysql2            | ^3.15.3 | Driver MySQL               |
| bcrypt            | ^6.0.0  | Hash de senhas             |
| class-validator   | ^0.14.3 | Validação de DTOs          |
| class-transformer | ^0.5.1  | Transformação de objetos   |

## 🗄️ Modelo de Dados

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ tb_usuarios │     │tb_postagens │     │   tb_temas  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │──┐  │ id          │  ┌──│ id          │
│ nome        │  │  │ titulo      │  │  │ descricao   │
│ usuario     │  └─>│ texto       │<─┘  └─────────────┘
│ senha       │     │ data        │
│ foto        │     │ tema_id     │
└─────────────┘     │ usuario_id  │
                    └─────────────┘
```

## 📝 Endpoints

### Postagens

- `GET /postagens` - Listar todas
- `GET /postagens/:id` - Buscar por ID
- `POST /postagens` - Criar
- `PUT /postagens` - Atualizar
- `DELETE /postagens/:id` - Deletar

### Temas

- `GET /temas` - Listar todos
- `GET /temas/:id` - Buscar por ID
- `POST /temas` - Criar
- `PUT /temas` - Atualizar
- `DELETE /temas/:id` - Deletar

### Usuários

- `GET /usuarios` - Listar todos
- `GET /usuarios/:id` - Buscar por ID
- `POST /usuarios/cadastrar` - Cadastrar
- `PUT /usuarios/atualizar` - Atualizar

### Autenticação

- `POST /usuarios/logar` - Login (retorna token JWT)

## 📄 Licença

Este projeto está sob a licença UNLICENSED.
