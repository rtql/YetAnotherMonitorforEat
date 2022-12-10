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

  for (const el of allLinks) {
    await page.goto(el);
    await page.waitForSelector('div[id=ngb-tab-2-panel]');
    console.log(typeof(page));
    const tab = await page.$eval('div[id=ngb-tab-2-panel]', e => e.innerHTML);
    console.log(typeof(tab));
    const content = await tab.$$eval('td.text-right.ng-star-inserted > span', options => {
      return options.map(option => option.innerText.replace(' ', ""));
    });
    console.log(content, typeof(content));
    break 
  }




  await browser.close();
})();