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

async function assert(a,b) {
    if (a != b) {
        throw "THIS DID NOT WORK";
    }
}


////////////////////
// test constants //
////////////////////

const dropdown = "//select[@id = 'dropdown']";
const benchurl = "https://demodev1.testgold.dev/benchmark/test0003/all_dom.html";
const selectMth = "//option[.='Please select a Month']"; // This text will change in bad page
const dropDownSeptember = "//select[@id = 'dropdown']/option[@value='9']"; // This order will change in bad page
const sepSelected = "//option[contains(text(), 'Sep')]";
const phoneCheckBox = "//form[@id='checkboxes']/input[1]";
const eMailCheckBox = "//form[@id='checkboxes']/input[2]"; // toggle the index and see if the default is selected in bad page
const table = "//tbody/tr[1]/td[1]"; // this is the table first row first column element consider JDBC tests for this as well.
const tRows = "//tbody/tr";
const tCols = "//tbody/tr[1]/td";
const jsAlert = "//button[.='Click for JS Alert']";
const jsConfirm = "//button[.='Click for JS Confirm']";
const jsPrompt = "//button[.='Click for JS Prompt']";
const JsResult = "//p[@id='result']";
const username = "//input[@id='username']";
const password = "//input[@id='password']";
const contextMenu = "//div[@id='hot-spot']";
const slider = "//input[@type='range']";
const hoverMinions = "//img[@src='img/minions.jpg']";
const hoverball = "//img[@src='img/ball.jpg']";
const hoverAstro = "//img[@src='img/astro.jpg']";
const minionMessage = "//h3[.='Your Avatar: Minions']";
const ballMessage = "//h3[.='Your Avatar: Color Ball']";
const astroMessage = "//h3[.='Your Avatar: Spaceman']";
const geoLocation = "//button[.='Where am I?']";
const geoLocLatitude = "//p[@id='demo' and contains(text(),'Latitude')] /div[1][@id='lat-value']";
const geoLocLongitude = "//p[@id='demo' and contains(text(),'Latitude')] /div[2][@id='long-value']";
const dynamicRemove = "//button[.='Remove']";
const removableChkBox = "//input[@type='checkbox'][@label='blah']";
const itsbsck = "//p[.='It\\'s back!']";
const dynamicAdd = "//button[.='Add']";
const disabledTxtBx = "//input[@type='text'][@style='width: 30%']";
const enableButton = "//button[@onclick='swapInput()']";

////////////////////
// test functions //
////////////////////

