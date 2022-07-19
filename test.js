const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getAll(page) {
  let data = [];

  const number = await page.$$eval("#app > article > div.center-wrap > div > div.hidden-md-up > section > div:nth-child(1) > div", (data) => data.length);

  console.log(number);

  // tr태그의 개수를 세어서 줄의 개수를 얻은 후에
  for (let index = 0; index < number; index++) {
      data.push(await getOne(page, index + 1));
      // 각 줄의 정보를 얻어서 배열에 Push
  }

  return Promise.resolve(data);
}

async function getOne(page, index) {

    let data = {};

    let temp = await page.$("#app > article > div.center-wrap > div > div.hidden-md-up > section > div:nth-child(1) > div:nth-child(" + index + ") > a");

    // nth-child(index)를 이용해 원하는 줄을 선택할 수 있도록 한다.

    data.name = await page.evaluate((data) => {
        return data.textContent;
    }, temp);
    data.link = await page.evaluate((data) => {
        return data.href;
    }, temp);

    /*data.programPeriod = await page.$eval("#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" + index + ") > td:nth-child(5)", (data) => data.textContent);

    data.applyingPeriod = await page.$eval("#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" + index + ") > td:nth-child(6)", (data) => data.textContent);

    data.count = await page.$eval("#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" + index + ") > td:nth-child(7)", (data) => data.textContent);

    data.state = await page.$eval("#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" + index + ") > td:nth-child(8)", (data) => data.textContent);
*/
    return Promise.resolve(data);
}

async function main() {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({
      width: 1920,
      height: 1080
  });

  let data = [];

  for (let index = 1; index <= 3; index++) {
      await page.goto('https://www.ncloud.com/support/edu?page=' + index, {
        waitUntil: 'networkidle0',
      });
      data.push(await getAll(page));
  }
  console.log(data);

  await browser.close();
};

main();

/*async function main() {

  // 헤드리스 브라우저 실행
  const browser = await puppeteer.launch({
    headless : false
  });

  // 브라우저에 새 페이지 생성
  const page = await browser.newPage();

  const pageUrl = 'https://www.ncloud.com/support/edu?page=' + index;

  // 모든 네트워크 연결이 500ms 이상 유휴 상태가 될 때까지 기다림
  await page.goto(pageUrl, {
    waitUntil: 'networkidle0',
  });

  
  // 특정 셀렉터에 대해 제공된 함수를 수행한 값 반환
  let data = [];

  const number = await page.$$eval("#app > article > div.center-wrap > div > div.hidden-md-up > section > div:nth-child(1) > div", (data) => data.length);

  console.log(number);

  for (let index = 0; index < number; index++) {
    data.push(await getOne(page, index + 1));
    // 각 줄의 정보를 얻어서 배열에 Push
  }

  const content = await page.$eval(
    '#app > article > div.center-wrap > div > div.hidden-md-up > section > div:nth-child(1) > div:nth-child(1) > a',
    element => {
      return element.href;
    }
  );


  console.log(content);

   // 작업이 완료되면 브라우저 종료
  await browser.close();
  
}

*/