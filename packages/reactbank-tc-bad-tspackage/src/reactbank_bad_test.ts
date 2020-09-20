import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

import { awaitableTimeout, loginToReactBank,
         logoutFromReactBank, findBalanceOnUserPage,
         fillOutHelpForm, landingPageUrl } from './reactbank_bad';


/////////////////
// test runner //
/////////////////

(async function main(timeoutSec: number) {

  let exitCode: number = 0;
  let options = new chrome.Options();
  options.addArguments("--headless");
  options.addArguments("--disable-extensions");

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {

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
