const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://tka.nutridata.ee/ru/?query=&groups=&component=39&exclude=false&type=all&starts=true');
  await page.waitForSelector('span.mr-2');
  const allLinks = await page.$$eval('td > a.recipe-btn', options => {
    return options.map(option => 'https://tka.nutridata.ee' + option.getAttribute('href'));
  });
  console.log(allLinks);
  await browser.close();
})();