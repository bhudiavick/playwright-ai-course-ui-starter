import { test, expect } from '@playwright/test';


test('Saving storage - data is cleared', async ({ page }) => {
    page.on('dialog', dialog => {
        if (dialog.message().includes('clear the form')) {
            dialog.dismiss();
            return;
        }
        dialog.accept();
    });

    await page.goto('/FeedBackForm.html');



    const nameField = page.getByRole('textbox', { name: 'Name (required):' });

    await nameField.fill('someName');

    await page.getByRole('button', { name: 'Save Progress' }).click();

    await page.reload();
     await expect(nameField).toHaveValue('someName');

    await page.getByRole('button', { name: 'Clear Progress' }).click();
    // the dialog box will be dismissed
    await page.reload();

     await expect(nameField).toHaveValue('someName');
    await page.close();
});