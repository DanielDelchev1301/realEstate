//used to fetch all pages and save them to the output folder
import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import crawler from "./crawler.js";

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saveUrlToFile = async (html, pathName, output) => {
  
    const path = pathName == "/"
                ? `${output}/index.html`
                : `${output}${pathName}.html`
    ;

    console.log(path);
    try {
        await writeFile(path, html); 
    } catch (error) {
        console.error(error); 
    }
};

async function fetchAllPages() {
    const domain = "http://localhost:3000";
    const pages = [
        "/",
        "/sales",
        "/rentals",
        "/favourites",
        "/freeEvaluation",
        "/reachUs",
    ];
    console.log(pages);
    const browser = await puppeteer.launch({headless: 'new'});
    console.log(browser);
    for(let i = 0; i < pages.length; i++) {
        const html = await crawler({
            url: `${domain}${pages[i]}`,
            browser
        });
        saveUrlToFile(html, pages[i], __dirname);
    }
    console.log('before close');
    await browser.close();
    return true;
};

export default fetchAllPages;