async function validateElementsInBenchmarkPage(driver, timeoutSec) {

    await awaitableTimeout(timeoutSec*1000);
    console.log("[TEST] Navigate to Benchmark page with many popular Doms..");

    await driver.get(benchurl);
    await awaitableTimeout(timeoutSec*1000);

    console.log("[TEST] Testing Dropdown selecting september..");
    let selMonth = await driver.findElement(By.xpath(selectMth));
    selMonth.click();
    await awaitableTimeout(timeoutSec*1000);

    let sep = await driver.findElement(By.xpath(dropDownSeptember));
    await sep.click();
    await awaitableTimeout(timeoutSec*1000);

    let septSelected = await driver.findElement(By.xpath(sepSelected));
    if (await septSelected.isDisplayed()) {
        let text = await septSelected.getText();
        if (text == "Sep") {
            console.log("[TEST] Chosen Month is Sep");
        } else {
            console.log("[TEST] Chosen Month is not Sep");
        }
    } else {
        console.log("September is NOT Displayed");
    }

    console.log("Verifying checkbox");
    let defaultChkdEml = await driver.findElement(By.xpath(eMailCheckBox));
    let defCk = await defaultChkdEml.isSelected();
    console.log("The checkbox is selection state is - " + defCk);

    let ChkPhone = await driver.findElement(By.xpath(phoneCheckBox));
    let chp = await ChkPhone.isSelected();
    console.log("The checkbox is selection state is - " + chp);
    if (!(chp)) {
        await ChkPhone.click();
    }
    let chphass = await ChkPhone.isSelected();
    await assert(chphass, true);

    console.log("Verifying Transaction Table Elements");
    let mthRow = await driver.findElements(By.xpath(tRows));
    let mthRowCount = await mthRow.length;
    console.log("mthRowCount is : " + mthRowCount);

    let acctsCol = await driver.findElements(By.xpath(tCols));
    let acctsColCount = await acctsCol.length;
    console.log("acctsColCount is : " + acctsColCount);

    for (i=1; i < mthRowCount + 1; i++) {
        let mth = await driver.findElement(By.xpath("//tbody/tr" + "[" + i.toString() + "]/td[1]")).getText();
        let chkgBal = await driver.findElement(By.xpath("//tbody/tr" + "[" + i.toString() + "]/td[2]")).getText();
        if (await mth.toLowerCase() == "jun") {
            try {
                await assert(chkgBal, "4000.00");
            } catch(error) {
                console.error(error);
                console.log("Assertion failed. Actual value is " + chkgBal);
            }
        }
        if (await mth.toLowerCase() == "may") {
            try {
                await assert(chkgBal, "1800.00");
            } catch(error) {
                console.error(error);
                console.log("Assertion failed. Actual value is " + chkgBal);
            }
        }
        if (await mth.toLowerCase() == "apr") {
            try {
                await assert(chkgBal, "1000.00");
            } catch(error) {
                console.error(error);
                console.log("Assertion failed. Actual value is " + chkgBal);
            }
        }
        if (await mth.toLowerCase() == "mar") {
            try {
                await assert(chkgBal, "600.00");
            } catch(error) {
                console.error(error);
                console.log("Assertion failed. Actual value is " + chkgBal);
            }
        }
        if (await mth.toLowerCase() == "feb") {
            try {
                await assert(chkgBal, "3600.00");
            } catch(error) {
                console.error(error);
                console.log("Assertion failed. Actual value is " + chkgBal);
            }
        }
        if (await mth.toLowerCase() == "jan") {
            try {
                await assert(chkgBal, "5000.00");
            } catch(error) {
                console.error(error);
                console.log("Assertion failed. Actual value is " + chkgBal);
            }
        }
    }

    // console.log("Verifying JS Alert btn");
    // let alertButton = await driver.findElement(By.xpath(jsAlert));
    // if (await alertButton.isEnabled()) {
    //     console.log("IT IS WORKING SO FAR");
    //     await alertButton.click();
    //     console.log("IT IS WORKING SO FAR");
    //     await awaitableTimeout(3000);
    //     console.log("IT IS WORKING SO FAR");
    //     await driver.switchTo().alert().then(function(alert) {
    //         alert.accept();
    //     }).catch(function(error) {
    //         throw error;
    //     });
    //     console.log("IT IS WORKING SO FAR");
    //     let resultElem = await driver.findElement(By.xpath(JsResult));
    //     if (await resultElem.isDisplayed()) {
    //         let restxt = await resultElem.getText();
    //         await assert(restxt, "..thanks Your download should complete soon");
    //     }
    // } else {
    //     console.log("Alert Box is not enabled");
    //     await assert(alertButton.isEnabled(), true);
    // }

    // verify JS confirm OK / cancel - accept
    // console.log("running Confirm OK/Cancel button with ACCEPT ");
    // await awaitableTimeout(timeoutSec*1000);
    // let jsConfirmOKCancel = await driver.findElement(By.xpath(jsConfirm));
    // if(await jsConfirmOKCancel.isEnabled()) {
    //     await jsConfirmOKCancel.click();
    //     let alert = await driver.switchTo().alert();
    //     await alert.accept();
    //     let resultElem = await driver.findElement(By.xpath(JsResult));
    //     if (await resultElem.isDisplayed()) {
    //         let restxt = await resultElem.getText();
    //         await assert(restxt, "You clicked: Ok");
    //     }
    // } else {
    //     console.log("Alert Box is not enabled");
    //     await assert(alertButton.isEnabled(), true);
    // }

    // await awaitableTimeout(timeoutSec*1000);
    // console.log("running Confirm OK/Cancel button with CANCEL ");
    // await awaitableTimeout(timeoutSec*1000);
    // jsConfirmOKCancel = await driver.findElement(By.xpath(jsConfirm));
    // if (await jsConfirmOKCancel.isEnabled()) {
    //     await jsConfirmOKCancel.click();
    //     let alert = await driver.switchTo().alert();
    //     await alert.dismiss();
    //     let resultElem = await driver.findElement(By.xpath(JsResult));
    //     if (await resultElem.isDisplayed()) {
    //         let restxt = resultElem.getText();
    //         console.log("result element text is " + restxt);
    //         await assert(restxt, "You clicked: Cancel");
    //     }
    // }
    // else {
    //     console.log("Alert Box is not enabled");
    //     await assert(alertButton.isEnabled(), true);
    // }
    // await awaitableTimeout(timeoutSec*1000);

    // verify JS Prompt with Input data
    // console.log("running Prompt button with Automater as input");
    // await awaitableTimeout(timeoutSec*1000);

    //TODO
    // jsprompt = await driver.findElement(By.xpath(jsPrompt));
    // if jsprompt.is_enabled():
    //     jsprompt.click()
    //     alert = driver.switch_to.alert
    //     driver.switch_to.alert.send_keys("Automator")
    //     alert.accept()
    //     resultElem = await driver.findElement(By.xpath(JsResult)
    //     if resultElem.is_displayed():
    //         restxt = resultElem.text
    //         console.log("result element text is %s" % restxt)
    //         assert(restxt == "You entered: Automator")
    // console.log("Alert Box is not enabled")
    // assert(alertButton.is_enabled())

    // Move slider
    let slide = await driver.findElement(By.xpath(slider));
    let initV = await slide.getAttribute("value");
    console.log("The initial slider value is: " + initV);
    const actions = driver.actions({async: true});
    await actions.dragAndDrop(slide, {x:4, y:0}).perform();
    let finV = await slide.getAttribute("value");
    console.log("The final slider value is: " + finV);

    // Verifying geo location
    driver.executeScript("navigator.geolocation.getCurrentPosition = function(success) { success({coords: {latitude: 50.455755, longitude: 30.511565}}); }");

    let gLoc = await driver.findElement(By.xpath(geoLocation));
    if (await gLoc.isEnabled()) {
        await gLoc.click();
        let lat = await driver.findElement(By.xpath(geoLocLatitude));
        let latdis = await lat.isDisplayed();
        await assert(latdis, true);
        let longi = await driver.findElement(By.xpath(geoLocLongitude));
        let longidis = await longi.isDisplayed();
        await assert(longidis, true);
    }
    else {
        let glocen = await gLoc.isEnabled();
        await assert(glocen, true);
    }

    // Dynamic controls Remove and add button
    console.log("Verifying remove and add from shopping cart scenario");
    let cartItem = await driver.findElement(By.xpath(removableChkBox));
    let carten = await cartItem.isEnabled();
    await assert(carten, true);
    await cartItem.click();
    let removeButton = await driver.findElement(By.xpath(dynamicRemove));

    if (await removeButton.isEnabled()) {
        await removeButton.click();
        await awaitableTimeout(3000);
        console.log("cart item is not visible");
        await awaitableTimeout(timeoutSec*1000);
        console.log("Verifying Adding Back from shopping cart scenario");
        let addBack = await driver.findElement(By.xpath(dynamicAdd));
        if (await addBack.isEnabled()) {
            await addBack.click();
            await awaitableTimeout(timeoutSec*1000);
            console.log("shopping cart scenario works");
        }
    }

    return driver;
}

/////////////////
// test runner //
/////////////////

(async function main(timeout_sec) {

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

        await validateElementsInBenchmarkPage(driver, timeout_sec);
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
