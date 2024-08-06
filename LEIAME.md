**ATENÇÃO! Sempre que fizer o pull de alguma branch lembre de seguir todos os passos abaixo**

## Antes de iniciar e começar a programar

```javascript
//Para adicionar a pasta node_modules e suas dependencias
npm install
```
### Bibliotecas importantes para o a execução e funcionamento da api
```javascript
//Ate o momento essas são as bibliotecas necessarias para que a aplicação rode sem problemas
npm install express bcryptjs jsonwebtoken knex pg dotenv nodemailer
npm install -D nodemon
```

### Startar o banco de dados no beekeeper

<details>
<summary>copiar, colar e executar</summary>
<br>

**ATENÇÃO! Execute as linhas seguindo a ordem de cima para baixo.**

CREATE DATABASE pdv

CREATE TABLE usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
);

CREATE TABLE categorias (
    id serial primary key,
    descricao text not null
);

INSERT INTO categorias (descricao) values	
    ('Informatica'),
    ('Celulares'),
    ('Beleza e perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebe'),
    ('Games');

</details>

### Vá em .env e modifique para as mesmas informações de seu banco de dados local

```javascript
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=pdv
JWT_SECRET=seu_segredo_super_seguro
```

### Vá em .env e modifique para as mesmas informações do protocolo SMTP que vc cofigurou para testar o envio de emails

```javascript
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
//User e pass é para usar o que aparece no protocolo que vc configurou pelo https://mailtrap.io/ que foi o usado ou teste usando qualquer outro
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_do_email
MAIL_FROM=qualquerUm.teste@gmail.com
```