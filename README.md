# Paginador.ts

## Description

`Paginador` is a class in TypeScript or JavaScript that enables dynamic pagination for HTML tables. It supports pagination with dynamically generated data or data from the DOM and offers options for searching and pagination customization.

## Features

- Efficiently paginates an HTML table.
- Supports pagination of existing table data or data provided in a JSON object.
- Option to dynamically hide and show data without reloading the page.
- Includes a search field to filter table data.

## Installation and Usage

### 1. Include the class in your project

Make sure to import or include the file `Paginador-vainilla.ts` or `Paginador-vainilla.js` in your project.

### 2. Create an instance of `Paginador`

```typescript or JavaScript
const paginador = new Paginador("tableBodyId", "paginatorId", 30, 10);
```

#### Constructor Parameters

| Parameter         | Type      | Description                                                              |
|------------------|-----------|--------------------------------------------------------------------------|
| `tablaBodyId`    | `string`  | ID of the `<tbody>` of the table to be paginated.                      |
| `lugarPaginador` | `string?` | ID of the container where the pagination will be placed (optional).   |
| `filasPorPagina` | `number`  | Number of rows displayed per page.                                      |
| `paginasPorGrupo`| `number`  | Number of pages displayed in the paginator before switching groups.   |
| `data`          | `object`  | JSON data to paginate (optional).                                       |
| `hide`          | `boolean` | Defines whether elements are hidden instead of removed.                |

### JSON Data Parameters

| Parameter  | Type     | Description                                                                                   |
|------------|---------|-----------------------------------------------------------------------------------------------|
| `idTr`     | `string` | Custom ID for `<tr>` elements to be rendered (optional). If not provided, it is generated as `${tablaBodyId}-tr-paginator-${row index}`. |
| `child`    | `object` | JSON data for the rows to be rendered in the table (optional).                               |

### Child Object JSON Parameters

| Parameter  | Type     | Description                                                             |
|------------|---------|-------------------------------------------------------------------------|
| `style`    | `string` | CSS styles for the `<tr>` element (optional).                         |
| `clase`    | `string` | Class attribute values for the `<tr>` element (optional).             |
| `column`   | `object` | JSON data for columns to be rendered for each row (optional).         |

### Column Object JSON Parameters

| Parameter  | Type     | Description                                                                 |
|------------|---------|-----------------------------------------------------------------------------|
| `id`       | `string` | ID for the `<td>` elements to be rendered (optional). If not provided, it is generated as `${tablaBodyId}-column-${row index}-${column index}`. |
| `styleHijo`| `string` | CSS styles for the `<td>` element (optional).                              |
| `claseHijo`| `string` | Class attribute values for the `<td>` element (optional).                  |
| `value`    | `string` | Value assigned to the `<td>` element.                                      |

### 3. Main Methods

#### `crearPaginacion()`: void

Generates the pagination structure and adds it to the DOM.

#### `mostrarPaginaTableHide(pagina: number)`: void

Hides all table rows and displays only the rows corresponding to the selected page.

#### `mostrarPaginaTableNoHide(pagina: number)`: void

Removes all visible rows and replaces them with those corresponding to the selected page.

#### `findByName(phrase: string)`: void

Filters table rows based on the entered search term.

### 4. Full Usage Example

```typescript or JavaScript
// Paginator using JSON Data and rendering rows per page
const paginadorDataNoHide = new Paginador(
    "bodyNamesDataNoHide", null,
    5, 3, data, false
);

// Paginator using JSON Data and hiding rows per page
const paginadorDataHide = new Paginador(
    "bodyNamesDataHide", null,
    1, 3, data, true
);

// Paginator using table rows and rendering rows per page
const paginadorTablaNoHide = new Paginador(
    "bodyNamesTablaNoHide", null,
    2, 3, null, false
);

// Paginator using table rows and hiding rows per page
const paginadorTablaHide = new Paginador(
    "bodyNamesTablaHide", null,
    4, 3, null, true
);
```

## Contributions

If you would like to contribute with improvements or report bugs, you can create a Pull Request or submit an Issue in the repository.

## License

This project is licensed under the MIT License.

## Author

Created by Johan Sebastian Fuentes.

## Notes

For proper visualization, implement Bootstrap 5.0 CSS.

# INTRODUCCIÓN ESPAÑOL

# Paginador.ts

## Descripción

`Paginador` es una clase en TypeScript o en JavaScript que permite implementar la paginación en tablas HTML de manera dinámica. Soporta paginación con datos generados dinámicamente o provenientes del DOM, y ofrece opciones para búsqueda y personalización de la paginación.

## Características

