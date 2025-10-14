import { test, expect } from '@playwright/test';

test('Fill Action', async ({ page }) => {
    await page.goto('/FeedBackForm.html');
    const nameLocator = page.getByRole('textbox', { name: 'Name (Required)' });

    await nameLocator.fill('Vick');

})

test('Check Action', async ({ page }) => {
    await page.goto('/FeedBackForm.html');
    const checkboxLocator = page.getByRole('checkbox', { name: `I agree to the site's` });
    await checkboxLocator.check();
    await expect(checkboxLocator).toBeChecked();
    await checkboxLocator.uncheck();
    await expect(checkboxLocator).not.toBeChecked();


})

test('Select Options', async ({ page }) => {
    await page.goto('/FeedBackForm.html');
    const optionsLocator = page.getByLabel('Areas for Improvement');
    await optionsLocator.selectOption('content')
    await optionsLocator.selectOption(['presentation', 'timing'])

})

test('Select Options - using control modifier', async ({ page }) => {
    await page.goto('/FeedBackForm.html');
    const optionsLocator = page.getByLabel('Areas for Improvement');
    const firstOption = optionsLocator.getByRole('option').first();
    const secondOption = optionsLocator.getByRole('option').nth(1);

    await firstOption.click();
    await expect(optionsLocator).toHaveValue('content');

    await secondOption.click({modifiers:['Control']});

    await expect(optionsLocator).toHaveValues(['content', 'presentation']);
})