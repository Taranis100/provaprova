// src/main.server.ts
import { AppServerModule } from './app/app.module.server'; // Percorso corretto
import { enableProdMode } from '@angular/core';
import { renderModule } from '@angular/platform-server';
import { join } from 'path';
import { readFileSync } from 'fs';

enableProdMode();

const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist'); // Cartella di distribuzione

const indexHtml = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

// Assicurati di esportare AppServerModule
export { AppServerModule };

// Rendi il modulo server avviabile
export function render(req: any, res: any) {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;

  renderModule(AppServerModule, {
    document: indexHtml,
    url,
  })
    .then(html => {
      res.send(html);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Errore interno del server');
    });
}
