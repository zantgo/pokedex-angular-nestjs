# 📡 Especificación de la API REST (API Spec)

Este documento define el contrato de comunicación (API RESTful) expuesto por el backend de **NestJS** para ser consumido por el cliente **Angular**.

## 1. Información General

*   **Base URL (Desarrollo):** `http://localhost:3000/api/v1`
*   **Content-Type:** `application/json`
*   **Validación:** Todas las peticiones entrantes son validadas estrictamente por los **DTOs (Data Transfer Objects)** usando `class-validator` en NestJS. Los parámetros no definidos en el contrato serán automáticamente eliminados de la petición (Whitelisting).

---

## 2. Convenciones Globales

### Formato de Respuestas de Error
NestJS maneja las excepciones a través de un *Global Exception Filter*. Cualquier error estructural, de validación o de lógica de negocio devolverá un formato estandarizado:

```json
{
  "statusCode": 400,
  "message":[
    "minWeight must be a number conforming to the specified constraints",
    "type must be a string"
  ],
  "error": "Bad Request",
  "timestamp": "2026-03-08T12:00:00.000Z",
  "path": "/api/v1/pokemons?minWeight=abc"
}
```

### Formato de Paginación
Las respuestas que devuelven listas de elementos utilizarán una estructura de metadatos para facilitar la paginación en Angular:

```json
{
  "data": [ ... ],
  "meta": {
    "totalItems": 150,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 15,
    "currentPage": 1
  }
}
```

---

## 3. Endpoints del Módulo de Pokémon

### 3.1. Sincronizar Base de Datos (Ingesta)
Dispara el proceso asíncrono en el backend que consume la [PokeAPI](https://pokeapi.co/) externa, normaliza los datos y los inserta/actualiza en la base de datos PostgreSQL utilizando TypeORM.

*   **Método:** `POST`
*   **Ruta:** `/pokemons/sync`
*   **Body:** N/A

**Respuesta Exitosa (`201 Created` / `202 Accepted`):**
```json
{
  "status": "success",
  "message": "Sincronización completada exitosamente.",
  "importedCount": 150
}
```

**Respuesta de Error (`500 Internal Server Error`):**
Devuelta si hay un error de red al contactar la API externa o un fallo en la persistencia de PostgreSQL.

---

### 3.2. Listar y Filtrar Pokémon
Obtiene el listado de especímenes. Soporta paginación y filtrado avanzado. 
*Nota de Arquitectura: Para mantener un contrato estandarizado y simétrico, la API espera los filtros numéricos en **unidades crudas** (Hectogramos y Decímetros), que son las mismas unidades que devuelve. El Frontend es responsable de realizar la conversión matemática (ej. kg a hg) antes de enviar la petición.*

*   **Método:** `GET`
*   **Ruta:** `/pokemons`

#### Query Parameters (Opcionales)

| Parámetro | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `page` | `number` | Número de página actual (por defecto: 1). | `1` |
| `limit` | `number` | Cantidad de registros por página (10, 25, 50). | `25` |
| `search` | `string` | Búsqueda parcial por nombre (case-insensitive). | `pika` |
| `type` | `string` | Filtro exacto por tipo biológico. | `grass` |
| `minWeight` | `number` | Peso mínimo en **Hectogramos (hg)**. | `105` |
| `maxWeight` | `number` | Peso máximo en **Hectogramos (hg)**. | `500` |
| `minHeight` | `number` | Altura mínima en **Decímetros (dm)**. | `2` |
| `maxHeight` | `number` | Altura máxima en **Decímetros (dm)**. | `15` |
| `sortBy` | `string` | Campo para ordenar (`id`, `name`, `weight`, `height`). | `weight` |
| `sortOrder` | `string` | Dirección de ordenamiento (`ASC`, `DESC`). | `DESC` |

**Ejemplo de Petición:**
`GET /api/v1/pokemons?type=grass&minWeight=50&maxWeight=800&limit=10&page=1`

**Respuesta Exitosa (`200 OK`):**
```json
{
  "data":[
    {
      "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      "pokedexId": 1,
      "name": "bulbasaur",
      "types":["grass", "poison"],
      "height": 7,     
      "weight": 69     
    }
  ],
  "meta": {
    "totalItems": 1,
    "itemCount": 1,
    "itemsPerPage": 10,
    "totalPages": 1,
    "currentPage": 1
  }
}
```
*(Nota: Los campos `height` y `weight` se retornan en las unidades crudas originales de la API (Decímetros y Hectogramos). La capa de presentación en Angular utilizará `Pipes` para transformarlos a cm/kg de cara al usuario).*

---

### 3.3. Obtener Detalle de un Pokémon
Devuelve los datos de un espécimen específico basado en su ID de la Pokedex Nacional. Utilizado si el Frontend implementa una vista de "Detalle" o "Ficha" (`PokemonCardComponent`).

*   **Método:** `GET`
*   **Ruta:** `/pokemons/:pokedexId`

**Path Parameters:**
*   `pokedexId` (`number`): ID oficial del Pokémon.

**Respuesta Exitosa (`200 OK`):**
```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  "pokedexId": 25,
  "name": "pikachu",
  "types":["electric"],
  "height": 4,
  "weight": 60
}
```

**Respuesta de Error (`404 Not Found`):**
```json
{
  "statusCode": 404,
  "message": "Pokemon with Pokedex ID 9999 not found",
  "error": "Not Found",
  "timestamp": "2026-03-08T12:05:00.000Z",
  "path": "/api/v1/pokemons/9999"
}
```
