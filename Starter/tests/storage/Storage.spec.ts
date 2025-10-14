import { test, expect } from '@playwright/test';

test('Saving storage - correct load', async ({ page }) => {
    const someName = 'Vick';
    const nameField = page.getByRole('textbox', { name: 'Name (Required)' });
    await page.goto('/FeedBackForm.html');
    await nameField.fill(someName);

    await page.getByRole('button', {
        name: 'Save Progress'
    }).click();

    await page.reload();

    await expect(nameField).toHaveValue(someName);

    // use the debugger here to illustrate the structure of storage
    const storage = await page.context().storageState();
    const z = 5;

});
