import express from 'express';
import path from 'path';
import ansi from 'ansi-colors';
import { fileURLToPath } from 'url';
import usersRouter from './users/users.js';

const app = express();
const port = 5000; // variável de ambiente

// Configuração para obter __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ler o body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

const basePath = path.join(__dirname, 'templates');

app.use('/users', usersRouter); // Middleware para todas as rotas /users

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/server.html`);
});

// pagina 404
app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`);

})

app.listen(port, () => {
    console.log(ansi.bgWhiteBright.blue(`App rodando na porta ${port}!`));
});