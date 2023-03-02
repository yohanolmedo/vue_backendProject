<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Crowdfunding API

1. Clonar proyecto
2. ```npm install```
3. Clonar el archivo ```.env.example``` y renombrarlo a ```.env``` 
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```
6. Levantar: ```npm start:dev``` 

7. Endoint:  ```http://localhost:3000/api/``` 


---
---
### Mercado Pago

Dentro del archivo .env se deben configurar las variables de entorno:

MP_ACCESS_TOKEN: Este es el token que debe tener la persona que reciba el dinero, el mismo se debe obtenermediante la cuenta de Mercado pago creada

MP_SUCCESS_PAYMENT: Se debe poner la pagina o ruta a la que el usuario que esta pagando accedera luego de realizar el pago si el mismo se efectiviza con exito

MP_FAILURE_PAYMENT: Se debe poner la pagina o ruta a la que el usuario que esta pagando accedera luego de realizar el pago FALLA

MP_PENDING_PAYMENT: Se debe poner la pagina o ruta a la que el usuario que esta pagando accedera luego de realizar el pago QUEDA PENDIENTE

---

Endpoint para Realizar orden de compra:

``` javascript
http://localhost:3000/api/donation/mp
```
Se debe enviar una petición post con el siguiente body:

```JSON
{ 
  "unit_price": 100,
  "name": "Diego",  
  "email":"user@email.com"
}
```
Donde unit_price es el monto que se va a donar.

Este endpoint devuelve la ruta que debe ser renderizada para que el donante siga con el pago.
Se debe guardar en localStorage el monto a donar, el nombre del usuario y el id del proyecto para el cual se está realizando la donación.

Una ves que el donante termine la transacción, mercado pago lo deriva automáticamente a la ruta success puesta como variable de entorno. A esta ruta a su ves, le agrega ciertos parámetros de los cuales debemos obtener el parámetro 'status' y verificar si su valor es 'approved'.

Una ves verificado esto debemos enviar los datos almacenados en local storage en una petición POST

A la URL:
```javascript
  http://localhost:3000/api/donation/new
```
con el body: 
```JSON
{
	"amount": 300,
  "name": "Nombre",
	"projectId": "a322c363-1898-4b98-8827-ef035b0d8fa0"
}
```

Una vez realizada esa petición la api va a generar una nueva donación, la vinculará al proyecto e incrementará el total recaudado en el mismo


# Información 
Cuentas de Mercado Pago para Pruebas
```
Identificación de cuenta: TEST_USER_1313855305 Usuario Contraseña: uQwpuTttut Public Key: APP_USR-39f42a1c-072a-45e5-95e2-a0ef3bd7b622 Access Token: APP_USR-4410140070420770-021915-9a67e31ccdd7e46c81e6967f03a2eedf-1313855305

Identificación de cuenta: TEST_USER_1313864649 Usuario Contraseña: t61vtrzaJC Public Key: APP_USR-67e17192-9882-430a-919c-7c0ec08b0749 Access Token: APP_USR-1271116256911400-021915-42f226bbf128fa74d870f633c6b6999f-1313864649
```