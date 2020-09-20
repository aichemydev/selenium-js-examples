const webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');

// dependency NOT in package.json but as separate JS package file
const winston = require('winston');


////////////
// logger //
////////////

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
      )
    })
  ]
});


///////////////////////
// utility functions //
///////////////////////

async function awaitableTimeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


////////////////////
// test constants //
////////////////////

const landingPageUrl = process.env.BAD_REACTBANK_LANDING_PAGE_URL;
const landingLoginButtonXPath = "//a[@class='btn btn-primary btn-lg' and " +
      "contains(text(),'Click here to log in')]";

const loginEmailAddr = process.env.REACTBANK_USERNAME;
const loginPassword = process.env.REACTBANK_PASSWORD;

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
  name: process.env.REACTBANK_COMPLAINT_FULLNAME,
  email: process.env.REACTBANK_COMPLAINT_EMAIL,
  homePhone: "1-555-650-5555",
  officePhone: "1-555-440-5555",
  mobilePhone: "1-555-240-5555",
  message: process.env.REACTBANK_COMPLAINT_MESSAGE
};


////////////////////
// test functions //
////////////////////

// this logs into the ReactBank website and returns the driver in the new state
async function loginToReactBank(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // click on the login button
  logger.info("[TEST] finding login link");
  let loginButton =
      await driver.findElement(By.xpath(landingLoginButtonXPath));
  console.log("[TEST] clicking login link");
  await loginButton.click();

  await awaitableTimeout(timeoutSec*1000);

  // fill in the email addr and password
  logger.info("[TEST] finding login email box and filling it in");
  let emailBox = await driver.findElement(By.xpath(loginEmailXPath));
  await emailBox.sendKeys(loginEmailAddr);
  logger.info("[TEST] finding login password box and filling it in");
  let passBox = await driver.findElement(By.xpath(loginPasswordXPath));
  await passBox.sendKeys(loginPassword);

  await awaitableTimeout(timeoutSec*1000);

  // find the submit button
  logger.info("[TEST] finding login submit button");
  let loginSubmit = await driver.findElement(By.xpath(loginSubmitXPath));

  // click on it
  logger.info("[TEST] clicking login submit button");
  await loginSubmit.click();

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// this logs out from the ReactBank website and returns the driver in the new
// state
async function logoutFromReactBank(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // find the logout button
  logger.info("[TEST] finding logout link");
  let logoutLink = await driver.findElement(By.xpath(logoutLinkXPath));

  logger.info("[TEST] clicking logout link");
  await logoutLink.click();

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// tries to find and click on the balance item on the user page and get the
// text of the balance item
async function findBalanceOnUserPage(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // find the balance link and click on it
  logger.info("[TEST] finding Balance link");
  let balanceLink = await driver.findElement(By.xpath(balanceLinkXPath));
  logger.info("[TEST] clicking Balance link");
  await balanceLink.click();

  await awaitableTimeout(timeoutSec*1000);

  // get the balance item
  logger.info("[TEST] finding Balance item");
  let balanceItem = await driver.findElement(By.xpath(balanceItemXPath));
  let balanceText = await balanceItem.getText();
  logger.info(`[TEST] Balance item text is: ${balanceText}`);

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// this tries to find the help page, then fill in the help form, then submit it
async function fillOutHelpForm(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // find the help-form link and click on it
  logger.info("[TEST] finding help page link");
  let helpFormLink = await driver.findElement(By.xpath(helpLinkXPath));
  logger.info("[TEST] clicking on help page link");
  await helpFormLink.click();

  await awaitableTimeout(timeoutSec*1000);

  //
  // get the help form items and fill them in
  //

  logger.info("[TEST] finding help form name item");
  let helpName = await driver.findElement(By.xpath(helpNameXPath));
  await awaitableTimeout(1000);
  logger.info("[TEST] filling in help form name item");
  await helpName.sendKeys(helpFormItems.name);

  logger.info("[TEST] finding help form email item");
  let helpEmail = await driver.findElement(By.xpath(helpEmailXPath));
  await awaitableTimeout(1000);
  logger.info("[TEST] filling in help form email item");
  await helpEmail.sendKeys(helpFormItems.email);

  logger.info("[TEST] finding help form home-phone item");
  let helpHomePhone = await driver.findElement(By.xpath(helpHomePhoneXPath));
  await awaitableTimeout(1000);
  logger.info("[TEST] filling in help form home-phone item");
  await helpHomePhone.sendKeys(helpFormItems.homePhone);

  logger.info("[TEST] finding help form office-phone item");
  let helpOfficePhone =
      await driver.findElement(By.xpath(helpOfficePhoneXPath));
  await awaitableTimeout(1000);
  logger.info("[TEST] filling in help form office-phone item");
  await helpOfficePhone.sendKeys(helpFormItems.officePhone);

  logger.info("[TEST] finding help form mobile-phone item");
  let helpMobilePhone =
      await driver.findElement(By.xpath(helpMobilePhoneXPath));
  await awaitableTimeout(1000);
  logger.info("[TEST] filling in help form mobile-form item");
  await helpMobilePhone.sendKeys(helpFormItems.mobilePhone);

  logger.info("[TEST] finding help form subject item");
  let helpSubject = await driver.findElement(By.xpath(helpSubjectXPath));
  let helpSubjectTag = await helpSubject.getTagName();
  logger.info(`[TEST] help form subject tag is ${helpSubjectTag}`);
  await awaitableTimeout(1000);

  logger.info("[TEST] finding help form message item");
  let helpMessage = await driver.findElement(By.xpath(helpMessageXPath));
  await awaitableTimeout(1000);
  logger.info("[TEST] filling in help form message item");
  await helpMessage.sendKeys(helpFormItems.message);

  logger.info("[TEST] finding help form submit button");
  let helpSendButton =
      await driver.findElement(By.xpath(helpSendButtonXPath));
  logger.info("[TEST] clicking on help form submit button");
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
    logger.info("[RUNNER] doing login");
    await loginToReactBank(driver, timeoutSec);
    logger.info("[RUNNER] login done");

    //
    // other tests go here
    //

    // balance check
    logger.info("[RUNNER] doing balance check");
    await findBalanceOnUserPage(driver, timeoutSec);
    logger.info("[RUNNER] balance check done");

    // help form fill-in
    logger.info("[RUNNER] doing help form");
    await fillOutHelpForm(driver, timeoutSec);
    logger.info("[RUNNER] help form done");

    //
    // logout
    //
    logger.info("[RUNNER] doing logout");
    await logoutFromReactBank(driver, timeoutSec);
    logger.info("[RUNNER] logout done");

  } catch (err) {

    logger.error(err);
    exitCode = 1;

  } finally {

    logger.warn('[RUNNER] waiting to close the window');
    await awaitableTimeout(2500);
    await driver.close();
    logger.warn('[RUNNER] window close done. Waiting for driver quit');
    await driver.quit();
    logger.warn('[RUNNER] driver quit done');

  }

  logger.info(`[RUNNER] test run complete. exit code: ${exitCode}`);
  process.exit(exitCode);

})(2.0);
