import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { subgenres } from '../src/data/subgenres.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
const { render } = await import(toAbsolute('dist/server/entry-server.js'));

// Determine routes to pre-render
const routesToPrerender = ['/'];
for (const genre of subgenres) {
  routesToPrerender.push(`/genre/${genre.id}`);
}

(async () => {
  for (const url of routesToPrerender) {
    const helmetContext = {};
    const { html } = render(url, helmetContext);
    
    // Extract Helmet tags
    const { helmet } = helmetContext;
    let headTags = '';
    if (helmet) {
      headTags = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `;
    }

    const appHtml = template
      .replace(`<!--app-head-->`, headTags)
      .replace(`<!--app-html-->`, html);

    const filePath = `dist/client${url === '/' ? '/index.html' : `${url}/index.html`}`;
    const dir = path.dirname(toAbsolute(filePath));
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(toAbsolute(filePath), appHtml);
    console.log('Pre-rendered:', filePath);
  }

  // Ensure output structure matches dist
  fs.cpSync(toAbsolute('dist/client'), toAbsolute('dist'), { recursive: true });
  fs.rmSync(toAbsolute('dist/client'), { recursive: true, force: true });
  fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true });
  
  console.log('Prerendering completed.');
})();
