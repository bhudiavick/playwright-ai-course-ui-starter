import { Page, expect } from '@playwright/test';

export class ContactPage {
    constructor(private page: Page) {

    }

async fillOrderIdAndEmail(orderId: string, email: string) {
    await this.page.getByAnyTestId("contact-order-id-input").fill(orderId);
    await this.page.getByAnyTestId("contact-email-input").fill(email);    
}

async clickTrackOrder() {
    await this.page.getByAnyTestId("contact-track-order-button").click();  
}
}