import { test, expect } from '@playwright/test';

test('GetByRole Demo - Button', async ({ page }) => {
  await page.goto('/');

  const acceptButtonLocator = page.getByRole('button',
    {
      name: 'Accept',
      exact: true
    });

  const declineButtonLocator = page.getByRole('button',
    {
      name: 'Decline',
      exact: true
    });
  
    await acceptButtonLocator.click();
    await expect(acceptButtonLocator).not.toBeVisible();
    await expect(declineButtonLocator).not.toBeVisible();
})