const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const {arrayFromLength} = require('./helpers/helpers');
const {getPageContent} = require('./helpers/puppeteer');
const {saveData} = require('./helpers/saver');
const {parseInfo} = require('./handlers/itemInfoParser');

const LINK = 'https://www.chaynikam.info/en/';

(async () => {
    try {
        for (const page of arrayFromLength(1)) {
            const url = `${LINK}cpu_table.html`;
            const PageContent = await getPageContent(url);
            
            const $ = cheerio.load(PageContent);
            const urls = [];
            $('#cpus > tr').each((i, el) => {
                page
                const node = $(el).find('.cpus2').text();
                const index = node.indexOf('.html');
                const str = node.slice(9, index);
                
                const itemUrl = `${LINK}${str}.html`;
                urls.push(itemUrl);
            });
            await parseInfo(urls);
        }
        
    } catch (error) {
        console.log(error);
    }
})();