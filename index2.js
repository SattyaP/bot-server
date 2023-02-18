const puppeteer = require('puppeteer');
require('dotenv').config();

const production = process.env.PRODUCTION === 'true' ? true : false;
const timeout = process.env.TIMEOUT || 2000;

(async () => {

    const options = production ? {
        executablePath: '/usr/bin/chromium-browser',
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        acceptInsecureCerts: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
        ],
    } : {};

    const browser = await puppeteer.launch({
        ...options,
        headless: false
    })

    const page = await browser.newPage();

    await page.goto('https://aternos.org/go/', {
        waitUntil: 'networkidle2'
    })
    await page.waitForTimeout(timeout);
    await page.type('#user', 'wohaima')
    await page.type('#password', '12345678')
    await page.waitForTimeout(timeout);
    const login = await page.$("#login")
    await login.click()

})();