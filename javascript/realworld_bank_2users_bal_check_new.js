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

async function runUser2Case(driver, timeoutSec, callEve) {
  //
  // login User2
  //
  console.log("[RUNNER] doing login for user2");
  await loginToRealWorldBank(driver, timeoutSec, "user2");
  console.log("[RUNNER] user2 login done");

  // 
  // balance check User2
  // 
  console.log("[RUNNER] doing balance check for user2");
  await findBalanceOnUserPage(driver, timeoutSec, "user2", callEve);
  console.log("[RUNNER] user2 balance check done");

  //
  // logout User2
  //
  console.log("[RUNNER] doing logout for user2");
  await logoutFromRealWorldBank(driver, timeoutSec);
  console.log("[RUNNER] user2 logout done");
}

async function assert(a,b) {
  if (a != b) {
      throw "THIS DID NOT WORK";
  }
}

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

////////////////////
// test constants //
////////////////////

const cleanStringRegex = /[|&;$%@"<>()+,]/g;

const landingPageUrl = "https://demo5.testgold.dev";

const userLoginDetails = {
  user1: {
    name: "aichemy_user",
    pass: "testgold123"
  },
  user2: {
    name: "ai_chemy",
    pass: "s3cret"
  }
};

const userBalance = {
  user1: {
    before: "",
    after: ""
  },
  user2: {
    before: "",
    after: ""
  }
}

const loginUserNameXpath = "//input[@id='username']";
const loginPasswordXpath = "//input[@id='password']";
const loginSubmitXPath = "/html/body/div[1]/div/main/div/form/button";

const logoutLinkXPath = "//body/div[@id='root']/div[1]/div[1]/div[1]/div[2]/div[5]/ul[1]/div[1]/div[1]";

const balanceTextXPath = "//h6[contains(text(),'Account Balance')]";
const balanceItemXPath = "//body/div[@id='root']/div[1]/div[1]/div[1]/div[2]/div[1]/h6[1]";

const newTransactionLinkXpath = "/html/body/div[1]/div/header/div[1]/a[1]";

const searchBarXpath = "//input[@id='user-list-search-input']";
const seachedUserListItemXpath = "//body/div[@id='root']/div[1]/main[1]/div[2]/div[1]/div[1]/div[2]/ul[1]/li[1]";

const amountFieldXpath = "//input[@id='amount']";
const addNoteFieldXpath = "//input[@id='transaction-create-description-input']";

const payButtonXpath = "/html/body/div[1]/div/main/div[2]/div/div/div[2]/div[2]/form/div[3]/div[2]/button";

const backButtonXpath = "/html/body/div[1]/div/main/div[2]/div/div/div[2]/div[3]/div/div[1]/a";

const navBarXpath = "/html/body/div[1]/div/header/div[2]";

const InputValues = {
  userNameToSearch: "ai_chemy",
  ammountToSend: "100",
  NoteForTransaction: "For family support",
}


////////////////////
// test functions //
////////////////////

// tries to login into provided user
async function loginToRealWorldBank(driver, timeoutSec, user) {

  await awaitableTimeout(timeoutSec*1000);

  const userName = userLoginDetails[user].name;
  const password = userLoginDetails[user].pass;
  // fill in the email addr and password
  console.log("[TEST] finding login username box and filling it in");
  let usernameBox = await driver.findElement(By.xpath(loginUserNameXpath));
  await usernameBox.sendKeys(userName);
  console.log("[TEST] finding login password box and filling it in");
  let passBox = await driver.findElement(By.xpath(loginPasswordXpath));
  await passBox.sendKeys(password);

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
async function logoutFromRealWorldBank(driver, timeoutSec) {

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
async function findBalanceOnUserPage(driver, timeoutSec, user, callEve) {

  await awaitableTimeout(timeoutSec*1000);

  // get the balance item
  console.log("[TEST] finding Balance item");
  const balanceTextContainer = await driver.findElement(By.xpath(balanceTextXPath));
  const balanceText = await balanceTextContainer.getText();
  let balanceItem = await driver.findElement(By.xpath(balanceItemXPath));
  userBalance[user][callEve] = await balanceItem.getText();
  console.log(`[TEST] Your ${balanceText} is: ${userBalance[user][callEve]}`);

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// tries to make a transaction and move back to home page
async function makeTransaction(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*1000);

  // find the new transaction link and click on it
  console.log("[TEST] finding New Transaction link");
  let newTransactionLink = await driver.findElement(By.xpath(newTransactionLinkXpath));
  console.log("[TEST] clicking New Transaction link");
  await newTransactionLink.click();

  await awaitableTimeout(timeoutSec*1000);

  // search user to send amount
  console.log("[TEST] Step 1 start");
  
  console.log("[TEST] finding User");
  let searchBar = await driver.findElement(By.xpath(searchBarXpath));
  await searchBar.sendKeys(InputValues.userNameToSearch);
  await awaitableTimeout(timeoutSec*1000);
  console.log("[TEST] User found");
  
  console.log("[TEST] click on User");
  let searchedUser = await driver.findElement(By.xpath(seachedUserListItemXpath));
  await searchedUser.click();
  console.log(`[TEST] Step 1 complete`);

  console.log(`[TEST] Step 2 start`);
  
  console.log("[TEST] enter Amount to send");
  let amountField = await driver.findElement(By.xpath(amountFieldXpath));
  await amountField.sendKeys(InputValues.ammountToSend);
  
  console.log("[TEST] add Note");
  let addNoteField = await driver.findElement(By.xpath(addNoteFieldXpath));
  await addNoteField.sendKeys(InputValues.NoteForTransaction);
  
  console.log("[TEST] click on Pay button");
  let payButton = await driver.findElement(By.xpath(payButtonXpath));
  await payButton.click();
  console.log(`[TEST] Step 2 complete`);

  console.log(`[TEST] Step 3 start`);
  
  console.log("[TEST] click on Return to home button");
  let backButton = await driver.findElement(By.xpath(backButtonXpath));
  await backButton.click();
  console.log(`[TEST] Step 3 complete`);

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// tries to check if successfully return to home page
async function checkIfReturnToHome(driver, timeoutSec) {

  await awaitableTimeout(timeoutSec*2000);

  // find the new transaction link and click on it
  console.log("[TEST] finding Nav bar");
  let navBar = await driver.findElement(By.xpath(navBarXpath));
  if (navBar) {
    console.log("[TEST SUCCESS] Reached back to Home page");
  } else {
    console.log("[TEST Failed] Failed to go back to Home page");
  }

  await awaitableTimeout(timeoutSec*1000);
  return driver;

}

// tries to check if balance for both users changed or not
async function verifyBalanceChange(driver, timeoutSec, user) {

  await awaitableTimeout(timeoutSec*1000);

  const beforeUpdateBalance = `${userBalance[user].before.replace(cleanStringRegex, "")}`;
  let originallyUpdateBalance = `${userBalance[user].after.replace(cleanStringRegex, "")}`;
  let updatedBalanceToCheckEquality = originallyUpdateBalance;
  if (user === "user2") {
    updatedBalanceToCheckEquality = `${parseFloat(parseFloat(updatedBalanceToCheckEquality) - parseFloat(InputValues.ammountToSend)).toFixed(2)}`;
  } else {
    updatedBalanceToCheckEquality = `${Number(updatedBalanceToCheckEquality) + Number(InputValues.ammountToSend)}`;
  }
  // find the new transaction link and click on it
  console.log(`[TEST] Start process to verify ${user} balance update`);
  try {
    console.log(`[TEST] Balance ${user} before transaction: ${formatter.format(beforeUpdateBalance)}`);
    await assert( beforeUpdateBalance, updatedBalanceToCheckEquality);

    console.log("[TEST] Balance successfully updated.");
    console.log(`[TEST] Balance ${user} after transaction: ${formatter.format(originallyUpdateBalance)}`);
  } catch (error) {
    console.error(error);
    console.log(`Assertion failed. Actual value is ${formatter.format(originallyUpdateBalance)}`);
  }
  console.log(`[TEST] End process to verify ${user} balance update`);

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

    let options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-extensions");
    options.addArguments("remote-debugging-port=9222");
    driver = await new webdriver.Builder()
	  .forBrowser('chrome')
	  .setChromeOptions(options)
	  .build();

    // get to the landing page
    await driver.get(landingPageUrl);

    //
    // tests go here
    //

    //
    // User2 login -> balance check -> logout
    //
    await runUser2Case(driver, timeoutSec, "before");

    //
    // login User1
    //
    console.log("[RUNNER] doing login for user1");
    await loginToRealWorldBank(driver, timeoutSec, "user1");
    console.log("[RUNNER] user1 login done");

    // 
    // balance check User1
    // 
    console.log("[RUNNER] doing balance check for user1");
    await findBalanceOnUserPage(driver, timeoutSec, "user1", "before");
    console.log("[RUNNER] user1 balance check done");

    // 
    // Making Transaction
    // 
    console.log("[RUNNER] doing transaction");
    await makeTransaction(driver, timeoutSec);
    console.log("[RUNNER] transaction done");
    
    // 
    // Check if return to home page
    // 
    console.log("[RUNNER] doing home page check");
    await checkIfReturnToHome(driver, timeoutSec);
    console.log("[RUNNER] home page check done");

    // 
    // balance check User1 again
    // 
    console.log("[RUNNER] doing balance check for user1 again");
    await findBalanceOnUserPage(driver, timeoutSec, "user1", "after");
    console.log("[RUNNER] user1 balance check done");

    //
    // logout User1
    //
    console.log("[RUNNER] doing logout for user1");
    await logoutFromRealWorldBank(driver, timeoutSec);
    console.log("[RUNNER] user1 logout done");

    //
    // User2 login -> balance check -> logout
    //
    await runUser2Case(driver, timeoutSec, "after");

    //
    // Check is balance changed for user1 & user2
    //
    await verifyBalanceChange(driver, timeoutSec, "user1");
    await verifyBalanceChange(driver, timeoutSec, "user2");


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
