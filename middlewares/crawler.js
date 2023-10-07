async function crawler({ url, browser }) {
    let page = null;
    let html = false;

    try {
        page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle0" });
        html = await page.content();
    } catch (e) {
        debug.warn(`Not able to fetch ${url}`);
    } finally {
        if (page) {
            await page.close();
        }
        return html;
    }
}

export default crawler;