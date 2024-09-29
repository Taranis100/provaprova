import express from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { renderModule } from '@angular/platform-server';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { AppServerModule } from './src/main.server'; // Assicurati che il percorso sia corretto

const app = express();
const port = process.env['PORT'] || 3000;

app.use(express.json()); // Abilita il parsing del JSON

// Endpoint di login
const admins = [
  { id: 1, username: 'admin', password: 'admin123' },
  // Aggiungi altri admin se necessario
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const admin = admins.find(a => a.username === username && a.password === password);

  if (admin) {
    res.json(admin);
  } else {
    res.status(401).json({ message: 'Credenziali errate' });
  }
});

// Configurazione Angular Universal
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

// Serve file statici dalla cartella /browser
app.get('**', express.static(browserDistFolder, {
  maxAge: '1y',
  index: 'index.html',
}));

// Tutte le rotte regolari utilizzano il motore Angular
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  renderModule(AppServerModule, {
    document: indexHtml,
    url: `${protocol}://${headers.host}${originalUrl}`,
    extraProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
  })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
