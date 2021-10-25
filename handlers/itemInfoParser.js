const cheerio = require('cheerio');
const {getPageContent} = require('../helpers/puppeteer');
const {saveData} = require('../helpers/saver');

async function parseInfo(urls) {
    try {
        for (const url of urls) {
            console.log(`Parse info from ${url}`);
            const itemContent = await getPageContent(url);
            const $ = cheerio.load(itemContent);

            const cpu_name = $('#tdmodel').text();
            const released = $('tbody > tr:nth-child(2) > td.tdc2').text();
            const segment = $('tbody > tr:nth-child(3) > td.tdc2').text();
            const socket = $('tbody > tr:nth-child(4) > td.tdc2').text();
            const cores = $('tbody > tr:nth-child(6) > td.tdc2').text();
            const threads = $('tbody > tr:nth-child(7) > td.tdc2').text();
            const frequency = $('tbody > tr:nth-child(8) > td.tdc2').text();
            const turbo = $('tbody > tr:nth-child(9) > td.tdc2').text();
            const lithography = $('tbody > tr:nth-child(12) > td.tdc2').text();
            const tdp = $('tbody > tr:nth-child(14) > td.tdc2').text();

            // console.log({
            //     cpu_name, 
            //     released, 
            //     segment, 
            //     socket, 
            //     cores, 
            //     threads, 
            //     frequency, 
            //     turbo, 
            //     lithography, 
            //     tdp});
            await saveData({
                cpu_name, 
                released, 
                segment, 
                socket, 
                cores, 
                threads, 
                frequency, 
                turbo, 
                lithography, 
                tdp});
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    parseInfo,
}