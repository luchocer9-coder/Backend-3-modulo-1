# ShipNow API

API REST con Node.js, Express y MongoDB para gestionar usuarios y productos, organizada en arquitectura de capas.

## Cómo correr el proyecto

1. Clonar el repositorio y entrar a la carpeta.
2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` a partir de `.env.example` y completar `PORT`, `MONGODB_URI` y `NODE_ENV`.
4. Iniciar en modo desarrollo:

   ```bash
   npm run dev
   ```

Si falta una variable obligatoria, la aplicación muestra cuál es y no arranca.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Verifica que el servidor esté activo |
| GET | `/api/products` | Lista productos disponibles |
| GET | `/api/products/:id` | Obtiene un producto |
| POST | `/api/products` | Crea un producto |
| PUT | `/api/products/:id` | Actualiza un producto |
| DELETE | `/api/products/:id` | Elimina un producto |
| GET | `/api/users` | Lista usuarios |
| GET | `/api/users/:id` | Obtiene un usuario |
| POST | `/api/users` | Crea un usuario |
| PUT | `/api/users/:id` | Actualiza un usuario |
| DELETE | `/api/users/:id` | Elimina un usuario |

## Arquitectura

El flujo es `Router → Controller → Service → Repository → Model`.

- **Controller:** recibe la petición HTTP y devuelve la respuesta con su status code.
- **Service:** contiene las reglas de negocio.
- **Repository:** es la única capa que usa los modelos de Mongoose para acceder a MongoDB.

## Por qué separé Service y Repository

Separé estas capas para que las reglas de negocio no dependan de cómo se guardan los datos. El Service decide qué debe pasar, y el Repository resuelve cómo buscarlo o guardarlo.

- **En el Service:** listar solo productos disponibles, calcular el estado según el stock, validar y encriptar la contraseña, asignar el rol inicial y avisar si un registro no existe.
- **En el Repository:** consultar y guardar datos, definir qué campos se devuelven y ordenar los resultados.

Así, si cambia la forma de acceder a los datos, las reglas de negocio no deberían cambiar.