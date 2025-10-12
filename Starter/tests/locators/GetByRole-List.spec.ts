import {test, expect} from '@playwright/test';

test('GetByRole Demo - list', async ({page}) => {
  await page.goto('/');

  const serviceList = page.getByRole('list');

  await expect(serviceList).toBeVisible();

  const serviceListItems = await serviceList.getByRole('listitem').all();

  for(const item of serviceListItems) {
    console.log(await item.textContent());
    const itemText = await item.textContent()
    expect(itemText).toBeTruthy();
  }

})