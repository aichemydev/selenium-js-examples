const webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');


async function awaitableTimeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

////////////////////
// test constants //
////////////////////

const LANDING_PAGE_URL = "https://www.amazon.com/";

const CART_XPATH = "//a[@id='nav-cart']";  // we will use this XPath for other websites like Target


//////////////////// functions ////////////////////


async function go_to_cart(driver, timeoutSec) {
  // This goes straight to cart.

  await awaitableTimeout(timeoutSec*1000);

  console.log("[TEST] finding the Cart icon at the top right");
  let cart_button = await driver.findElement(By.xpath(CART_XPATH));
  let old_id = await cart_button.getAttribute("id");

  // Change the ID of the cart item web element

  console.log("[TEST] Current ID of the cart item web element: " + old_id);

  await awaitableTimeout(timeoutSec*1000);
  const new_id = "new-cart-id";
  console.log("[TEST] Changing ID of the cart item web element to: " + new_id);
  driver.executeScript("arguments[0].setAttribute('id', arguments[1])", cart_button, new_id);

  await awaitableTimeout(timeoutSec*1000);
  let new_cart_id = await cart_button.getAttribute('id');
  console.log("[TEST] ID of the cart item web element has been succesfully changed to: " + new_cart_id);

  // Go to the cart using the old XPath. It should fail now.
  await awaitableTimeout(timeoutSec*1000);

  console.log("[TEST] finding the Cart icon at the top right");
  let cart_button2 = await driver.findElement(By.xpath(CART_XPATH));
  console.log("[TEST] clicking the Cart icon at the top right");
  await cart_button2.click();
}

////////////////////////// TEST //////////////////////////

(async function main(timeout_sec) {
  // This runs the test.

  let exitCode = 0;
  let driver;

  try {
    let options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-extensions");

    driver = await new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    await driver.manage().window().setRect({width: 1920, height: 1080});

    /// Get to the landing page ///
    await driver.get(LANDING_PAGE_URL);

    /// Go to cart ///
    console.log("[RUNNER] going straight to cart");
    await go_to_cart(driver, timeout_sec);
    console.log("[RUNNER] going straight to cart");
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
