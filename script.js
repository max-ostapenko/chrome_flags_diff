const puppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
  // Launch Chrome Canary.
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    headless: false,
  });

  // Open the 'chrome://flags' page.
  const page = await browser.newPage();

  await page.goto("chrome://flags");

  // Select the element using document.querySelector("body > flags-app").shadowRoot.querySelector("#flagsTemplate")
  // and save the HTML to a file.
  const flagsTemplate = await page.evaluate(() => {
    const flagsApp = document.querySelector('body > flags-app');
    const flagsTemplate = flagsApp.shadowRoot.querySelector('#flagsTemplate');

    return flagsTemplate.innerHTML;
  });


  fs.writeFileSync("flags.html", flagsTemplate);

  // Close the browser.
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
