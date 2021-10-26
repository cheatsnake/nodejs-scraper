const puppeteer = require('puppeteer');

const LAUNCH_OPTIONS = {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
      ]
}

const  PAGE_OPTIONS = {
    networkIdle2Timeout: 5000,
    waitUntil: 'networkidle2',
    timeout: 3000000
}


const getPageContent = async (url) => {
    try {
        const browser = await puppeteer.launch(LAUNCH_OPTIONS);
        const page = await browser.newPage(PAGE_OPTIONS);
        await page.goto(url, PAGE_OPTIONS);
        const content = await page.content();
        browser.close();
        return content;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPageContent,
}