- Permite paginar una tabla HTML de manera eficiente.
- Soporta la paginación de datos ya existentes en la tabla o proporcionados en un objeto JSON.
- Opción para ocultar y mostrar datos dinámicamente sin recargar la página.
- Incluye un campo de búsqueda para filtrar datos dentro de la tabla.

## Instalación y Uso

### 1. Incluir la clase en tu proyecto

Asegúrate de importar o incluir el archivo `Paginador-vainilla.ts` o `Paginador-vainilla.js` en tu proyecto.

### 2. Crear una instancia de `Paginador`

```typescript o JavaScript
const paginador = new Paginador("idDelCuerpoDeTabla", "idDelPaginador", 30, 10);
```

#### Parámetros del constructor

| Parámetro         | Tipo      | Descripción                                                                   |
| ----------------- | --------- | ----------------------------------------------------------------------------- |
| `tablaBodyId`     | `string`  | ID del `<tbody>` de la tabla a paginar.                                       |
| `lugarPaginador`  | `string?` | ID del contenedor donde se ubicará la paginación. Opcional.                   |
| `filasPorPagina`  | `number`  | Cantidad de filas que se mostrarán por página.                                |
| `paginasPorGrupo` | `number`  | Número de páginas que se mostrarán en el paginador antes de cambiar de grupo. |
| `data`            | `object`  | Datos JSON a paginar (opcional).                                              |
| `hide`            | `boolean` | Define si se ocultarán elementos en vez de removerlos.                        |

### Parámetros de Data JSON

| Parámetro         | Tipo      | Descripción                                                                   |
| ----------------- | --------- | ----------------------------------------------------------------------------- |
| `idTr`     | `string`  | Probombre ID de los `<tr>` a renderizar. Opcional.  (si no se manda se formará con el `${tablaBodyId}-tr-paginator-${index del tr}`)                                     |
| `child`  | `objet` | Datos JSON de las filas a renderizar en la tabla. Opcional.                   |

### Parámetros de child object JSON
| Parámetro         | Tipo      | Descripción                                                                   |
| ----------------- | --------- | ----------------------------------------------------------------------------- |
| `style`     | `string`  | Valores css que va dentro del atributo Style del `<tr>` a renderizar Opcional.                                      |
| `clase`     | `string`  | Valores que va dentro del atributo Class del `<tr>` a renderizar Opcional.                                      |
| `column`  | `objet` | Datos JSON de las columnas a renderizar por cada fila de la tabla. Opcional.                   |

### Parámetros de column object JSON
| Parámetro         | Tipo      | Descripción                                                                   |
| ----------------- | --------- | ----------------------------------------------------------------------------- |
| `id`     | `string`  |  ID de los `<td>` a renderizar. Opcional. (si no se manda se formará con el `${tablaBodyId}-column-${index del tr}-${index de la column}`)                                     |
| `styleHijo`     | `string`  | Valores que va dentro del atributo Style del `<td>` a renderizar Opcional.                                      |
| `claseHijo`     | `string`  | Valores que va dentro del atributo Class del `<td>` a renderizar Opcional.                                      |
| `value`  | `string` | Valor que tendrá el elemento `<td>`                   |

### 3. Métodos principales

#### `crearPaginacion()`: void

Genera la estructura de la paginación y la agrega al DOM.

#### `mostrarPaginaTableHide(pagina: number)`: void

Oculta todas las filas de la tabla y muestra solo las filas correspondientes a la página seleccionada.

#### `mostrarPaginaTableNoHide(pagina: number)`: void

Elimina todas las filas visibles y las reemplaza con las correspondientes a la página seleccionada.

#### `findByName(phrase: string)`: void

Filtra las filas de la tabla según la búsqueda ingresada.

### 4. Ejemplo de Uso Completo

```typescript o javascript
//Paginador usando el objeto Data y renderizando filas por pagina
const paginadorDataNoHide = new Paginador(
            "bodyNamesDataNoHide", null,
            5, 3, data, false
        );
//Paginador usando el objeto Data y ocultando filas por pagina
const paginadorDataHide = new Paginador(
    "bodyNamesDataHide", null,
    1, 3, data, true
);

//Paginador tomando filas de tablas y renderizando filas por pagina
const paginadorTablaNoHide = new Paginador(
    "bodyNamesTablaNoHide", null,
    2, 3, null, false
);

//Paginador tomando filas de tablas y ocultando filas por pagina
const paginadorTablaHide = new Paginador(
    "bodyNamesTablaHide", null,
    4, 3, null, true
);
```

## Contribuciones

Si deseas contribuir con mejoras o detectar errores, puedes crear un Pull Request o reportar un Issue en el repositorio.

## Licencia

Este proyecto está bajo la licencia MIT.

## Autor

Creado por Johan Sebastian Fuentes.

## Notas

Para una correcta visualización, implementar el CSS de Bootstrap 5.0.
