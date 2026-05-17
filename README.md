# 🎬 CineLog — Catálogo de Filmes

Aplicação web desenvolvida em React para gerenciamento de um catálogo de filmes, com operações completas de **CRUD** (Create, Read, Update, Delete).

Projeto desenvolvido como **Avaliação 02** da disciplina de Desenvolvimento Web — IFSP Campus São Carlos.

---

## 🚀 Tecnologias utilizadas

- [React 18](https://reactjs.org/)
- [React Router DOM v6](https://reactrouter.com/) — navegação entre páginas
- [Axios](https://axios-http.com/) — requisições HTTP
- [MockAPI](https://mockapi.io/) — servidor de API simulado

---

## 📋 Funcionalidades

| Página | Rota | Operação |
|---|---|---|
| Início | `/` | Listar todos os filmes |
| Ver Filme | `/filme/:id` | Visualizar detalhes de um filme |
| Novo Filme | `/criar` | Cadastrar um filme |
| Editar Filme | `/editar/:id` | Atualizar dados de um filme |
| Apagar Filme | `/apagar/:id` | Excluir um filme |

### Dados armazenados por filme:
- `id` — gerado automaticamente pela API
- `nome` — String
- `genero` — String
- `ano` — String

---

## ⚙️ Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar a API (MockAPI)

#### Criar projeto no MockAPI:
1. Acesse [mockapi.io](https://mockapi.io) e crie uma conta
2. Crie um novo projeto
3. Crie um recurso chamado `filmes` com os campos:
   - `nome` (String)
   - `genero` (String)
   - `ano` (String)
4. Copie a URL gerada (ex: `https://XXXXXXXX.mockapi.io/filmes`)

#### Configurar URL no projeto:
**Opção A** — Variável de ambiente (recomendado):
```bash
cp .env.example .env
# Edite o .env e cole sua URL
```

**Opção B** — Direto no código:
Edite `src/services/api.js` e substitua a URL na constante `BASE_URL`.

### 3. Rodar o projeto
```bash
npm start
```

---

## 🗂️ Estrutura do projeto

```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Inicio.jsx       ← Lista todos os filmes
│   ├── LerFilme.jsx     ← Detalhes de um filme
│   ├── CriarFilme.jsx   ← Formulário de criação
│   ├── EditarFilme.jsx  ← Formulário de edição
│   └── ApagarFilme.jsx  ← Página de confirmação de exclusão
├── services/
│   └── api.js           ← Configuração do Axios + chamadas à API
├── App.jsx              ← Rotas (React Router Dom)
└── index.css            ← Estilos globais
```

---

## 🔗 Rotas

| Rota | Página | Operação |
|------|--------|----------|
| `/` | Início | Listar filmes (READ all) |
| `/filme/:id` | Ler Filme | Ver detalhes (READ one) |
| `/criar` | Criar Filme | Adicionar (CREATE) |
| `/editar/:id` | Editar Filme | Atualizar (UPDATE) |
| `/apagar/:id` | Apagar Filme | Excluir (DELETE) |

---

## 👨‍💻 Autor

Desenvolvido por **Stephanie Marys**  
IFSP — Instituto Federal de Educação, Ciência e Tecnologia de São Paulo  
Campus São Carlos
