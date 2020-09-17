**Javascript, Node, Express, MongoDB**

api_sales
Base de datos: "sample_suplies"
Colección: "sales"
Crea una API que cumpla con los siguientes métodos y características:

GET /sales
Crea un método que obtenga las ventas con la siguiente estructura:

- \_id
- date (cambia el nombre de saleDate)
- items - name - total (price \* quantity) - unitPrice (cambia nombre de price)
- storeLocation
- customer (todos los datos)
- couponUsed
- purchasedMethod
  Filtros: - purchaseMethod - customer.satisfaction (rango) - storeLocation - date (rango)

GET /customers
Crea un método que obtenga un listado de todos los clientes que están registrados en las ventas junto con las siguientes estadísticas:

- satisfactionAvg (promedio de satisfacción de todos los clientes)
- ageMax (edad máxima de los clientes)
- ageMin (edad mínima de los clientes)
- ageAvg (promedio de edad de los clientes)
- femaleCount (número de cleintes de sexo femenino)
- maleCount (número de clientes de sexo masculino)

GET /items
Crea un método que obtenga un listado de todos los items que se han vendido, debes incluir/generar los siguientes campos:

- name
- price
- totalQuantity (suma de la cantidad de ventas del producto en todos los registros)
- revenue (price \* totalQuantity)
- tags
