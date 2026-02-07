/* 

What is Puppeteer?
Puppeteer is a Node.js library which is used to automate browser actions
on allowed websites and perform operations automatically.

How it Works?
Puppeteer code is Node.js code and it runs in the Node.js environment.
The Puppeteer module present in node_modules converts the code internally.

When Puppeteer is used, a WebSocket connection between Puppeteer and the
browser is established.

The Puppeteer commands are converted into a set of instructions in JSON format.
These JSON commands are sent to the browser, which executes them using
CDP (Chrome DevTools Protocol).

After execution, the browser sends the response back to Puppeteer in JSON form.

*/

import puppeteer from "puppeteer";

// Step-1: Launch browser with certain options
const browser = await puppeteer.launch({
    headless: true,        // Browser runs in background (not visible on screen)
    slowMo: 50,            // Run actions in slow motion
    defaultViewport: null
});

// Step-2: Create a new page (tab) in the browser
const page = await browser.newPage();

// Step-3: Enter URL of the page
await page.goto("https://google.com/");

// → Now we have the page opened and we can perform any operations we want

// Button click
await page.click('#id'); // Button with this id gets clicked

// To type or fill input fields
await page.type('input[name="email"]', 'test@gmail.com');     // Fill email input
await page.type('input[name="password"]', '123456');          // Fill password input

// Keyboard key operations
await page.keyboard.down('Control');   // Press Ctrl
await page.keyboard.press('A');         // Press A (Ctrl + A)
await page.keyboard.up('Control');     // Release Ctrl
await page.keyboard.press('Backspace'); // Press Backspace

// To select from a dropdown menu
await page.select('#country', 'India'); // Select India from dropdown with id country

// To extract data from the browser
const text = await page.$eval('.result', el => el.innerText);
// $eval selects one element, runs a function on it inside the browser,
// and returns the value to Node.js

// Waiting properties (used to avoid timing issues and detection)

// Wait until there are at most 2 network requests for 500ms
await page.goto(url, { waitUntil: 'networkidle2' });

// Wait for a specific element to load and become visible
await page.waitForSelector('#loginBtn', { visible: true });

// Wait for 3 seconds
await page.waitForTimeout(3000);

// Take a screenshot for debugging
await page.screenshot({ path: 'debug.png' });
