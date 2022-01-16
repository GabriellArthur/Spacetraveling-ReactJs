# spacetraveling

# 💻 Sobre o desafio

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde o seu principal objetivo é criar um blog do zero. Você vai receber uma aplicação praticamente em branco que deve consumir os dados do Prismic e ter a interface implementada conforme o layout do Figma. Você terá acesso a diversos arquivos para implementar:

- Estilizações global, comun e individuais;
- Importação de fontes Google;
- Paginação de posts;
- Cálculo de tempo estimado de leitura do post;
- Geração de páginas estáticas com os métodos `getStaticProps` e `getStaticPaths`;
- Formatação de datas com `date-fns`;
- Uso de ícones com `react-icons`;
- Requisições HTTP com `fetch`;
- Entre outros.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

# Template da aplicação

Para realizar esse desafio, criamos para você esse modelo que você deve utilizar como um template do GitHub.

O template está disponível na seguinte URL:

[](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero)

**Dica**: Caso não saiba utilizar repositórios do GitHub como template, temos um guia em **[nosso FAQ](https://www.notion.so/FAQ-Desafios-ddd8fcdf2339436a816a0d9e45767664).**

# Se preparando para o desafio

Para esse desafio, iremos reforçar alguns pontos e apresentar algumas libs para te ajudar no desenvolvimento. 

Começando pelo tema do projeto: criando um projeto do zero. Como isso é inviável por causa dos testes e algumas verificações que precisamos que vocês sigam, criamos um projeto com a menor quantidade de código possível. A idéia é se assemelhar a um projeto recém criado com a CLI do Next.js.

Dessa forma, antes de ir diretamente para o código do desafio, explicaremos um pouquinho de:

- Prismic;
- Figma;
- fetch;
- react-icons;
- date-fns.

Vamos nessa?

Mesmo com as explicações acima, ficou em dúvida de como ficarão esses campos na sua página?   Deixamos abaixo um print descrevendo cada campo no resultado final para te ajudar:

1. slug
2. banner
3. title
4. first_publication_date (campo gerado automaticamente pelo Prismic)
5. author
6. content (primeiro grupo)
7. content (segundo grupo)
8. heading (primeiro grupo)
9. body (primeiro grupo)
10. heading (segundo grupo)
11. body (segundo grupo)

#Figma
https://www.figma.com/file/EwCw7z0GZaCnfdX4epEBnY/Desafios-Módulo-3-ReactJS-(Copy)?node-id=0%3A1
