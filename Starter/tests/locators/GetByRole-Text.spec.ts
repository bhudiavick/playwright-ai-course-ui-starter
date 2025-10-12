import { test, expect } from '@playwright/test';

test('GetByRole Demo - Text', async ({ page }) => {
  await page.goto('/FeedBackForm.html');

  const feedbackFormTitleLocator = page.getByText('Feedback Form').first();
  const hiddenTextLocator = page.getByText('Hidden feature');
  const emailErrorLocator = page.getByText('Invalid email format');
  const emailInputLocator = page.getByRole('textbox',
    {
      name: 'email'
    });
  
  await expect(feedbackFormTitleLocator).toBeVisible();
  await expect(hiddenTextLocator).not.toBeVisible();
  await emailInputLocator.fill('vick@emailcom');
  await expect(emailErrorLocator).toBeVisible();
  await emailInputLocator.fill('vick@email.com');
  await expect(emailErrorLocator).toBeHidden();
  console.log(await hiddenTextLocator.textContent());





})