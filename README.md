# API para Posts e Comentários

## Descrição

Este é um projeto de uma API RESTful desenvolvida em TypeScript/Express utilizando do Docker Compose para comunicação da API com o banco MongoDB. 
Ela fornece endpoints para criação, alteração, listagem e deleção de posts.
Bem como a criação e deleção de comentários em um post.

## Instalação & Configuração

1. Clone este repositório em sua máquina local usando o comando:
```bash
   git clone https://github.com/caiosdeo/posts-comments-api.git
```

2. Navegue até o diretório do projeto:
```bash
   cd posts-comments-api
```
3. Antes de rodar a API, certifique-se de configurar as variáveis de ambiente necessárias. 
Você pode encontrar as variáveis de ambiente necessárias no email enviado, necessitando apenas preenchê-las de acordo com o `.env.example` presente no repositório.
O arquivo .env deve ser criado na raiz do projeto.

4. Para finalizar a instalação basta usar o Docker Compose:
```bash
    docker compose up -d
```

## Testando a API

Utilizando do Postman, você pode utilizar a seguinte coleção para testar os endpoints da API:

- [Coleção do Postman](https://www.postman.com/caiosdeo/workspace/posts-comments-api/collection/34022638-4a8bdc28-6cc9-4e38-8721-f907fbe3711f?action=share&source=copy-link&creator=34022638)

## Documentação da API

A URL base para todos os endpoints é: `http://localhost:8080`.

### Posts

#### Listar posts

Endpoint para listar todos os usuários cadastrados.

- **URL:** `/posts`
- **Método:** GET
- **Parâmetros de Consulta:**
  - `pageNumber` (opcional): Número da página para paginação (padrão: 1)
  - `pageSize` (opcional): Limite de resultados por página (padrão: 10)

#### Criar post

Endpoint para criar um novo post.
- **URL:** `/posts`
- **Método:** POST
- **Corpo da requisição:**
```json
{
  "title": "Titulo do post",
  "author": "Autor do post",
  "content": "Conteúdo do post"
}
```

#### Detalhes de um post

Endpoint para obter os detalhes de um post específico.

- **URL:** `/posts/:postId`
- **Método:** GET
- **Parâmetros de rota:** `id` do post

#### Atualizar Usuário

Endpoint para atualizar os dados de um post existente.

- **URL**: `/posts/:postId`
- **Método:** PATCH
- **Parâmetros de rota:**
  - `id`: ID do usuário
- **Corpo da Requisição:**
```json
{
  "title": "Titulo do post (opcional)",
  "author": "Autor do post (opcional)",
  "content": "Conteúdo do post (opcional)"
}
```

#### Deletar um post

Endpoint para deletar um post específico.

- **URL:** `/posts/:postId`
- **Método:** DELETE
- **Parâmetros de rota:** `id` do post

### Comments

#### Listar posts

Endpoint para listar todos os usuários cadastrados.

- **URL:** `/posts`
- **Método:** GET
- **Parâmetros de Consulta:**
  - `pageNumber` (opcional): Número da página para paginação (padrão: 1)
  - `pageSize` (opcional): Limite de resultados por página (padrão: 10)

#### Criar post

Endpoint para criar um novo post.
- **URL:** `/posts`
- **Método:** POST
- **Corpo da requisição:**
```json
{
  "title": "Titulo do post",
  "author": "Autor do post",
  "content": "Conteúdo do post"
}
```

#### Deletar um post

Endpoint para deletar um post específico.

- **URL:** `/posts/:postId`
- **Método:** DELETE
- **Parâmetros de rota:** `id` do post