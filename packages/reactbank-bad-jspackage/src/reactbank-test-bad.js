const webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');


///////////////////////
// utility functions //
///////////////////////

async function awaitableTimeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


////////////////////
// test constants //
////////////////////

const landingPageUrl = "https://demo2.testgold.dev";
const landingLoginButtonXPath = "//a[@class='btn btn-primary btn-lg' and " +
      "contains(text(),'Click here to log in')]";

const loginEmailAddr = "email@example.com";
const loginPassword = "admin123";

const loginEmailXPath = "//input[@name='email']";
const loginPasswordXPath = "//input[@name='password']";
const loginSubmitXPath = "//button[@class='btn btn-primary' and " +
      "contains(text(),'Log in now')]";

const logoutLinkXPath = "//a[@href='/logout' and " +
      "contains(text(),'Logout')]";

const balanceLinkXPath = "//a//span[contains(text(),'Profile')]";
const balanceItemXPath = "//span[.='Balance']";

const helpLinkXPath = "//a//span[contains(text(),'Help')]";
const helpNameXPath = "//input[@id='name']";
const helpEmailXPath = "//input[@id='email']";
const helpHomePhoneXPath = "//*[@id='home_phone1234']";
const helpOfficePhoneXPath = "//*[@name='office_phone1234']";
const helpMobilePhoneXPath = "//*[@class='mobilePhoneClass1234']";
const helpSubjectXPath = "//select[@id='subject']";
const helpMessageXPath = "//textarea[@id='message']";
const helpSendButtonXPath = "//button[@type='submit']";

const helpFormItems = {
  name: "Node User",
  email: "node@test.org",
  homePhone: "1-555-650-5555",
  officePhone: "1-555-440-5555",
  mobilePhone: "1-555-240-5555",
  message: "I'm a node user!"
};


////////////////////
// test functions //
////////////////////

