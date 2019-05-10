const puppeteer = require('puppeteer')
const fs = require('fs')


async function printPDF() {
    const result = fs.readFileSync('cleaned_urls.txt').toString().split('\n')

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    for (let i=0; i < result.length; i++) {
        await page.goto(result[i], {waitUntil: 'networkidle0'})
        var when = await page.evaluate(() => {
            var time = document.querySelector('time[datetime]')
            if (time !== null) {
                return time.dateTime
            }
            return null
        })
        if (when === null) {
            console.log(`no time for ${result[i]}, skipping`)
            continue
        }
        var fname = when.replace(/[^a-z0-9]/gi, '_');
        await page.addStyleTag({ content: '.metabar,.u-fixed,footer { display: none}' })
        await page.pdf({ format: 'A4', path: `pdfs/${fname}.pdf`})
        console.log('write', i, fname)
        fs.writeFileSync(`html/${fname}.html`, await page.content())
    }

    await browser.close();
}


printPDF()