import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  headless: true,
});

async function shot(url, file, opts = {}) {
  const page = await browser.newPage();
  const { width = 1440, height = 900, dpr = 2 } = opts;
  await page.setViewport({ width, height, deviceScaleFactor: dpr });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(__dirname, 'public', file), type: 'png' });
  await page.close();
  console.log(`✓ ${file}`);
}

await shot('https://www.hitechprinters.com.pk/', 'home-desktop.png', { width: 1440, height: 900 });
await shot('https://www.hitechprinters.com.pk/', 'home-mobile.png', { width: 390, height: 844, dpr: 3 });
await shot('https://www.hitechprinters.com.pk/calculator', 'calculator-desktop.png', { width: 1440, height: 900 });
await shot('https://www.hitechprinters.com.pk/calculator', 'calculator-mobile.png', { width: 390, height: 844, dpr: 3 });

await browser.close();
console.log('All screenshots captured.');
