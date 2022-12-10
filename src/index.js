const puppeteer = require("puppeteer");
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://tka.nutridata.ee/ru/?query=&groups=&component=39&exclude=false&type=all&starts=true');
  await page.waitForSelector('span.mr-2');

  const allLinks = await page.$$eval('td > a.recipe-btn', options => {
    return options.map(option => 'https://tka.nutridata.ee' + option.getAttribute('href'));
  });

  for (const el of allLinks) {
    await page.goto(el, {waitUntil: 'networkidle2'});
    // await page.waitForSelector('div[id=ngb-tab-2-panel]');
    const content = await (await page.$eval('div[id=ngb-tab-2-panel]', e => e.innerHTML));
    const $ = cheerio.load(content)
    const values = []
    $('td.text-right.ng-star-inserted > span').each(function (i, header) {
      const text = $(header).text().replace(/[^\d,]/g, '');
      values.push(parseFloat(text.replace(',', '.')));
    });
    console.log(values);
    break
  }




  await browser.close();
})();