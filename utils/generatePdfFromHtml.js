const puppeteer = require('puppeteer');

// Singleton browser instance
let browserPromise = null;
async function getBrowser() {
    if (!browserPromise) {
        browserPromise = puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    }
    return browserPromise;
}

// Generates a PDF from HTML string and returns the PDF buffer
async function generatePdfFromHtml(html) {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await page.close(); // Only close the page, not the browser
    return pdfBuffer;
}

module.exports = generatePdfFromHtml;
