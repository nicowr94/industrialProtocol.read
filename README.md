
# IndustrialProtocol.read()
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
    
    ![Screenshot_2](https://user-images.githubusercontent.com/35709873/133397644-85500882-afd4-4d84-bd84-b34c458d7eb7.png)

    
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
    Se tendrá un resultado con status 200 OK y time 49ms con un array ordenado por payloads
    
    ![Screenshot_3](https://user-images.githubusercontent.com/35709873/133397808-29ea10e7-166e-499c-af9a-db6fc8c409b3.png)
    
    ![Screenshot_4](https://user-images.githubusercontent.com/35709873/133398274-e73d10c5-efa2-46f4-a77b-78a924420758.png)


    Hay otros ejemplos de Request en el archivo industrialProtocol.postman_collection.json
  
