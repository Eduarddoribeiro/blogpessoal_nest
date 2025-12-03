# Blog Pessoal - NestJS (CRUD Parte 01)

## 📖 Descrição do Projeto

Este projeto consiste em uma aplicação **Blog Pessoal** desenvolvida com **NestJS** e **MySQL**, seguindo boas práticas de arquitetura modular.  
O objetivo desta primeira parte do projeto é implementar o **CRUD básico** para o recurso **Postagem**, incluindo:

- Configuração do banco de dados MySQL (`db_blogpessoal`)
- Criação da entidade `Postagem`
- Criação do módulo, serviço e controller para Postagem
- Implementação do método **GET** para listar todas as postagens
- Testes utilizando **Insomnia** e inserção de dados via MySQL Workbench

---

## 🛠️ Tecnologias Utilizadas

- **NestJS**  
- **TypeScript**  
- **TypeORM**  
- **MySQL**  
- **Insomnia** (para testes de API REST)  
- **VS Code** (IDE de desenvolvimento)


---

## ⚙️ Configuração do Banco de Dados

- Banco de dados criado: `db_blogpessoal`  
- Tabela principal: `tb_postagens`  
- Configuração da conexão no `AppModule`:

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db_blogpessoal',
  entities: [Postagem],
  synchronize: true,
})