// this logs into the ReactBank website and returns the driver in the new state
async function loginToReactBank(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // click on the login button
  console.log("[TEST] finding login link");
  let loginButton =
      await driver.findElement(By.xpath(landingLoginButtonXPath));
  console.log("[TEST] clicking login link");
  await loginButton.click();

  await awaitableTimeout(timeoutSec*1000);

  // fill in the email addr and password
  console.log("[TEST] finding login email box and filling it in");
  let emailBox = await driver.findElement(By.xpath(loginEmailXPath));
  await emailBox.sendKeys(loginEmailAddr);
  console.log("[TEST] finding login password box and filling it in");
  let passBox = await driver.findElement(By.xpath(loginPasswordXPath));
  await passBox.sendKeys(loginPassword);

  await awaitableTimeout(timeoutSec*1000);

  // find the submit button
  console.log("[TEST] finding login submit button");
  let loginSubmit = await driver.findElement(By.xpath(loginSubmitXPath));

  // click on it
  console.log("[TEST] clicking login submit button");
  await loginSubmit.click();

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// this logs out from the ReactBank website and returns the driver in the new
// state
async function logoutFromReactBank(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // find the logout button
  console.log("[TEST] finding logout link");
  let logoutLink = await driver.findElement(By.xpath(logoutLinkXPath));

  console.log("[TEST] clicking logout link");
  await logoutLink.click();

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// tries to find and click on the balance item on the user page and get the
// text of the balance item
async function findBalanceOnUserPage(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // find the balance link and click on it
  console.log("[TEST] finding Balance link");
  let balanceLink = await driver.findElement(By.xpath(balanceLinkXPath));
  console.log("[TEST] clicking Balance link");
  await balanceLink.click();

  await awaitableTimeout(timeoutSec*1000);

  // get the balance item
  console.log("[TEST] finding Balance item");
  let balanceItem = await driver.findElement(By.xpath(balanceItemXPath));
  let balanceText = await balanceItem.getText();
  console.log(`[TEST] Balance item text is: ${balanceText}`);

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// this tries to find the help page, then fill in the help form, then submit it
async function fillOutHelpForm(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // find the help-form link and click on it
  console.log("[TEST] finding help page link");
  let helpFormLink = await driver.findElement(By.xpath(helpLinkXPath));
  console.log("[TEST] clicking on help page link");
  await helpFormLink.click();

  await awaitableTimeout(timeoutSec*1000);

  //
  // get the help form items and fill them in
  //

  console.log("[TEST] finding help form name item");
  let helpName = await driver.findElement(By.xpath(helpNameXPath));
  await awaitableTimeout(1000);
  console.log("[TEST] filling in help form name item");
  await helpName.sendKeys(helpFormItems.name);

  console.log("[TEST] finding help form email item");
  let helpEmail = await driver.findElement(By.xpath(helpEmailXPath));
  await awaitableTimeout(1000);
  console.log("[TEST] filling in help form email item");
  await helpEmail.sendKeys(helpFormItems.email);

  console.log("[TEST] finding help form home-phone item");
  let helpHomePhone = await driver.findElement(By.xpath(helpHomePhoneXPath));
  await awaitableTimeout(1000);
  console.log("[TEST] filling in help form home-phone item");
  await helpHomePhone.sendKeys(helpFormItems.homePhone);

  console.log("[TEST] finding help form office-phone item");
  let helpOfficePhone =
      await driver.findElement(By.xpath(helpOfficePhoneXPath));
  await awaitableTimeout(1000);
  console.log("[TEST] filling in help form office-phone item");
  await helpOfficePhone.sendKeys(helpFormItems.officePhone);

  console.log("[TEST] finding help form mobile-phone item");
  let helpMobilePhone =
      await driver.findElement(By.xpath(helpMobilePhoneXPath));
  await awaitableTimeout(1000);
  console.log("[TEST] filling in help form mobile-form item");
  await helpMobilePhone.sendKeys(helpFormItems.mobilePhone);

  console.log("[TEST] finding help form subject item");
  let helpSubject = await driver.findElement(By.xpath(helpSubjectXPath));
  let helpSubjectTag = await helpSubject.getTagName();
  console.log(`[TEST] help form subject tag is ${helpSubjectTag}`);
  await awaitableTimeout(1000);

  console.log("[TEST] finding help form message item");
  let helpMessage = await driver.findElement(By.xpath(helpMessageXPath));
  await awaitableTimeout(1000);
  console.log("[TEST] filling in help form message item");
  await helpMessage.sendKeys(helpFormItems.message);

  console.log("[TEST] finding help form submit button");
  let helpSendButton =
      await driver.findElement(By.xpath(helpSendButtonXPath));
  console.log("[TEST] clicking on help form submit button");
  await helpSendButton.click();

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}


/////////////////
// test runner //
/////////////////

(async function main(timeoutSec) {

  let exitCode = 0;
  let driver;

  try {

    // get WAL_SERVER_AUTHTOKEN and WAL_SERVER_HOST
    let walServerAuthToken = process.env.WAL_SERVER_AUTHTOKEN;
    if (walServerAuthToken === undefined) {
      console.error("[RUNNER] need WAL_SERVER_AUTHTOKEN in environment");
      process.exit(1);
    }
    let walServerHost = process.env.WAL_SERVER_HOST;
    if (walServerHost === undefined) {
      console.error("[RUNNER] need WAL_SERVER_HOST in environment");
      process.exit(1);
    }

    let options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-extensions");

    driver = await new webdriver.Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();

    // get to the landing page
    await driver.get(landingPageUrl);

    //
    // login
    //
    console.log("[RUNNER] doing login");
    await loginToReactBank(driver, timeoutSec);
    console.log("[RUNNER] login done");

    //
    // other tests go here
    //

    // balance check
    console.log("[RUNNER] doing balance check");
    await findBalanceOnUserPage(driver, timeoutSec);
    console.log("[RUNNER] balance check done");

    // help form fill-in
    console.log("[RUNNER] doing help form");
    await fillOutHelpForm(driver, timeoutSec);
    console.log("[RUNNER] help form done");

    //
    // logout
    //
    console.log("[RUNNER] doing logout");
    await logoutFromReactBank(driver, timeoutSec);
    console.log("[RUNNER] logout done");

  } catch (err) {

    console.log(err);
    exitCode = 1;

  } finally {

    console.log('[RUNNER] waiting to close the window');
    await awaitableTimeout(2500);
    await driver.close();
    console.log('[RUNNER] window close done. Waiting for driver quit');
    await driver.quit();
    console.log('[RUNNER] driver quit done');

  }

  console.log(`[RUNNER] test run complete. exit code: ${exitCode}`);
  process.exit(exitCode);

})(2.0);
