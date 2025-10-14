import { test, expect } from '@playwright/test';


test('Complex button test - good approach', async ({ page }) => {

  await page.goto('/ComplexButton.html') // 94ms

  const button = page.locator('button')

  await expect(button).toBeVisible() // 1978ms

  await expect(button).toBeEnabled() // 2901ms

  await button.click() // 64ms

  await expect(page.locator('#myLabel')).toBeVisible() // 15ms

})
