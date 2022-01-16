![alt text](images/image.jpg)

## HubLocal Challange
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) ![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
)

### Sobre

Olá, dev! Esse repositório faz parte de um desafio proposto pela HubLocal e a Rocketseat, onde o tema proposto pelo time é "Explique por que as empresas devem ter a acesso e serem clientes da HubLocal".

Em minha perspectiva (que também foi representada na minha API) foi a facilidade e a segurança no cadastro de empresas e usuários! Além disso, a disponibilidade da descoberta de instituições próximas do usuário!

### Techs
- Node.js;
- TypeScript;
- Git/Github;
- Express Framework;
- SQLite;
- TypeORM;
- Swagger;
- JWT (Json Web Token);
- Jest;

### Funcionalidades

#### Usuário
- Criação de perfis de usuários;
- Remoção de perfis de usuários (por administrador ou pelo próprio usuário);
- Adição de endereço para o usuário (apenas para usuários autenticados);
- Autenticação de usuário;
- Listagem de usuários (apenas para administrador);

#### Empresa
- Criação de uma empresa (apenas para usuários autenticados);
- Listagem de empresas aprovadas;
- Remoção de empresa (por administrador ou pelo usuário proprietário);
- Listagem de empresas sem aprovação (apenas para administrador);
- Aprovação de cadastro de empresa (apenas para administrador);
- Listagem de empresas aprovadas próximas ao endereço do usuário (apenas para usuários autenticados);
- Criação de categoria (apenas para administrador);
- Listagem de categorias;

### Como rodar o projeto

#### Requisitos:
- Docker;
- Docker Compose;

Para inicializar o projeto, realize um clone deste repositório:
```sh
git clone https://github.com/Seiixas/hublocal-challenge.git
```

Após isso, na raíz da pasta do projeto recém clonada, execute o comando:
```sh
docker-compose up -d
```

Execute os comandos para aplicar as migrations no banco de dados:
```sh
# NPM
npm run typeorm migration:run

# Yarn
yarn typeorm migration:run
```

Por fim, aplique a seed de criação de um usuário administrador:
```sh
# NPM
npm run seed:admin

# Yarn
yarn seed:admin
```

Para utilizar as funções de administrador, as credenciais cadastradas foram:
- Email: admin@hublocal.com
- Password: admin

Toda a documentação da aplicação está disponível por meio da rota GET `/api-docs`. Aqui, peço perdão por algumas faltas de informações (tal como onde é requerido um request.authentication) foi por ainda estar em um processo de aprendizado e conhecimento da ferramenta Swagger.

### Agradecimentos

Agradeço imensamente à Rocketseat pelo aprendizado para a criação dessa API e à HubLocal pela proposta de desafio onde aprendi bastante principalmente sobre pontos de lagitude e longitude, distância entre pontos, conversão de CEP para coordenadas e muitos outros. Sempre é bom sair da zona de conforto e #neverstoplearning.
