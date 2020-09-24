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

const ITEM_TO_ORDER = "Algorithms Karumanchi";
const ISBN_NUMBER = '9780615459813';

const LANDING_PAGE_URL = "https://www.walmart.com/";

const LANDING_PAGE_SEARCH_FIELD_XPATH = "//input[@id='global-search-input']";
const LANDING_PAGE_SEARCH_BUTTON_XPATH = "//button[@id='global-search-submit']//img";

// Relative paths were generated using ChroPath extension //

const SEARCH_PAGE_ITEM_XPATH = "//ul[contains(li, '9780615459813')]/ancestor::*[6]//img";  // manually-built XPath, more intuitive than the old one by ChroPath
const ADD_TO_CART_XPATH = "//span[@class='spin-button-children']";
const CHECK_OUT_XPATH = "//div[@class='cart-pos-main-actions s-margin-top']//div[@class='new-ny-styling cart-pos-proceed-to-checkout']//div//button[@class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']";
const CHECK_OUT_CONTINUE_WITHOUT_ACCOUNT_XPATH = "//span[contains(text(),'Continue without account')]";
const CHECKOUT_DELIVERY_CONTINUE_XPATH = "//span[contains(text(),'Continue')]";

const CART_XPATH = "//a[@id='hf-cart']";  // we will use this XPath for other websites like Target


//////////////////// functions ////////////////////

async function search_item(driver, timeoutSec) {
  // This searches an item on the Walmart landing page.

  await awaitableTimeout(timeoutSec*5000);
  console.log("[TEST] finding search field");

  let search_field = await driver.findElement(By.xpath(LANDING_PAGE_SEARCH_FIELD_XPATH));

  console.log("[TEST] typing the item title in the search field");
  await search_field.sendKeys(ITEM_TO_ORDER);

  // Click on the submit button
  console.log("[TEST] finding search field submit button");
  let search_submit = await driver.findElement(By.xpath(LANDING_PAGE_SEARCH_BUTTON_XPATH));
  await search_submit.click();
}


async function select_item(driver, timeoutSec) {
  // This selects an item from the search page.

  await awaitableTimeout(timeoutSec*1000);

  await awaitableTimeout(timeoutSec*1000);
  console.log("[TEST] finding the item");

  let search_item_thumbnail = await driver.findElement(By.xpath(SEARCH_PAGE_ITEM_XPATH));

  // Click on the item
  console.log("[TEST] clicking on the item");
  search_item_thumbnail.click();
}



async function add_to_cart(driver, timeoutSec) {
  // This clicks on the Add to Cart button.

  await awaitableTimeout(timeoutSec*1000);
  console.log("[TEST] finding the Add To Cart button");

  let add_to_cart_button = await driver.findElement(By.xpath(ADD_TO_CART_XPATH));
  await awaitableTimeout(timeoutSec*1000);

  // Click on the button
  console.log("[TEST] clicking on the button");
  await add_to_cart_button.click();

  // Go to cart

  await awaitableTimeout(timeoutSec*1000);
  console.log("[TEST] Finding the Cart icon at the top right");
  let cart_button = await driver.findElement(By.xpath(CART_XPATH));

  await awaitableTimeout(timeoutSec*1000);
  console.log("[TEST] Clicking on the Cart icon on the top right");
  await cart_button.click();
}


async function go_to_cart(driver, timeoutSec) {
  // This goes straight to cart.

  await awaitableTimeout(timeoutSec*1000);

  console.log("[TEST] finding the Cart icon at the top right");
  let cart_button = await driver.findElement(By.xpath(CART_XPATH));
  console.log("[TEST] finding the Cart icon at the top right");
  await cart_button.click();
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

    // /// Search item ///
    // console.log("[RUNNER] doing search");
    // await search_item(driver, timeout_sec);
    // console.log("[RUNNER] search done");

    // /// Select item ///
    // console.log("[RUNNER] doing item search among displayed options");
    // await select_item(driver, timeout_sec);
    // console.log("[RUNNER] item selection done");

    // /// Add to cart ///
    // console.log("[RUNNER] adding item to cart");
    // await add_to_cart(driver, timeout_sec);
    // console.log("[RUNNER] item added to cart");

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
