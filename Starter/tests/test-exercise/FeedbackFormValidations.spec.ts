import { test, expect } from '@playwright/test';


test('Form is submitted with required fields', async ({ page }) => {
    let formSubmitted = false;

    page.on('dialog', dialog => {
        dialog.accept();
        formSubmitted = true;
    });
    const nameField = page.getByRole('textbox', { name: 'Name (required):' });
    const emailField = page.locator('#email');
    const emailInvalidError = page.locator('#emailError');
    const commentField = page.locator('#comment');
    const eventHighlights = page.getByRole('textbox', { name: 'Event Highlights (optional)' });
    const areasOfImprovement = page.getByLabel('Areas for Improvement (optional):');
    const tosCheckbox = page.locator('#tos');
    const tosStringExpected = page.getByLabel(`I agree to the site's`);
    const invalidEmailExpectedText = 'Invalid email format';
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const saveButton = page.locator('#saveButton');
    const clearButton = page.locator('#clearButton');


    await page.goto('/FeedBackForm.html');
    await expect(emailInvalidError).not.toBeVisible();
    await expect(tosStringExpected).toBeVisible();

    await nameField.fill('Vick');
    await emailField.fill('Vick@email.com');
    await commentField.fill('This is a test comment');
    await tosCheckbox.check();

    await expect(tosCheckbox).toBeChecked();
    await submitButton.click();
    expect(formSubmitted).toBeTruthy();

})

test('Form is submitted with required fields - form is cleared after submit', async ({ page }) => {

    const nameField = page.getByRole('textbox', { name: 'Name (required):' });
    const emailField = page.locator('#email');
    const emailInvalidError = page.locator('#emailError');
    const commentField = page.locator('#comment');
    const eventHighlights = page.getByRole('textbox', { name: 'Event Highlights (optional)' });
    const areasOfImprovement = page.getByLabel('Areas for Improvement (optional):');
    const tosCheckbox = page.locator('#tos');
    const tosStringExpected = page.getByLabel(`I agree to the site's`);
    const invalidEmailExpectedText = 'Invalid email format';
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const saveButton = page.locator('#saveButton');
    const clearButton = page.locator('#clearButton');

    let formSubmitted = false;

    page.on('dialog', dialog => {
        dialog.accept();
        formSubmitted = true;
    });

    await page.goto('/FeedBackForm.html');
    await expect(emailInvalidError).not.toBeVisible();
    await expect(tosStringExpected).toBeVisible();

    await nameField.fill('Vick');
    await emailField.fill('Vick@email.com');
    await commentField.fill('This is a test comment');
    await eventHighlights.fill('The speakers were great!');
    await areasOfImprovement.selectOption(['content', 'timing']);
    await expect(areasOfImprovement).toHaveValues(['content', 'timing']);

    await tosCheckbox.check();

    await expect(tosCheckbox).toBeChecked();
    await submitButton.click();
    await expect(formSubmitted).toBeTruthy();
    await expect(nameField).toBeEmpty();
    await expect(emailField).toBeEmpty();
    await expect(commentField).toBeEmpty();
    await expect(eventHighlights).toBeEmpty();
    await expect(areasOfImprovement).toHaveValues([]);
    await expect(tosCheckbox).not.toBeChecked();
})

test('Form is NOT submitted without minimal fields', async ({ page }) => {
    const nameField = page.getByRole('textbox', { name: 'Name (required):' });
    const emailField = page.locator('#email');
    const emailInvalidError = page.locator('#emailError');
    const commentField = page.locator('#comment');
    const eventHighlights = page.getByRole('textbox', { name: 'Event Highlights (optional)' });
    const areasOfImprovement = page.getByLabel('Areas for Improvement (optional):');
    const tosCheckbox = page.locator('#tos');
    const tosStringExpected = page.getByLabel(`I agree to the site's`);
    const invalidEmailExpectedText = 'Invalid email format';
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const saveButton = page.locator('#saveButton');
    const clearButton = page.locator('#clearButton');

    let formSubmitted = false;

    page.on('dialog', dialog => {
        dialog.accept();
        formSubmitted = true;
    });

    await page.goto('/FeedBackForm.html');
    await expect(emailInvalidError).not.toBeVisible();
    await expect(tosStringExpected).toBeVisible();

    await submitButton.click();
    expect(formSubmitted).toBeFalsy();
    await expect(nameField).toBeEmpty();
    const isInvalid = await nameField.evaluate(el => !(el as HTMLInputElement).checkValidity());
    expect(isInvalid).toBeTruthy();
    await expect(emailField).toBeEmpty();
    await expect(commentField).toBeEmpty();
    await expect(eventHighlights).toBeEmpty();
    await expect(areasOfImprovement).toHaveValues([]);
    await expect(tosCheckbox).not.toBeChecked();
})

