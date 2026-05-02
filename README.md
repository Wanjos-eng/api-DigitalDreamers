<!-- PROJECT_METADATA
{
  "title": "API PDV — Digital Dreamers",
  "short_description": "API REST de um PDV (ponto de venda) desenvolvida em equipe com Node.js, Express e PostgreSQL, com autenticação JWT e gestão de usuários, produtos e pedidos.",
  "primary_stack": ["Node.js", "Express", "PostgreSQL", "JWT", "JavaScript"],
  "architecture": "REST API",
  "detail_description": "API REST de um sistema PDV (Ponto de Venda / Frente de Caixa) desenvolvida em equipe como projeto final do bootcamp Cubos Academy. Implementa autenticação JWT com middleware de proteção de rotas, CRUD completo de usuários com perfil, listagem de categorias pré-cadastradas, e arquitetura MVC com Express. Projeto colaborativo com organização em branches, code review e integração contínua."
}
-->

# API PDV — Digital Dreamers

API REST de um sistema PDV (Ponto de Venda / Frente de Caixa), desenvolvida em equipe como projeto final de bootcamp. Implementa autenticação JWT, gestão de usuários e catálogo de produtos.

> **Projeto de equipe** — desenvolvido em colaboração durante o bootcamp Cubos Academy (DDS-16).

## Endpoints

### Autenticação e Usuários
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/usuario` | Cadastrar novo usuário | ❌ |
| POST | `/login` | Autenticar e obter JWT | ❌ |
| PATCH | `/usuario/redefinir` | Redefinir senha | ❌ |
| GET | `/usuario/perfil` | Obter perfil do usuário | ✅ |
| PUT | `/usuario/perfil` | Atualizar perfil | ✅ |

### Catálogo
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/categorias` | Listar categorias | ❌ |

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Banco de Dados | PostgreSQL |
| Autenticação | JWT (jsonwebtoken) |
| Linguagem | JavaScript |

## Estrutura do Projeto

```
src/
├── controllers/
│   ├── usuario.js      # Cadastro, login, perfil
│   └── categorias.js   # Listagem de categorias
├── middlewares/
│   └── verificaLogin.js  # Guard JWT
├── rotas.js            # Definição de rotas
├── conexao.js          # Conexão com PostgreSQL
└── config.js           # Configurações
sql/                    # Scripts de criação do banco
```

## Como Rodar Localmente

### Pré-requisitos
- Node.js 14+
- PostgreSQL

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com DATABASE_URL e JWT_SECRET

# Executar migrações SQL
# (rodar os scripts em sql/ no seu PostgreSQL)

# Iniciar servidor
npm start
```
