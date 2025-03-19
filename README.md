# Bootcamp Squadra

Este projeto é parte do **Bootcamp Squadra** e tem como objetivo demonstrar a construção de uma aplicação web utilizando **React** no front-end e **Java com Spring Boot** no back-end. A experiência de desenvolvimento me permitiu aprimorar minhas habilidades em diversas tecnologias, proporcionando uma visão completa do processo de desenvolvimento de software.

## Descrição do Projeto

O projeto final do bootcamp Java da **Squadra Digital** foi uma experiência incrível. Desenvolvi uma **API REST** de cadastro de pessoas utilizando **Java com Spring Boot**, o que me permitiu aprimorar minhas habilidades práticas em uma aplicação real. Um dos diferenciais que implementei foi a **documentação detalhada com Swagger**, que facilitou o uso e a compreensão da API, além de destacar a organização e clareza do código.

Além disso, desenvolvi um **front-end em React**, utilizando **Material-UI** e **Bootstrap**, para integrar com o back-end. O front-end oferece uma interface moderna e responsiva, enquanto o back-end garante a persistência e manipulação de dados de forma eficiente e escalável.

Ao final, tanto o front-end quanto o back-end foram apresentados, proporcionando uma visão completa e funcional da aplicação, que pode ser utilizada para o cadastro e gerenciamento de pessoas. Este projeto me proporcionou uma visão mais aprofundada do processo de desenvolvimento de software, desde a criação da API até a construção da interface do usuário.

## Tecnologias Usadas

- **Frontend**:
  - **React**: Biblioteca JavaScript para construção de interfaces de usuário.
  - **Material UI**: Biblioteca de componentes React para interfaces modernas.
  - **Bootstrap**: Framework front-end para desenvolvimento de sites e aplicações responsivas.
  - **React Bootstrap**: Implementação de componentes Bootstrap no React.
  - **Notistack**: Para gerenciamento de notificações.
  - **Axios**: Para fazer requisições HTTP.

## Instalação

### Requisitos

- **Node.js** 14.x ou superior
- **npm** ou **yarn**
- **Java 21** ou superior
- **Maven** 3.x ou superior

### Passos para Instalar

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/bootcamp-squadra.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd bootcamp-squadra
    ```

3. Instale as dependências do front-end:
    ```bash
    npm install
    # ou, se você estiver usando o yarn
    yarn install
    ```

4. Navegue até o diretório do back-end e instale as dependências do Spring Boot:
    ```bash
    cd backend
    mvn clean install
    ```

5. Configure as credenciais do banco de dados no arquivo `src/main/resources/application.properties` (para o back-end).

6. Inicie o servidor de desenvolvimento para o front-end:
    ```bash
    npm start
    # ou, se você estiver usando o yarn
    yarn start
    ```

7. Execute o back-end:
    ```bash
    mvn spring-boot:run
    ```

   A aplicação estará rodando em `http://localhost:3000` para o front-end e `http://localhost:8080` para o back-end.

## Back-End

Você pode encontrar o código do **back-end** neste repositório: [backend-bootcamp-squadra](https://github.com/gildemardiniz/backend-bootcamp-squadra).

## Scripts

- **start**: Inicia o servidor de desenvolvimento do front-end.
- **build**: Cria a versão de produção da aplicação.
- **test**: Executa os testes de unidade.
- **eject**: Ejecta a configuração do `create-react-app` (usado em casos avançados).
- **mvn spring-boot:run**: Inicia o servidor de back-end (Spring Boot).

## Contribuindo

Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch com sua feature:
    ```bash
    git checkout -b minha-feature
    ```
3. Commit suas mudanças:
    ```bash
    git commit -m 'Adicionando minha feature'
    ```
4. Envie para o repositório remoto:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request no GitHub.

## Agradecimentos

Agradeço à **Squadra Digital** pela oportunidade de aprender e crescer durante o bootcamp. Foi uma experiência que me desafiou e me permitiu desenvolver habilidades essenciais para minha jornada na tecnologia.

## Contato

[Gildemar Diniz](https://www.linkedin.com/in/gildemar-diniz) | diniz.g.dev@gmail.com
