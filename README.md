# Stoa Codex

## Título de la aplicación

**Stoa Codex** — Aplicación web para explorar y coleccionar libros a través del conocimiento colectivo, inspirada en la escuela estoica y el concepto de codex como colección de sabiduría antigua.

## Breve descripción

Stoa Codex es una aplicación frontend desarrollada con **React**, **Vite** y **Tailwind CSS** que permite navegar por un catálogo de libros obtenidos de la API pública de **Open Library**. Temática: estoica, con colores oscuros y acentos ámbar que evocan la idea de un archivo clásico de conocimiento.

La aplicación incluye las siguientes funcionalidades:

- **Catálogo de libros** (`/items`): búsqueda por título o autor, con filtros rápidos por categorías (Filosofía, Historia, Roma, etc.).
- **Detalle de libro** (`/items/:id`): vista completa con portada, sinopsis, géneros y enlaces externos.
- **Favoritos** (`/favoritos`): colección personal de libros guardados con persistencia en `localStorage`.
- **Tema oscuro/claro**: toggle de tema persistente en `localStorage`.
- **Navegación**: enrutamiento con `react-router-dom` y barra de navegación con enlaces activos.

## Pasos para ejecutar la aplicación localmente

1. Cloná el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd tp03
   ```

2. Instalá las dependencias:

   ```bash
   npm install
   ```

3. Ejecutá la aplicación en modo desarrollo:

   ```bash
   npm run dev
   ```

   La app se abrirá en `http://localhost:5173` (o el puerto que indique Vite en la terminal).

4. (Opcional) Construí para producción:

   ```bash
   npm run build
   ```

5. (Opcional) Previsualizá la build de producción:

   ```bash
   npm run preview
   ```

## Nombre y Apellido

grabiel david acuña 

## Enlace al repositorio

[<enlace-al-repositorio-de-github>](https://github.com/Silencio-ga/tp03)
