# nodejs-scraper
Simple scraper build with Puppeteer &amp; Cheerio

In this configuration, the scraper collects data from a page that contains a list of processors. The received data is stored in json files.

## Usage

Install packages
```sh
npm install
```

Run Scraper
```sh
npm start
```

## Modify & Edit
If you want to customize Scraper for a specific site, then you need to change the links and selectors for the html page in the file <i>scraper.js</i>

This is really not difficult to figure out, but if you have any difficulties, then you can refer to the documentation of [Puppeteer](https://pptr.dev/) or [Cheerio](https://cheerio.js.org/).
