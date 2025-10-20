# Migraciones de la base de datos

Utiliza `goose` para manejar las migraciones. Ejemplo de comandos:

- Crear una nueva migración:
  ```bash
  goose create nombre_migracion sql
  ```

- Aplicar migraciones:
  ```bash
  goose up
  ```

- Revertir la última migración:
  ```bash
  goose down
  ```
