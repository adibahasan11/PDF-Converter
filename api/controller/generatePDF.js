const puppeteer = require('puppeteer')

const generatePDF = async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    
    console.log(req.body)
    
    let url = req.body.url
    let cookie = req.body.cookies
    
    const page = await browser.newPage();
    
    await page.setCookie(...req.body.cookies)
    await page.goto(url, {waitUntil: 'networkidle0'});
    console.log(page.content())
    
    // const pdf = await page.pdf({ format: 'A4' });
    const pdf = await page.pdf({ 
            printBackground: true,
            format: 'Letter'
        }).then(
            console.log("Done")
        );
 
    // await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
}

module.exports = { generatePDF };
