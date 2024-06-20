const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const agents = require('./data/agents');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para la autenticación del agente
app.post(
    '/signin',
    [
        check('email').isEmail().withMessage('Debe ser un email válido'),
        check('password').not().isEmpty().withMessage('La contraseña es requerida')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const agent = agents.results.find(agent => agent.email === email && agent.password === password);

        if (!agent) {
            return res.status(401).send('Credenciales incorrectas');
        }
        const token = jwt.sign({ email }, 'ElPerroHaceMiau', { expiresIn: '2m' });
        res.json({ token });
    });

// HTML dinámico
res.send(`
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
            <h1>Bienvenido, Agente ${email}</h1>
            <p>Email: ${email}</p>
            <p>Autenticación exitosa.</p>
            <a href="restricted.html" class="btn bg-light my-3">Ir a la página restringida</a>
          </div>
        </div>
      </div>
      <script>
        sessionStorage.setItem('token', '${token}');
      </script>
    </body>
    </html>
  `);


app.listen(PORT, () => {
    console.log(`Servidor del FBI en http://localhost:${PORT}`);
});
