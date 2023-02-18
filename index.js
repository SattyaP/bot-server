require('dotenv').config();

const puppeteer = require('puppeteer');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const headless = process.env.HEADLESS === 'true' ? true : false;
const baseUrl = process.env.BASE_URL;
const timeout = process.env.TIMEOUT || 2000;
const production = process.env.PRODUCTION === 'true' ? true : false;

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
    headless,
  });

  const mainPage = await browser.newPage()


  console.log('bukak browser sabar njeng')

  // await mainPage.goto(baseUrl)
  // await mainPage.waitForTimeout(timeout)
  // await mainPage.screenshot({path : , fullPage : true})
  // await mainPage.pdf({path : 'test.pdf'})
  // await mainPage.waitForTimeout(timeout)
  // await browser.close()

  const login = async (username, password) => {
    console.log('sek login ngentod');
    try {
      await mainPage.goto(baseUrl)
      await mainPage.waitForTimeout(timeout)
      // const user = await mainPage.$('#user')
      await mainPage.type("#user", username)
      // const pw = await mainPage.$('#password')
      // pw.type(password)
    } catch (error) {
      console.log(error);
      await browser.close();
    }
  }

  await login();


})();