import { test, expect } from '@playwright/test';
import { ProductsPage } from './test-exercise-shopping-pages/ProductsPage'
import { CartPage } from './test-exercise-shopping-pages/CartPage'

test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('https://valentinos-magic-beans.click/products');
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);


    const addedProduct = await productsPage.addProductToCart(1);

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await cartPage.assertProduct(addedProduct.name!)
    //if page object method returns an object then would use {subTotal}
    // export async function getSubTotal(page: Page): Promise<{ subTotal: number }> 
    // { const subTotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold') 
    // const subTotalText = await subTotalWrapper.textContent(); 
    // //return Number(subtotal?.substring(1)) 
    // //If your site uses commas or spaces in price text, sanitize safely:
    //  const subTotal = Number(subTotalText?.replace(/[^0-9.]/g, ''));
    //  return {subTotal}; }


    // const {subTotal} = await cart.getSubTotal(page)
    const subTotal = await cartPage.getSubTotal()

    expect(subTotal).toBe(addedProduct.price);

})