import { test, expect } from '@playwright/test';
import * as products from './test-exercise-shopping-pages/ProductsPage'
import * as cart from './test-exercise-shopping-pages/CartPage'

test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('https://valentinos-magic-beans.click/products');

    const addedProduct = await products.addProductToCart(page, 1);

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await cart.assertProduct(page, addedProduct.name!)

    const subtotal = await cart.getSubTotal(page)

    expect(subtotal).toBe(addedProduct.price)




})