// import { test, expect } from '@playwright/test';
import { test, expect } from './../support/extendPage';
import { ProductsPage } from './test-exercise-shopping-pages/ProductsPage'
import { CartPage } from './test-exercise-shopping-pages/CartPage'
import { CheckoutPage } from './test-exercise-shopping-pages/CheckoutPage'
import { ContactPage } from './test-exercise-shopping-pages/ContactPage'


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

});

test('Complete workflow for product order', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const contactPage = new ContactPage(page);

    await page.goto('https://valentinos-magic-beans.click/products');

    const addedProduct = await productsPage.addProductToCart(1);

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
    await cartPage.assertProduct(addedProduct.name!)

    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    await checkoutPage.addContactInfo()
    await checkoutPage.addPaymentInfo()
    await checkoutPage.addShippingAddress()
    await checkoutPage.placeOrder()

    // get orderId:
    const orderWrapper = page.getByText('Your Order ID is:').locator('..')
    const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent()

    // open the contact page:
    await page.getByRole('button', { name: 'Track Your Order' }).click();
    const testValues = await checkoutPage.getTestValues();
    await contactPage.fillOrderIdAndEmail(orderId!, testValues.email)
    await contactPage.clickTrackOrder()

    // check if ordered item is returned:
    const firstOrder = page.getByText(addedProduct.name!)
    await expect(firstOrder).toBeVisible()
})

test('Complete workflow for product order - with steps', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const contactPage = new ContactPage(page);

    await page.goto('https://valentinos-magic-beans.click/products');

    let addedProduct: Awaited<ReturnType<typeof productsPage.addProductToCart>> = {} as any;

    await test.step('add product to cart', async () => {
        addedProduct = await productsPage.addProductToCart(1);
    })

    await test.step('go to checkout page', async () => {
        await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    })

    await test.step('complete checkout information', async () => {
        await checkoutPage.addContactInfo()
        await checkoutPage.addPaymentInfo()
        await checkoutPage.addShippingAddress()
        await checkoutPage.placeOrder()
    })

    let orderId: string | null;

    await test.step('get the orderID', async () => {
        const orderWrapper = page.getByText('Your Order ID is:').locator('..')
        orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent()
    })

    await test.step('open the contact page', async () => {
        await page.getByRole('button', { name: 'Track Your Order' }).click();
        const testValues = await checkoutPage.getTestValues();
        await contactPage.fillOrderIdAndEmail(orderId!, testValues.email)
        await contactPage.clickTrackOrder()
    })

    await test.step('check if ordered item is returned', async () => {
        const firstOrder = page.getByText(addedProduct.name!)
        await expect(firstOrder).toBeVisible()
    })
})