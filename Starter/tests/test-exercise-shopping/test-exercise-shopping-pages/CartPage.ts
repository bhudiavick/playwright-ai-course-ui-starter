import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {

    }

async  assertProduct(heading: string) {
    const firstProductHeading = this.page.getByRole('heading', {
        name: heading
    })
    await expect(firstProductHeading).toBeVisible()
}

async  getSubTotal(): Promise<number> {
    const subTotalWrapper =this.page.getByText('Subtotal').locator('..').locator('.font-semibold')
    const subTotalText = await subTotalWrapper.textContent();
    //return Number(subtotal?.substring(1))
    //If your site uses commas or spaces in price text, sanitize safely:
    return Number(subTotalText?.replace(/[^0-9.]/g, ''));
}
}