import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Low, JSONFile } from 'lowdb';

import { readFileSync } from 'fs';
import nunjucks from 'nunjucks';


const DB_NAME = 'db.json';

(async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const dbfile = join(__dirname, DB_NAME);
    const db = new Low(new JSONFile(dbfile));

    const style = readFileSync('style.css');
    const script = readFileSync('script.js');

    await db.read();
    db.data ||= {pages: []};

    console.log(nunjucks.render('./render.njk', {
        script: script,
        style: style,
        gua: db.data.gua,
        appendix: db.data.appendix,
        json: JSON.stringify(db.data)
      }
    ));
  })()
