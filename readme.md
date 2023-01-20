# CREATE API

Esta API foi desenvolvida utilizando concepções de Clean Architecture, Continuos Refactoring


To run this project you will need to create a `.env` file at the root of your project with values for the following environment variables:

* `MONGO_URL`
* `PORT`

`MONGO_URL` é onde seu MongoDB está localizado (*você também pode criar outras implementações para o CardsRepository para outros bancos de dados específicos, se desejar; os casos de uso foram desenvolvidos independentemente de implementações de banco de dados específicas*); 

Copyright © 2023 