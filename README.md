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