test('Form is completed - clear button clears inputs', async ({ page }) => {
    let formCleared = false;

    page.on('dialog', dialog => {
        if (dialog.message().includes('clear the form')) {
            dialog.accept();
            formCleared = true;
            return;
        }
        dialog.dismiss();
    });
    const nameField = page.getByRole('textbox', { name: 'Name (required):' });
    const emailField = page.locator('#email');
    const emailInvalidError = page.locator('#emailError');
    const commentField = page.locator('#comment');
    const eventHighlights = page.getByRole('textbox', { name: 'Event Highlights (optional)' });
    const areasOfImprovement = page.getByLabel('Areas for Improvement (optional):');
    const tosCheckbox = page.locator('#tos');
    const tosStringExpected = page.getByLabel(`I agree to the site's`);
    const invalidEmailExpectedText = 'Invalid email format';
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const saveButton = page.locator('#saveButton');
    const clearButton = page.locator('#clearButton');


    await page.goto('/FeedBackForm.html');
    await expect(emailInvalidError).not.toBeVisible();
    await expect(tosStringExpected).toBeVisible();

    await nameField.fill('Vick');
    await emailField.fill('Vick@email.com');
    await commentField.fill('This is a test comment');
    await tosCheckbox.check();

    await expect(tosCheckbox).toBeChecked();
    await clearButton.click();
    await expect(nameField).toBeEmpty();
    const isInvalid = await nameField.evaluate(el => !(el as HTMLInputElement).checkValidity());
    expect(isInvalid).toBeTruthy();
    await expect(emailField).toBeEmpty();
    await expect(commentField).toBeEmpty();
    await expect(eventHighlights).toBeEmpty();
    await expect(areasOfImprovement).toHaveValues([]);
    await expect(tosCheckbox).not.toBeChecked();
    expect(formCleared).toBeTruthy();
});

test('Form is completed - clear button clears memory', async ({ page }) => {
    let formSaved = false;
    let formCleared = false;
    page.once('dialog', dialog => {
        dialog.accept();
        formSaved = true;
        formCleared = false;
    });
    const nameField = page.getByRole('textbox', { name: 'Name (required):' });
    const emailField = page.locator('#email');
    const emailInvalidError = page.locator('#emailError');
    const commentField = page.locator('#comment');
    const eventHighlights = page.getByRole('textbox', { name: 'Event Highlights (optional)' });
    const areasOfImprovement = page.getByLabel('Areas for Improvement (optional):');
    const tosCheckbox = page.locator('#tos');
    const tosStringExpected = page.getByLabel(`I agree to the site's`);
    const invalidEmailExpectedText = 'Invalid email format';
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const saveButton = page.locator('#saveButton');
    const clearButton = page.locator('#clearButton');


    await page.goto('/FeedBackForm.html');
    await expect(emailInvalidError).not.toBeVisible();
    await expect(tosStringExpected).toBeVisible();

    await nameField.fill('Vick');
    await emailField.fill('Vick@email.com');
    await commentField.fill('This is a test comment');
    await tosCheckbox.check();

    await expect(tosCheckbox).toBeChecked();
    await saveButton.click();
    await page.reload();
    //Accept dialog (no dismiss displayed)
    await expect(nameField).not.toBeEmpty();
    let isInvalid = await nameField.evaluate(el => !(el as HTMLInputElement).checkValidity());
    expect(isInvalid).toBeFalsy();
    await expect(emailField).not.toBeEmpty();
    await expect(commentField).not.toBeEmpty();
    await expect(areasOfImprovement).toHaveValues([]);
    await expect(tosCheckbox).toBeChecked();

    expect(formSaved).toBeTruthy();
    // Now clear the form and accept the dialog
    page.once('dialog', async dialog => {
        console.log('Dialog 1:', dialog.message());
        if (dialog.message().includes('clear the form')) {
            await dialog.accept();

            // Immediately prepare for the next dialog
            page.once('dialog', async nextDialog => {
                console.log('Dialog 2:', nextDialog.message());
                await nextDialog.accept();
            });
        } else {
            await dialog.dismiss();
        }
    });

    await clearButton.click();
    
    await page.reload();
    await expect(nameField).toBeEmpty();
    isInvalid = await nameField.evaluate(el => !(el as HTMLInputElement).checkValidity());
    expect(isInvalid).toBeTruthy();
    await expect(emailField).toBeEmpty();
    await expect(commentField).toBeEmpty();
    await expect(eventHighlights).toBeEmpty();
    await expect(areasOfImprovement).toHaveValues([]);
    await expect(tosCheckbox).not.toBeChecked();

});

