# 🚀 Características del Producto (Features & User Journeys)

Este documento detalla las funcionalidades clave de la **Pokedex Analytics Platform**, destacando el valor funcional y las decisiones de diseño técnico que permiten una arquitectura desacoplada y altamente eficiente.

---

## 1. Catálogo de Funcionalidades Principales

### 🔄 Ingesta Asíncrona (Smart Sync)
*   **Problema:** La dependencia de una API de terceros (PokeAPI) en cada petición de búsqueda hace que el sistema sea lento y propenso a fallos.
*   **Solución:** El backend (NestJS) expone un endpoint de sincronización que descarga los datos de PokeAPI, los normaliza y los persiste en una base de datos PostgreSQL local.
*   **Valor UX:** Se habilita la búsqueda instantánea una vez sincronizada la base local. Se incluye un feedback visual de carga en el Frontend durante todo el proceso.

### 🔍 Motor de Filtros Multidimensionales
*   **Descripción:** Consola de filtros construida con `ReactiveFormsModule` de Angular.
*   **Características Técnicas:**
    *   **Backend QueryBuilder:** Los filtros de peso (kg) y altura (cm) son procesados por el backend, que realiza la conversión a las unidades crudas de la API (hg/dm) antes de ejecutar la consulta SQL. Esto asegura que la base de datos se mantenga como "Fuente Única de Verdad".
    *   **Debounce Time:** Implementación de `RxJS (debounceTime)` en el Frontend para ejecutar búsquedas 300ms después de que el usuario finalice su escritura, reduciendo el tráfico de red innecesario.

### 🎨 Transformación de Presentación Dinámica (Front-End Driven)
*   **Descripción:** Sistema modular de transformación visual mediante **Pipes de Angular**.
*   **Características:**
    *   **Separación de Responsabilidades:** El backend entrega los datos "crudos" tal como son persistidos. Es la responsabilidad del Frontend transformar estos valores para la visualización humana (Kilogramos y Centímetros) usando Pipes personalizados.
    *   **Modularidad:** Si el laboratorio requiere añadir nuevas vistas (ej. nombre en *ALL CAPS* o *Encapsulado*), basta con añadir un nuevo Pipe en Angular. Esto desacopla totalmente la lógica de persistencia de la lógica de visualización.
    *   **Reusabilidad:** Los Pipes permiten aplicar estas transformaciones en cualquier parte de la aplicación de manera declarativa (`{{ pokemon.name | invertName }}`).

### 📊 Dashboard y Data Grid
*   **Descripción:** Tabla interactiva de alta fidelidad.
*   **Características:**
    *   **Paginación del Lado del Servidor:** Optimización para manejar grandes volúmenes de datos mediante peticiones paginadas al backend.
    *   **Renderizado Reactivo:** Uso de `Signals` de Angular 17+ para actualizar la tabla de forma instantánea al recibir nueva data, evitando re-renderizados innecesarios del DOM.

---

## 2. User Journeys (Casos de Uso)

### Journey A: Sincronización Inicial (Cold Start)
1. El usuario abre la plataforma y observa una tabla vacía.
2. El sistema invita a la sincronización. Tras disparar `POST /pokemons/sync`, el usuario visualiza un componente de carga.
3. Al finalizar, la lista de especímenes se actualiza automáticamente gracias a la reactividad de las Signals.

### Journey B: Filtrado de Especímenes (Análisis Científico)
1. El investigador define criterios: **Tipo "Grass"**, **Peso entre 5kg y 30kg**.
2. Al presionar "Analizar", Angular serializa los filtros como *Query Params*.
3. NestJS recibe los parámetros, realiza las conversiones (5kg -> 50hg, 30kg -> 300hg) y ejecuta el `QueryBuilder`.
4. La tabla se refresca con los resultados filtrados, mostrando las unidades convertidas gracias a los Pipes de Angular.

---

## 3. Resiliencia y Manejo de Errores

*   **Error Handling Global:** Los errores del backend (400, 500) son interceptados por un `ErrorInterceptor` de Angular que muestra una notificación al usuario, evitando que la aplicación quede en un estado inconsistente.
*   **Validación Estricta:** Gracias a los DTOs de NestJS, cualquier entrada de datos maliciosa o mal formada es rechazada por el backend antes de intentar consultar la base de datos, garantizando la integridad de PostgreSQL.
