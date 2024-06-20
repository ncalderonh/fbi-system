# FBI System

## Descripción

El FBI está abriendo un departamento de informática y te ha contratado para crear el sistema online que gestione misiones secretas. Necesitarás programar un servidor con Express que utilice JWT para la autorización de agentes que visiten las páginas restringidas.

## Requerimientos

1. **Autenticación del agente**:
   - Crear una ruta que autentique a un agente basado en sus credenciales y genere un token con sus datos.
   - Al autenticar un agente, devolver un HTML que:
     - Muestre el email del agente autorizado.
     - Guarde un token en `SessionStorage` con un tiempo de expiración de 2 minutos.
     - Disponibilice un hiperenlace para redirigir al agente a una ruta restringida.

2. **Ruta restringida**:
   - Crear una ruta restringida que devuelva un mensaje de bienvenida con el correo del agente autorizado.
   - En caso contrario, devolver un estado HTTP que indique que el usuario no está autorizado y un mensaje que mencione la descripción del error.

## Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL_del_repositorio>
   ```
2. Navega al directorio del proyecto:
   ```sh
   cd fbi-system
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso

1. Inicia el servidor:
   ```sh
   npm start
   ```
2. Abre tu navegador y navega a `http://localhost:3000`.

## Estructura del Proyecto

```plaintext
.
├── agents.js
├── index.js
├── package.json
├── public
│   ├── index.html
│   ├── restricted.html
│   └── styles.css
└── README.md
```

## Agentes

```javascript
exports.results = [
  {
    email: 'who@fbi.com',
    password: 'me',
  },
  {
    email: 'where@fbi.com',
    password: 'there',
  },
  {
    email: 'how@fbi.com',
    password: 'exactly',
  },
];
```

## Rutas

### `/signin` (POST)

Ruta para autenticar a un agente.

#### Ejemplo de solicitud

```json
{
  "email": "who@fbi.com",
  "password": "me"
}
```

#### Ejemplo de respuesta

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agent Authenticated</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="container">
    <div class="card bg-dark text-center">
      <div class="card-body">
        <h1>Bienvenido, Agente who@fbi.com</h1>
        <p>Email: who@fbi.com</p>
        <p>Autenticación exitosa.</p>
        <a href="restricted.html" class="btn bg-light my-3">Ir a la página restringida</a>
      </div>
    </div>
  </div>
  <script>
    sessionStorage.setItem('token', 'GENERATED_JWT_TOKEN');
  </script>
</body>
</html>
```

### `/restricted` (GET)

Ruta restringida que requiere autenticación.

#### Ejemplo de respuesta (Autenticado)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restricted Area</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="container">
    <div class="card bg-dark text-center">
      <div class="card-body">
        <h1>Bienvenido agente who@fbi.com</h1>
      </div>
    </div>
  </div>
</body>
</html>
```

#### Ejemplo de respuesta (No Autenticado)

```json
{
  "error": "Usuario no autorizado"
}
```

## Estilos

El estilo de las páginas se encuentra en `public/styles.css` y está inspirado en la estética seria y profesional de las páginas del FBI.
