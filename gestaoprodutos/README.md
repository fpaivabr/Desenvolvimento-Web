Gestão de Produtos API

Esta é uma API REST desenvolvida para gerenciar informações de produtos. Ela oferece operações CRUD (Create, Read, Update, Delete) para a entidade "Produto". Você pode listar produtos, buscar produtos por ID, criar novos produtos, atualizar produtos existentes e excluí-los.


Configuração

Para configurar e executar este projeto, siga as instruções abaixo:
Clone este repositório em sua máquina local.
Abra o projeto em sua IDE de desenvolvimento preferida.
Certifique-se de que você tenha o Java e o Maven instalados em sua máquina.
Configure as propriedades do banco de dados no arquivo application.properties. Você pode definir as informações de conexão com o banco de dados H2, como o URL, usuário e senha.


Exemplo de application.properties:

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha


Executando o Projeto

Para executar o projeto, siga os passos abaixo:
Abra um terminal na pasta do projeto.
Execute o seguinte comando: mvn spring-boot:run
O servidor será iniciado e a API estará disponível no endereço http://localhost:8081.


Testes de Integração

Para testar a API, você pode usar o Postman ou o Insomnia. Siga as etapas abaixo:
Abra o Postman ou Insomnia.
Crie solicitações para os seguintes endpoints da API:

GET /produtos: Lista todos os produtos.
GET /produtos/{id}: Busca um produto pelo ID.
POST /produtos: Cria um novo produto (envie um JSON com os dados do produto).
PUT /produtos/{id}: Atualiza um produto existente (envie um JSON com os dados atualizados).
DELETE /produtos/{id}: Exclui um produto pelo ID.
Certifique-se de incluir os dados corretos nas solicitações, conforme a documentação.
Execute as solicitações e verifique as respostas para garantir o funcionamento correto da API.


Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.