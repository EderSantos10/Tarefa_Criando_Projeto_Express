import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ansi from 'ansi-colors';

// Configuração para obter __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const basePath = path.join(__dirname, 'templates');

let userInfo = {};

router.get('/add', (req, res) => {
    const returnUrl = req.query.returnUrl || '/';
    res.sendFile(`${basePath}/userform.html`, { headers: { 'X-Return-Url': returnUrl } });
});

router.post('/save', (req, res) => {
    const { username, password, classe } = req.body;

    if (classe) {
        console.log(ansi.bgBlackBright.green(`O nome do usuário é ${userInfo.username}, sua senha é ${userInfo.password}, e ele escolheu a classe ${classe}`));
        const returnUrl = req.body.returnUrl || '/';
        res.redirect(returnUrl); // Redirecionar para a página de origem
    } else {
        userInfo = { username, password };
        console.log(ansi.bgBlackBright.green(`O nome do usuário é ${username} e sua senha é ${password}`));
        res.redirect(`/users/class?username=${username}&password=${password}&returnUrl=${req.body.returnUrl}`);
    }
});

router.get('/class', (req, res) => {
    res.sendFile(`${basePath}/userclass.html`);
});

export default router;
