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

const sfLoginUrl = "https://login.salesforce.com/";
const homePgurl = "https://testgold-dev-ed.lightning.force.com/lightning/page/home";
const contactPgLayOutViewurl = "https://testgold-dev-ed.lightning.force.com/lightning/setup/ObjectManager/Contact/PageLayouts/view";
const contPgRecentlyViewedurl = "https://testgold-dev-ed.lightning.force.com/lightning/o/Contact/list?filterName=Recent";
const userNmTxtBx = "//input[@class='input r4 wide mb16 mt8 username']";
const passwdTxtBx = "//input[@class='input r4 wide mb16 mt8 password']";

const Userid = "sf@testgold.dev";
const Password = "admin123";

const loginBtn = "//input[@class='button r4 wide primary']";
const contactsButPath = "//span[.='Contacts']";
const newContactBtn = "//div[@title='New']";
const newContacttitle1 = "Recently Viewed | Contacts | Salesforce";
const newContacttitle2 = "New Contact | Salesforce";
const newBtnPath = "//div[@Title='New']";
const phonePath = "//div[@class='test-id__record-layout-container riseTransitionEnabled']/div/div[1]/div/div/div[1]/div[2]/div/div/div/input";
const mobilePath = "//div[@class='test-id__record-layout-container riseTransitionEnabled']/div/div[1]/div/div/div[2]/div[2]/div/div/div/input";
const salute = "//div[@class='salutation compoundTLRadius compoundTRRadius compoundBorderBottom form-element__row uiMenu']";
const doctorTitle = "//li[@role='presentation']/a[ @title='Dr.']";
const lastName = "//input[@class = 'lastName compoundBLRadius compoundBRRadius form-element__row input']";
const Assistant = "//div[@class='test-id__section slds-section  slds-is-open full forcePageBlockSection forcePageBlockSectionEdit'][1]/div/div/div[6]/div[2]/div/div/div/input";
const dtPicker = "//a[@class='datePicker-openIcon display']";
const descriptionPath = "//div[@class='test-id__section slds-section  slds-is-open full forcePageBlockSection forcePageBlockSectionEdit'][1]/div/div/div[5]/div[2]/div/div/div/textarea";
const dtPickerPickList = "//select[@class='slds-select picklist__label']";
const dtPickerYearPath = "//select[@class='slds-select picklist__label']/option[63]";
const dayPickerPath = "//span[@class='slds-day weekday DESKTOP uiDayInMonthCell--default' or @class='slds-day weekend DESKTOP uiDayInMonthCell--default' and contains(text(),18)]";

////////////////////
// test functions //
////////////////////

async function login_to_salesforce(driver, timeoutSec) {

    await awaitableTimeout(timeoutSec*1000);
    console.log("[TEST] Navigate to Contact page and login when prompted..");

    await driver.get(contPgRecentlyViewedurl);
    await awaitableTimeout(timeoutSec*1000);

    // click on the login button
    console.log("[TEST] log into demodev");
    let usrNameTxt = await driver.findElement(By.xpath(userNmTxtBx));

    console.log("[TEST] UserName Txt enabled");
    await usrNameTxt.sendKeys(Userid);

    let passwdTxt = await driver.findElement(By.xpath(passwdTxtBx));

    console.log("[TEST] password Txt enabled");
    await passwdTxt.sendKeys(Password);

    let submitBtn = driver.findElement(By.xpath(loginBtn));

    console.log("[TEST] submit button enabled.. submitting");
    await submitBtn.click();

    await awaitableTimeout(timeoutSec*1000);

    await driver.get(contPgRecentlyViewedurl);
    await awaitableTimeout(timeoutSec*1000);

    console.log("[TEST] Clicking new to create new contact");

    let newBtn = await driver.findElement(By.xpath(newBtnPath));

    console.log("[TEST]  contact button enabled.. clicking");
    await newBtn.click();    

    await awaitableTimeout(timeoutSec*1000);

    console.log("[TEST] Inputting phone number");
    let phone = await driver.findElement(By.xpath(phonePath));
    await phone.sendKeys("4089999999");

    console.log("[TEST] Inputting mobile");
    let mobile = await driver.findElement(By.xpath(mobilePath));
    await mobile.sendKeys("4089999999");
        
    await awaitableTimeout(timeoutSec*1000);

    let salut = await driver.findElement(By.xpath(salute));

    console.log("[TEST] salut Enabled");
    await salut.click();
    console.log("[TEST] salut clicked");
    let drTitle = await driver.findElement(By.xpath(doctorTitle));
    console.log("[TEST] Doctor Enabled");
    await drTitle.click();
    await awaitableTimeout(timeoutSec*1000);
    console.log("[TEST] Doctor selected");
        

    console.log("[TEST] Inputting required last name");
    let lName = await driver.findElement(By.xpath(lastName));

    await lName.sendKeys("tester");

    await awaitableTimeout(timeoutSec*1000);
    console.log("[TEST] filling dates from datePicker");
    let datePicker = await driver.findElement(By.xpath(dtPicker));
    await datePicker.click();

    await awaitableTimeout(timeoutSec*1000);
    let dtPickList = await driver.findElement(By.xpath(dtPickerPickList));
    await dtPickList.click();

    await awaitableTimeout(timeoutSec*1000);
    console.log("[TEST] picking year");
    let year = await driver.findElement(By.xpath(dtPickerYearPath));
    await year.click();

    await awaitableTimeout(timeoutSec*1000);
    console.log("[TEST] picking day");
    let day = await driver.findElement(By.xpath(dayPickerPath));
    await day.click();

    await awaitableTimeout(timeoutSec*1000);
    console.log("[TEST] my assistants name is godzilla");
    let assist = await driver.findElement(By.xpath(Assistant));
    await assist.sendKeys("Godzilla");

    console.log("[TEST] This is the interesting part that would fail when I move the description textbox to a different location using salesForce.");

    desc = driver.findElement(By.xpath(descriptionPath));

    await desc.sendKeys("[TEST] AYBABTU means ALL YOUR BASES ARE BELONG TO US");

    return driver;
}

/////////////////
// test runner //
/////////////////

(async function main(timeoutSec) {

    let exitCode = 0;
    let driver;

    try {
        let options = new chrome.Options();
	//options.addArguments("--headless");
        options.addArguments("--disable-extensions");

        driver = await new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

        await login_to_salesforce(driver, timeoutSec);
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
