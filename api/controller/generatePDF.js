const puppeteer = require('puppeteer')

const generatePDF = async (req, res) => {
    console.log(req.body)

    let url = req.body.url
    let cookie = req.body.cookies

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.setCookie(cookie)
    
    const pdf = await page.pdf({ format: 'A4' });
 
    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
}

module.exports = { generatePDF };