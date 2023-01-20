# CREATE API

Esta API foi desenvolvida utilizando concepções de Clean Architecture, Continuos Refactoring


Para executar este projeto você precisará criar um arquivo `.env` e ou renomear o `env.example` na raiz do seu projeto com valores para as seguintes variáveis ​​de ambiente:

* `MONGO_URL`
* `PORT`

## Dificuldades
Monte a estrutura separando as responsabilidades. 
Mas tive alguns problemas com relação a implantação do docker.
Então acabei não subindo essa parte.
A aplicação roda, até manda informações de erro, pq esta configurado o middleware.


## Instalação do Mongo
Para instalação, faça:

> docker-compose up -d

## Rodando o Back
Para rodá-lo, faça:

> cd BACK

> yarn

> yarn start


## Available Scripts

No diretório do projeto, você pode executar:

### `yarn start`

Executa o aplicativo no modo de desenvolvimento.\
Open [http://localhost:5000](http://localhost:5000) - configuração no .env com relação a porta

`MONGO_URL` é onde seu MongoDB está localizado (*você também pode criar outras implementações para o CardsRepository para outros bancos de dados específicos, se desejar; os casos de uso foram desenvolvidos independentemente de implementações de banco de dados específicas*); 

Copyright © 2023 