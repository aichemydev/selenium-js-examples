import { WebDriver, Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

import { awaitableTimeout, loginToReactBank,
         logoutFromReactBank, findBalanceOnUserPage,
         fillOutHelpForm, landingPageUrl } from '../src/reactbank_good';


///////////
// tests //
///////////

describe('Selenium React Bank Test', function() {

  let timeOutSec: number = 2.0;
  let options = new chrome.Options();
  let driver: WebDriver;

  options.addArguments("--headless");
  options.addArguments("--disable-extensions");

  before('set up the webdriver', async function() {

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()

    return await awaitableTimeout(1000);

  });

  it('should login', async function () {

    await driver.get(landingPageUrl);
    console.log("[RUNNER] doing login");
    return await loginToReactBank(driver, timeOutSec);

  });

  it('should do balance check', async function () {

    // balance check
    console.log("[RUNNER] doing balance check");
    return await findBalanceOnUserPage(driver, timeOutSec);

  });

  it('should fill out the help form', async function () {

    // fill out help form
    console.log("[RUNNER] doing help form");
    return await fillOutHelpForm(driver, timeOutSec);

  });

  // actual test
  it('should log out', async function() {

    console.log("[RUNNER] doing logout");
    await logoutFromReactBank(driver, timeOutSec);
    await driver.close();
    return await driver.quit();

  });

});
