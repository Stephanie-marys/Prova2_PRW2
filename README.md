# CineLog — Catálogo de Filmes 🎬

Projeto React com CRUD completo para catálogo de filmes. Desenvolvido para a Avaliação 02.

## Tecnologias
- React 18
- React Router DOM v6
- Axios

## Como rodar

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

## Estrutura do projeto
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

## Rotas
| Rota | Página | Operação |
|------|--------|----------|
| `/` | Início | Listar filmes (READ all) |
| `/filme/:id` | Ler Filme | Ver detalhes (READ one) |
| `/criar` | Criar Filme | Adicionar (CREATE) |
| `/editar/:id` | Editar Filme | Atualizar (UPDATE) |
| `/apagar/:id` | Apagar Filme | Excluir (DELETE) |
