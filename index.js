const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const agents = require('./data/agents');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para la autenticación del agente
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const agent = agents.results.find(agent => agent.email === email && agent.password === password);

    if (!agent) {
        return res.status(401).send('Credenciales incorrectas');
    }

    const token = jwt.sign({ email }, 'secret_key', { expiresIn: '2m' });
    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Servidor del FBI en http://localhost:${PORT}`);
});
