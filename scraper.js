const cheerio = require('cheerio');
const chalk = require('chalk');
const {arrayFromLength, delay} = require('./helpers/helpers');
const {getPageContent} = require('./helpers/puppeteer');
const {saveData} = require('./helpers/saver');

const COMPANY = 'Intel'; //change to 'AMD' or 'Intel'
const LINK = `https://www.techpowerup.com/cpu-specs/?mfgr=${COMPANY}&sort=released&released=20`;

(async () => {
    try {
        console.log(chalk.bgCyan(`Starting to receive data...`));
        const data = [];
        for (const page of arrayFromLength(12)) {

            if (page > 1) {
                console.log(chalk.yellow('Pause for 10 seconds.'));
                await delay(10000).then(() => console.log(chalk.cyan('Сontinue...'))) //Need to bypass captcha entry
            }

            const url = `${LINK}${+page + 9}`;
            const PageContent = await getPageContent(url); //parse all HTML content
            const $ = cheerio.load(PageContent); //Connect cheerio

            //Next comes the selection by selectors of the original html page. 
            //For other sites, you need to select selectors yourself.
            $('#list > table > tbody > tr').each(async (i, el) => {
                const cpu = `${COMPANY} ${$(el).find('td:nth-child(1) > a').text()}`;
                const codename = $(el).find('td:nth-child(2)').text();
                const cores = $(el).find('td:nth-child(3)').text();
                const clock = $(el).find('td:nth-child(4)').text();
                const socket = $(el).find('td:nth-child(5)').text();
                const process = $(el).find('td:nth-child(6)').text();
                const cache_l3 = $(el).find('td:nth-child(7)').text();
                const tdp = $(el).find('td:nth-child(8)').text();
                const released = $(el).find('td:nth-child(9)').text();

                const cpuInfo = {
                    cpu,
                    codename,
                    cores,
                    clock,
                    socket,
                    process,
                    cache_l3,
                    tdp,
                    released
                }

                console.log(chalk.green(`Saving ${cpu}...`));
                data.push(cpuInfo); //Saving to an array
            });
        }
        console.log(chalk.yellow(`Saving data to ${COMPANY}.json file...`));
        await saveData(data, COMPANY); //Creating a json file

        console.log(chalk.bgGreen('The data has been received successfully!'));
    } catch (error) {
        console.log(error);
    }
})();
