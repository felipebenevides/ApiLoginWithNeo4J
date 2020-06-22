# ApiLoginWithNeo4J
Api de Login usando Banco De Dados Orientado à Grafos Neo4J 

Sou Dev especializado em .Net a fim de cumprir um desafio criei essa api em nodeJS para expandir meus conhecimentos, com intuito de entender o funcionamento e facilitar o entendimento para explicação desse tutorial não me aprofundei em aplicar DDD , Tests ou algo do tipo.

Vamos ao Código.....

Para executar localmente abrir o terminal de comandos e clonar o repositorio.

git clone https://github.com/felipebenevides/ApiLoginWithNeo4J.git

Após baixar abra a pasta raiz do projeto pelo terminal e instale as dependencias usando o comando npm install.


Segue um link para auxiliar como rodar o neo4J em um container Docker:
https://neo4j.com/developer/docker-run-neo4j/

Com o Neo4J modifique a cadeia de conexão na linha 13 do arquivo server.js

var driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j', '123456')
)

-- 'neo4j' é o nome do banco que deseja usar... 

-- '123456' Senha criada na instalação.

execute a query para criar um usuario para realizar login

CREATE (u1:User {NickName: "juquinha", FullName: "juquinha dev", password:"123456", Id: 1})

para rodar execute no promp o comando node server.js


Rotas:

localhost:3500/login

curl --location --request POST 'localhost:3500/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'user=Felipe' \
--data-urlencode 'pwd=123456'


ao fazer login foi armazenado um token do jwt no localstorage

utilize ele para utilizar as demais rotas.

-- GET Obter Lista de Clientes

localhost:3500/Clientes

curl --location --request GET 'localhost:3500/Clientes'


-- POST Criar Clientes

curl --location --request POST 'localhost:3500/Clientes' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJBbGxhbiBMVE0gRmlkZWxpZGFkZSIsIkFsbGFuIExUTSBGaWRlbGlkYWRlIl0sIklkIjoiMiIsIk5vbWUiOiJBbGxhbiBMVE0gRmlkZWxpZGFkZSIsIkNwZiI6IjAyNi4yMjYuODQxLTg1ICIsIlBlcmZpbElkIjoiMSIsInJvbGUiOlsiMXxDYW1wYW5oYXMiLCIyfEJhbm5lcnMiLCIzfFVzdcOhcmlvcyIsIjR8UGVyZmlzIiwiNXxQYXJ0aWNpcGFudGVzIiwiNnxSZWxhdG9yaW9zIiwiN3xEYXNoYm9hcmQgZGUgQm9uaWZpY2HDp8OjbyIsIjh8RGFzaGJvYXJkIGRlIFBvbnR1YcOnw6NvIl0sIm5iZiI6MTU5MTIzNjMyOCwiZXhwIjoxNTkxMzIyNzI4LCJpYXQiOjE1OTEyMzYzMjgsImlzcyI6Imh0dHBzOi8vc291emFjcnV6Y29uZWN0YWFkbWluYXBpZGV2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiaHR0cHM6Ly9zb3V6YWNydXpjb25lY3RhYWRtaW5hcGlkZXYuYXp1cmV3ZWJzaXRlcy5uZXQifQ.-RyndPxVYqJdnUPWMMd1L3j28M9i32u80iLEQ04sTgc' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'nome=Felipe Benevides 2' \
--data-urlencode 'email=felipebenevides@outlook.com' \
--data-urlencode 'endereco=Vila Caiapia Teste' \
--data-urlencode 'cidade=Cotia' \
--data-urlencode 'cep=06705-050' \

-- PUT Atualizar Clientes

curl --location --request PUT 'localhost:3500/Clientes' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJBbGxhbiBMVE0gRmlkZWxpZGFkZSIsIkFsbGFuIExUTSBGaWRlbGlkYWRlIl0sIklkIjoiMiIsIk5vbWUiOiJBbGxhbiBMVE0gRmlkZWxpZGFkZSIsIkNwZiI6IjAyNi4yMjYuODQxLTg1ICIsIlBlcmZpbElkIjoiMSIsInJvbGUiOlsiMXxDYW1wYW5oYXMiLCIyfEJhbm5lcnMiLCIzfFVzdcOhcmlvcyIsIjR8UGVyZmlzIiwiNXxQYXJ0aWNpcGFudGVzIiwiNnxSZWxhdG9yaW9zIiwiN3xEYXNoYm9hcmQgZGUgQm9uaWZpY2HDp8OjbyIsIjh8RGFzaGJvYXJkIGRlIFBvbnR1YcOnw6NvIl0sIm5iZiI6MTU5MTIzNjMyOCwiZXhwIjoxNTkxMzIyNzI4LCJpYXQiOjE1OTEyMzYzMjgsImlzcyI6Imh0dHBzOi8vc291emFjcnV6Y29uZWN0YWFkbWluYXBpZGV2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiaHR0cHM6Ly9zb3V6YWNydXpjb25lY3RhYWRtaW5hcGlkZXYuYXp1cmV3ZWJzaXRlcy5uZXQifQ.-RyndPxVYqJdnUPWMMd1L3j28M9i32u80iLEQ04sTgc' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'nome=Felipe Benevides 2' \
--data-urlencode 'email=felipebenevides@outlook.com' \
--data-urlencode 'endereco=Vila Caiapia Teste' \
--data-urlencode 'cidade=Cotia' \
--data-urlencode 'cep=06705-050' \
--data-urlencode 'id=3' 

-- DELETE 

curl --location --request DELETE 'localhost:3500/Clientes/3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJBbGxhbiBMVE0gRmlkZWxpZGFkZSIsIkFsbGFuIExUTSBGaWRlbGlkYWRlIl0sIklkIjoiMiIsIk5vbWUiOiJBbGxhbiBMVE0gRmlkZWxpZGFkZSIsIkNwZiI6IjAyNi4yMjYuODQxLTg1ICIsIlBlcmZpbElkIjoiMSIsInJvbGUiOlsiMXxDYW1wYW5oYXMiLCIyfEJhbm5lcnMiLCIzfFVzdcOhcmlvcyIsIjR8UGVyZmlzIiwiNXxQYXJ0aWNpcGFudGVzIiwiNnxSZWxhdG9yaW9zIiwiN3xEYXNoYm9hcmQgZGUgQm9uaWZpY2HDp8OjbyIsIjh8RGFzaGJvYXJkIGRlIFBvbnR1YcOnw6NvIl0sIm5iZiI6MTU5MTIzNjMyOCwiZXhwIjoxNTkxMzIyNzI4LCJpYXQiOjE1OTEyMzYzMjgsImlzcyI6Imh0dHBzOi8vc291emFjcnV6Y29uZWN0YWFkbWluYXBpZGV2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiaHR0cHM6Ly9zb3V6YWNydXpjb25lY3RhYWRtaW5hcGlkZXYuYXp1cmV3ZWJzaXRlcy5uZXQifQ.-RyndPxVYqJdnUPWMMd1L3j28M9i32u80iLEQ04sTgc' \

Dúvidas???

Me pergunte que farei o possivel para esclarecer.
felipebenevides@outlook.com
