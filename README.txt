Software necesario:
- Node.js versión 14 o superior
- Angular CLI versión 12 o superior
- Es necesario una conexión a Internet para consumir la API Rest (https://jsonplaceholder.typicode.com)


Librerías utilizadas:
- Angular versión 12 (https://v12.angular.io/docs)
- Bootstrap versión 4.6 (https://getbootstrap.com/docs/4.6/getting-started/introduction/)
- NgBootstrap versión 10 (https://ng-bootstrap.github.io/#/home)


Pasos a seguir para lanzar la aplicación:
0. Lanzar el comando `npm i` (sólo la primera vez, para instalar las dependencias necesarias)
1. Lanzar el comando `ng serve`
2. Abrir el navegador deseado y visitar `http://localhost:4200`


Componentes de la aplicación:
- Hay 2 pantallas disponibles: el listado y los detalles de Usuario.
- Hay 3 ventanas modales disponibles: la creación, la actualización y el borrado de Usuario.


Cómo funciona la aplicación:
- Al entrar a la página web se redirigirá automáticamente a la pantalla del listado.
- Al introducir una URL no válida se redirigirá automáticamente a la pantalla del listado.
- Durante la carga de datos se deshabilitan los enlaces y acciones presentes.
- Para cerrar una ventana modal es necesario hacer click en el aspa, se ha deshabilitado el cierre al hacer click en el
fondo oscurecido.
- La creación, la actualización y el borrado son funcionales en la web, pero los datos son falseados por parte del
servicio consumido (las modificaciones no son persistentes y se restablecen al volver a consultar los datos).
- Cada vez que se consulta la API se retrasa la llegada de los datos de la respuesta hacia el componente que solicita el
recurso un tiempo aleatorio de hasta 3 segundos.
- En el listado se puede filtrar a un Usuario por sus campos "username" o "email", resaltando en negrita las
coincidencias sobre los datos presentes y simulando la consulta para mostrar solo aquellos resultados con coincidencias.
Además, también se ve reflejado y tiene efecto en la propia barra de dirección.


Posibles mejoras:
- Añadir una pantalla de bienvenida.
- Utilizar formularios reactivos e implementar validación a los datos introducidos.
- Añadir el resto de campos que la entidad Usuario tiene disponibles.
- Añadir otras entidades disponibles en https://jsonplaceholder.typicode.com o implementar su solución de base de datos
para utilizar datos y entidades personalizadas.
- Implementar ordenación y paginación de los datos consultados en el listado, usando como ejemplo
https://ng-bootstrap.github.io/#/components/table/examples .
- Quitar el retraso impuesto a los datos de la consulta para mejorar drásticamente la velocidad.
