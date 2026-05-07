# Podcaster

**Podcaster** es una Single Page Application (SPA) desarrollada con **Vue 3** y **TypeScript**. La aplicación permite explorar los 100 podcasts más populares de Apple Podcasts, filtrar resultados en tiempo real, consultar detalles de cada programa y reproducir sus episodios.
## 🚀 Decisiones Técnicas Destacables
### 1. Gestión de CORS (Vite Proxy)

Para evitar la dependencia de servicios externos (como AllOrigins o CORS-Anywhere) que pueden comprometer la estabilidad y velocidad de la aplicación, se ha implementado una solución de proxy dual:
*   **En desarrollo:** Se utiliza el proxy nativo de Vite (`vite.config.ts`) para redirigir las peticiones a la API de Apple de forma local.
*   **En producción:** Se han configurado Vercel Rewrites a través del archivo `vercel.json`. Esto permite que las peticiones se realicen al mismo dominio de la aplicación y sea el servidor de Vercel quien actúe como puente con la API de iTunes, eliminando los bloqueos de CORS de manera eficiente y profesional.
### 2. Estrategia de Caché y Persistencia
Se ha implementado un sistema de caché personalizado en LocalStorage gestionado desde los stores de **Pinia**:
*   **Timestamping**: Cada entrada en el caché incluye una marca de tiempo (`lastUpdated`).
*   **Validación**: Antes de realizar cualquier petición de red, la aplicación verifica si han pasado más de **24 horas**. Si los datos son válidos, se sirven desde el almacenamiento local, optimizando el rendimiento y reduciendo el consumo de API.

### 3. Arquitectura y Desacoplamiento

Se ha priorizado la separación de responsabilidades:
*   **Business Logic**: Toda la lógica de filtrado y formateo de datos se ha movido fuera de las vistas.
*   **Componentes Atómicos**: Los componentes son puramente representativos, lo que facilita su mantenimiento y testeo.

### 4. Estilos con SASS

Se ha utilizado SASS aprovechando la anidación y selectores avanzados (`&:hover`, etc.) para mantener un código CSS limpio, modular y fácil de leer, logrando una interfaz minimalista y moderna.
## 🛠️ Stack Tecnológico
*   **Framework**: Vue 3 (Composition API)

*   **Lenguaje:** TypeScript

*   **Estado Global:** Pinia

*   **Routing:** Vue Router

*   **Estilos:** SASS

*   **Testing:** Vitest + Vue Test Utils

*   **Bundler:** Vite

## 📦 Instalación y Configuración

1.  **Clonar el repositorio:**
    ```Bash
    git clone https://github.com/sirlencio/SPA-podcast.git
    cd SPA-podcast
    ```
1.  **Instalar dependencias:**
    ```Bash
    npm install
    ```
## 💻 Comandos Disponibles
### Desarrollo

Para arrancar la aplicación con el servidor de desarrollo y el proxy configurado:
```Bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.
### Testing

Para ejecutar la suite de tests unitarios y de integración:
```Bash
npm run test
```
### Build (Producción)

Para generar el paquete de distribución optimizado:
```Bash
npm run build
```
## 🌐 Demo

Puedes ver la aplicación funcionando en vivo aquí: [Deploy](https://spa-podcast.vercel.app/)
