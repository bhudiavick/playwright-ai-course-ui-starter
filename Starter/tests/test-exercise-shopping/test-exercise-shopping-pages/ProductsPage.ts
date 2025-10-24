import { type Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {

    }
    async addProductToCart(index: number): Promise<{ name: string | null; price: number | null }> {

        const productWrapper = this.page.locator('.p-6').nth(index)
        const productName = await productWrapper.getByRole('heading').first().textContent()
        const productPrice = await productWrapper.locator('.font-bold').textContent()
        const firstButton = productWrapper.getByRole('button', {
            name: 'Add to Cart'
        })

        await firstButton.click()

        return {
            name: productName,
            price: Number(productPrice?.substring(1))
        }

    }
}