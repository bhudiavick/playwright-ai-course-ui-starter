import {test, expect} from '@playwright/test';

test('GetByRole Demo - heading', async ({page}) => {
  await page.goto('/');

  const serviceHeading = page.getByRole('heading', {name: 'Our Services', exact: true});

  await expect(serviceHeading).toBeVisible();

})