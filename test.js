const fs = require('fs');
const puppeteer = require('puppeteer');

async function getAll(page) {
  let data = [];

  //const number = await page.$$eval("#app > article > div.center-wrap > div > div.hidden-md-up > section > div:nth-child(1) > div", (data) => data.length);

  const number = await page.evaluate(()=> {
    const li = document.querySelectorAll('#app > article > div.center-wrap > div > div.hidden-sm-down > table > tbody > tr');
    return li.length;
  })

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

  let title = await page.$("#app > article > div.center-wrap > div > div.hidden-sm-down > table > tbody > tr:nth-child(" + index + ") > td:nth-child(2) > a");
  let place = await page.$("#app > article > div.center-wrap > div > div.hidden-sm-down > table > tbody > tr:nth-child(" + index + ") > td:nth-child(3)");
  let start = await page.$("#app > article > div.center-wrap > div > div.hidden-sm-down > table > tbody > tr:nth-child(" + index + ") > td:nth-child(4)");
  let end = await page.$("#app > article > div.center-wrap > div > div.hidden-sm-down > table > tbody > tr:nth-child(" + index + ") > td:nth-child(5)");
  // nth-child(index)를 이용해 원하는 줄을 선택할 수 있도록 한다.

  data.title = await page.evaluate((data) => {
    return data.textContent;
  }, title);

  data.place = await page.evaluate((data) => {
    return data.textContent;
  }, place);

  data.start = await page.evaluate((data) => {
    return data.textContent.replace(/\n/g, ' ').replace(/ /g, '');
  }, start);

  data.end = await page.evaluate((data) => {
    return data.textContent.replace(/\n/g, ' ').replace(/ /g, '');
  }, end);


  /*await page.click('#app > article > div.center-wrap > div > div.hidden-sm-down > table > tbody > tr:nth-child(' + index + ') > td:nth-child(2) > a');
  await page.waitForTimeout(2000);

  let detail = await page.$("#app > article > div.center-wrap");

  // nth-child(index)를 이용해 원하는 줄을 선택할 수 있도록 한다.

  data.detail = await page.evaluate((data) => {
    return data.innerHTML;
  }, detail);

  await page.goBack();


  await page.waitForSelector('#app > article > div.center-wrap > div > div.hidden-md-up > section > div:nth-child(1) > div:nth-child(1) > a > i', {waitUntil: 'networkidle0'});
  
  */
  
  console.log(data)


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

  await page.setDefaultNavigationTimeout(0);

  const id = "edu_77@navercorp.com";
  const pw = "spdlqj1234!";

  // 로그인 페이지로 이동
  await page.goto('https://auth.ncloud.com/login');
  
  // 아이디 비밀번호 입력
  await page.type('#username',id);
  await page.type('#passwordPlain',pw);

  // 로그인 버튼을 클릭
  await page.click('#loginForm > button');

  await page.waitForTimeout(1000);
  
  let data = [];

  for (let i = 2; i <= 6; i++) {
    let temp = [];

    console.log((i - 1)+'번째 메뉴로 이동')
    await page.goto('https://www.ncloud.com/support/edu?page=1', {
      waitUntil: 'networkidle0',
    });
    await page.click('#app > article > div.center-wrap > div > div.btn-list > div:nth-child(2) > div > a');
    await page.click('ul.dropdown-content > li:nth-child(' + i + ') > label');
      
    let num = await page.evaluate(()=> {
      const li = document.querySelectorAll('div.hidden-sm-down > div > ul > li');
      return li.length - 4;
    })

    console.log(num + '개의 페이지가 있습니다')

    console.log(1 + '번째 페이지')
    temp.push(await getAll(page));

    if(num > 2) {
      num = 1; //일단 한 페이지만 크롤링
    }

    for (let j = 1; j < num; j++) {
      await page.click('#app > article > div.center-wrap > div > div.hidden-sm-down > div > ul > li:nth-last-child(2) > a', {
        waitUntil: 'networkidle0',
      });
      console.log((j + 1) + '번째 페이지')
      temp.push(await getAll(page));
    }

    const temp2 = temp.reduce(function(acc, cur) {
      return [...acc, ...cur]
    })
    
    data.push(temp2);
  }

  console.log(data)

  await browser.close();

  fs.writeFileSync('result_json.txt', JSON.stringify(data), 'utf8');
};

main();
