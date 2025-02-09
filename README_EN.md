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
