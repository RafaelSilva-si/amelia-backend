# API Amélia - Documentação

> Status: Em desenvolvimento ⚙

## Visão Geral
Bem-vindo à documentação da API do Software Amélia. ...

## Funcionalidades do Software:

### Gerenciamento de Usuário (Em Desenvolvimento):
- [x] Cadastro de novos usuários com informações como nome, e-mail e senha e outros campos.
- [ ] Visualização de todos os usuários cadastrados no sistema com filtros em todos os campos.
- [ ] Detalhes de um usuário específico com base no seu email.
- [ ] Atualização das informações de um usuário existente.
- [ ] Remoção de um usuário específico.
- [ ] Envio de Email para confirmação de conta.
      
### Endpoints da aplicação SWAGGER
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
<br>
Todos endpoints consegue ver ao rodar o projeto e acessar a rota `/api-docs`

## Requisitos de Sistema
Para rodar a API local, certifique-se de ter as seguintes dependências instaladas:

* Node.js v18.
* Mongo

## Instalação com Docker
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Antes de Rodar, crie o arquivo `.env` com base no arquivo `.env.example`. Se tiver dúvidas, visite a step que fala sobre **Variáveis de ambiente (.ENV)**

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Em um terminal rode o comando `docker-compose up`
4. Acesse http://localhost:4000/.

## Instalação

Antes de Rodar, crie o arquivo `.env` com base no arquivo `.env.example`. Se tiver dúvidas, visite a step que fala sobre **Variáveis de ambiente (.ENV)**

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Instale as dependências com o comando: `npm install` ou `yarn`.
4. Inicie o aplicativo com o comando: `npm run dev` ou `yarn dev`.
5. Acesse http://localhost:4000

## Variáveis de ambiente (.ENV)

Nesse repositório temos o arquivo `.env.example`, que mostra todas credenciais que o sistema precisa para rodar o projeto. Você consegue essas credenciais com o lider do projeto, mas aqui vai definições básicas sobre cada

```
{
  - `MONGO_URL`: URL de conexão ao MongoDB.
  - Exemplo: `mongodb://mongo:27017/dev`

- `SERVER_PORT`: Porta em que o servidor estará ouvindo.
  - Exemplo: `3000`

- `MONGO_PORT`: Porta para a conexão com o MongoDB.
  - Exemplo: `27017`
}
```

### Tecnologias
| Tecnologia                    | Versão   |
|-------------------------------|----------|
| TypeScript                    | 5.3.3    |
| Winston                       | 3.11.0   |
| Winston-daily-rotate-file     | 4.7.1    |
| Express                       | 4.18.2   |
| Mongoose                      | 8.1.1    |
| Nodemailer                    | 6.9.9    |
| Swagger-jsdoc                 | 6.2.8    |
| Swagger-ui-express            | 5.0.0    |
| Bcrypt                        | 5.1.1    |
| Class-transformer             | 0.5.1    |
| Class-validator               | 0.14.1   |
| Cookie-parser                 | 1.4.6    |
| Cors                          | 2.8.5    |
| Dotenv                        | 16.4.1   |
| Envalid                       | 8.0.0    |
| Handlebars                    | 4.7.8    |
| Jsonwebtoken                  | 9.0.2    |
| Nodemon                       | 3.0.3    |
| Ts-node                       | 10.9.2   |
| App-root-path                 | 3.1.0    |
| @types/express                | 4.17.21  |
| @types/mongoose               | 5.11.97  |
| Eslint                        | 8.56.0   |
| @typescript-eslint/parser    | 6.20.0   |
| @typescript-eslint/eslint-plugin | 6.20.0   |
| Cross-env                     | 7.0.3    |
| Eslint-config-prettier        | 9.1.0    |
| Eslint-plugin-prettier        | 5.1.3    |
| Prettier                      | 3.2.5    |


## Regras do Projeto

O desenvolvimento deste projeto segue uma série de regras e diretrizes para garantir consistência, qualidade e colaboração eficaz. Abaixo estão algumas das principais regras a serem seguidas pelos membros da equipe:

1. **Padrões de Código:**
   - Utilize ESLint e Prettier para manter o código consistente e livre de erros.
   - Siga as configurações de ESLint e Prettier definidas no projeto para garantir consistência em todo o código.

2. **Estrutura e Arquitetura:**
   - Mantenha a estrutura e a arquitetura do projeto conforme definido na documentação e nos padrões estabelecidos pela equipe.
   - Evite fazer mudanças significativas na estrutura do projeto sem discussão e aprovação prévia.

3. **Registro de Logs:**
   - Registre logs para todas as ações e eventos importantes do sistema.
   - Utilize a biblioteca de registro fornecida no projeto e siga as práticas recomendadas para registro de logs.

4. **Convenções de Commits:**
   - Siga as convenções de commits do Git para manter um histórico de commits claro e informativo.
   - Utilize mensagens de commit significativas e descritivas, seguindo as diretrizes de estilo definidas pela equipe.

5. **Branches e Pull Requests:**
   - Crie uma branch separada para cada nova funcionalidade, correção de bug ou melhoria.
   - Após concluir o trabalho na branch, crie um Pull Request para revisão antes de mesclar as alterações na branch principal.
   - Certifique-se de que o Pull Request inclua informações detalhadas sobre as alterações realizadas e qualquer impacto potencial.

**Referência para Convenções de Commits:**
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

---
## Conclusão

...