test('Form is completed - clear button does not clear inputs if dialog rejected', async ({ page }) => {
    let formCleared = false;

    page.on('dialog', dialog => {
        if (dialog.message().includes('clear the form')) {
            dialog.dismiss();
            formCleared = false;
            return;
        }
        dialog.accept();
        formCleared = true;
    });
    const nameField = page.getByRole('textbox', { name: 'Name (required):' });
    const emailField = page.locator('#email');
    const emailInvalidError = page.locator('#emailError');
    const commentField = page.locator('#comment');
    const eventHighlights = page.getByRole('textbox', { name: 'Event Highlights (optional)' });
    const areasOfImprovement = page.getByLabel('Areas for Improvement (optional):');
    const tosCheckbox = page.locator('#tos');
    const tosStringExpected = page.getByLabel(`I agree to the site's`);
    const invalidEmailExpectedText = 'Invalid email format';
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const saveButton = page.locator('#saveButton');
    const clearButton = page.locator('#clearButton');


    await page.goto('/FeedBackForm.html');
    await expect(emailInvalidError).not.toBeVisible();
    await expect(tosStringExpected).toBeVisible();

    await nameField.fill('Vick');
    await emailField.fill('Vick@email.com');
    await commentField.fill('This is a test comment');
    await tosCheckbox.check();

    await expect(tosCheckbox).toBeChecked();
    await clearButton.click();
    //rejected the dialog
    await expect(nameField).not.toBeEmpty();
    const isInvalid = await nameField.evaluate(el => !(el as HTMLInputElement).checkValidity());
    expect(isInvalid).toBeFalsy();
    await expect(emailField).not.toBeEmpty();
    await expect(commentField).not.toBeEmpty();
    await expect(areasOfImprovement).toHaveValues([]);
    await expect(tosCheckbox).toBeChecked();
    expect(formCleared).toBeFalsy();
});

test('Form is completed - save data button saves data', async ({ page }) => {
    let formSaved = false;

    page.on('dialog', dialog => {
        dialog.accept();
        formSaved = true;
    });
    const nameField = page.getByRole('textbox', { name: 'Name (required):' });
    const emailField = page.locator('#email');
    const emailInvalidError = page.locator('#emailError');
    const commentField = page.locator('#comment');
    const eventHighlights = page.getByRole('textbox', { name: 'Event Highlights (optional)' });
    const areasOfImprovement = page.getByLabel('Areas for Improvement (optional):');
    const tosCheckbox = page.locator('#tos');
    const tosStringExpected = page.getByLabel(`I agree to the site's`);
    const invalidEmailExpectedText = 'Invalid email format';
    const submitButton = page.getByRole('button', { name: 'Submit' });
    const saveButton = page.locator('#saveButton');
    const clearButton = page.locator('#clearButton');


    await page.goto('/FeedBackForm.html');
    await expect(emailInvalidError).not.toBeVisible();
    await expect(tosStringExpected).toBeVisible();

    await nameField.fill('Vick');
    await emailField.fill('Vick@email.com');
    await commentField.fill('This is a test comment');
    await tosCheckbox.check();

    await expect(tosCheckbox).toBeChecked();
    await saveButton.click();
    await page.reload();
    //Accept dialog (no dismiss displayed)
    await expect(nameField).not.toBeEmpty();
    const isInvalid = await nameField.evaluate(el => !(el as HTMLInputElement).checkValidity());
    expect(isInvalid).toBeFalsy();
    await expect(emailField).not.toBeEmpty();
    await expect(commentField).not.toBeEmpty();
    await expect(areasOfImprovement).toHaveValues([]);
    await expect(tosCheckbox).toBeChecked();
    expect(formSaved).toBeTruthy();
});
