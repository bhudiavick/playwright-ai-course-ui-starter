import { test, expect, Request } from '@playwright/test';

test.use({
  baseURL: ''
});

test('Monitor requests from inside a page', async ({ page }) => {

  page.on('request', addRequest);

  const requests: Request[] = [];

  function addRequest(interceptedRequest: Request) {
    requests.push(interceptedRequest);
  }

  await page.goto('https://playwright.dev/');

  function sortAndPrintRequests() {
    requests.sort((a, b) => a.resourceType().localeCompare(b.resourceType()));
    requests.forEach((request) => {
      console.log(`${request.resourceType()}: ${request.url()}`);
    });
  }

  sortAndPrintRequests();
});

test('Check for failed requests', async ({ page }) => {

  page.on('requestfailed', request => {
    expect(
      request,
      `failed request to ${request.url()} with error ${request.failure()?.errorText}`
    ).toBeUndefined();
  });

  await page.goto('http://localhost:5000/Events.html');

  const requestButton = page.getByRole('button', {
    name: 'Call wrong server'
  });

  await requestButton.click();
  await page.waitForTimeout(50); // without this the test exits without error
});

test('check for errors inside the console', async ({ page }) => {

  page.on('console', message => {
    expect.soft(
      message.type(),
      `Received error log: ${message.text()}`
    ).not.toEqual('error');
  });

  await page.goto('http://localhost:5000/Events.html');

  const requestButton = page.getByRole('button', {
    name: 'Call wrong server'
  });

  await requestButton.click();
  await page.waitForTimeout(50); // without this the test exists without error
});
