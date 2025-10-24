import type { Page } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) { }

    // 🧩 Test data for checkout form
    private testValues = {
        firstName: 'Vick',
        lastName: 'Bhudia',
        email: 'bhudia@email.com',
        address: 'Some street 1',
        city: 'New York',
        zipCode: '12345',
        country: 'United States',
        payment: {
            nameOnCard: 'Sefu',
            cardNumber: '1234 4567 1234 5678',
            expiry: '01/30',
            cvc: '123'
        }
    };

    async getTestValues(): Promise<typeof this.testValues> {
        return this.testValues;
    }
    // 🧠 Contact Information
    async addContactInfo() {
        const { page, testValues } = this;
        await page.getByAnyTestId('checkout-firstname-input').fill(testValues.firstName);
        await page.getByAnyTestId('checkout-lastname-input').fill(testValues.lastName);
        await page.getByAnyTestId('checkout-email-input').fill(testValues.email);
    }

    // 🧱 Shipping Address
    async addShippingAddress() {
        const { page, testValues } = this;
        await page.getByAnyTestId('checkout-address-input').fill(testValues.address);
        await page.getByAnyTestId('checkout-city-input').fill(testValues.city);
        await page.getByAnyTestId('checkout-zipcode-input').fill(testValues.zipCode);
        await page.getByAnyTestId('checkout-country-input').fill(testValues.country);
    }

    // 💳 Payment Information
    async addPaymentInfo() {
        const { page, testValues } = this;
        await page.getByAnyTestId('checkout-cardname-input').fill(testValues.payment.nameOnCard);
        await page.getByAnyTestId('checkout-cardnumber-input').fill(testValues.payment.cardNumber);
        await page.getByAnyTestId('checkout-cardexpiry-input').fill(testValues.payment.expiry);
        await page.getByAnyTestId('checkout-cardcvc-input').fill(testValues.payment.cvc);
    }

    // 🛒 Final action
    async placeOrder() {
        await this.page.getByAnyTestId('place-order-button').click();
    }
}
