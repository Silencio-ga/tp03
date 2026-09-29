# **Trabajo Práctico Evaluativo 3**

**OBJETIVO:**

Desarrollar una aplicación web en React que consuma información de una API pública de forma asíncrona, aplique enrutamiento con múltiples vistas y gestione el estado global de la aplicación. La temática de la aplicación es libre.

**MODALIDAD:**

El práctico se debe defender de manera oral, mostrando el proyecto en funcionamiento y respondiendo preguntas sobre el mismo, la estructura del código y los hooks utilizados.

### **Requisitos**

* **R1: Enrutamiento y Navegación (`react-router-dom`)**  
  * **Rutas Base:** Implementar al menos 3 rutas principales en la aplicación (ejemplo: Inicio `/`, Catálogo `/items`, Favoritos `/favoritos`).  
  * **Ruta Dinámica:** Definir al menos 1 ruta dinámica que reciba un parámetro para consultar y mostrar el detalle de un ítem en específico (ejemplo: `/item/:id`).  
  * **Ruta Anidada:** Implementar al menos 1 ruta anidada utilizando subrutas (ejemplo: `/items/categoria` dentro de `/items`, o `/perfil/ajustes`).  
  
* **R2: Consumo de API y Manejo de Estado (`useState` y `useEffect`)**  
  * Consumir una API externa mediante peticiones asíncronas (`fetch` o `axios`) para obtener y mostrar datos en pantalla.  
  * Hacer uso obligatorio de `useState` para gestionar el estado de los datos, indicadores de carga (*loading*) y errores.  
  * Hacer uso obligatorio de `useEffect` para desencadenar las peticiones a la API en la carga inicial o ante cambios de filtros.  
  
* **R3: Gestión de Estado Global con Context API**  
  * Implementar Context API (`createContext` y `useContext`) para compartir y almacenar información global en la aplicación.  
  * *Ejemplos de uso:* Guardar una lista de "Favoritos" / "Carrito", selector de tema (Modo Claro / Oscuro).  
  
* **R4: Selección de API (Temática Libre)** pueden elegir la temática que prefieran. A modo de recomendación, pueden usar alguna de las siguientes APIs públicas:  
  * **Música:** Discogs API (álbumes, discos y artistas)  
  * **Videojuegos:** RAWG API (base de datos de videojuegos)  
  * **Cine y Series:** TMDB (The Movie Database)  
  * **Entretenimiento:** Poké API  
  * **Libros:** Open Library API

  ### **Condiciones de entrega**

* Separar la lógica en componentes modulares y reutilizables.  
* Aplicar estilos con Tailwind.  
* Modificar el archivo `README.md` agregando:  
  * Título de la aplicación.  
  * Breve descripción que explique la temática elegida y la API utilizada.  
  * Pasos para ejecutar la aplicación de forma local (`npm install`, `npm run dev` / `npm start`).  
  * Nombre y Apellido.  
* Entregar el enlace al repositorio público mediante **GitHub**.