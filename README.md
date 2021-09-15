# industrialProtocol.read-
El desafío es implementar una función que maneje de manera eficiente las llamadas de una operación de lectura para un protocolo industrial. 

## Se utilizó
- Node.js
- Babel
- Express

## Para ejecutar la aplicación

- Descargar el repositorio
- Abrir consola en la dirección del proyecto
- Ejecutar el comando
  ```javascipt
    npm run dev  
  ```
  
  ## Forma de utilizar el api
  - Ir a http://localhost:3000/
  - Utilizar la api: 
    GET: http://localhost:3000/industrialProtocol
    
    ```javascipt
    Body:
       {
      "inputList": [
          {
              "start": 2,
              "length": 9,
              "callback":"cb1"
          },
          {
              "start": 4,
              "length": 2,
              "callback":"cb2"
          },
          {
              "start": 1,
              "length": 4,
              "callback":"cb2"
          },
          {
              "start": 5,
              "length": 1,
              "callback":"cb2"
          }
        ]
      }
    ```
    Hay otros ejemplos de Request en el archivo industrialProtocol.postman_collection.json
  
