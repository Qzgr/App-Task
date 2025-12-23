# App-tareas

> Aplicación simple de lista de tareas para el navegador.

## Descripción

Proyecto pequeño que permite agregar, marcar como completadas, eliminar y limpiar tareas. Las tareas se guardan en `localStorage` para persistencia entre sesiones.

## Estructura del proyecto

- index.html — interfaz principal
- scripts/script.js — lógica de la app (agregar, editar, eliminar, persistencia)
- styles/style.css — estilos básicos y adaptaciones para táctil/hover


## Uso

1. Abrir `index.html` en un navegador moderno.
2. Escribir la tarea en el campo y presionar `Agregar` o Enter.
3. Usar las casillas para seleccionar tareas.
   - `Completada`: marca las seleccionadas como completadas.
   - `Eliminar`: elimina las seleccionadas.
   - `Limpiar`: borra todas las tareas (pide confirmación).
4. Doble clic sobre una tarea para editar su texto.


## Notas

- La app está optimizada para dispositivos táctiles y escritorio (uso de `:hover` condicionado por media queries y manejo de `pointer` events).
- La persistencia se realiza mediante `localStorage` bajo la clave `mis_tareas_v1`.

## Contribuciones

Puedes abrir issues o proponer mejoras. Para cambios locales, editar los archivos dentro de `Proyect-tareas/`, probar en el navegador y enviar un PR si corresponde.

---

