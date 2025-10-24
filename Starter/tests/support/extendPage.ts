import { test as base, Page, Locator } from '@playwright/test';

// Extend Playwright's Page type for TypeScript
declare module '@playwright/test' {
  interface Page {
    getByAnyTestId(testId: string): Locator;
  }
}

// Create a new test fixture with page extended at runtime
export const test = base.extend<{
  page: Page & { getByAnyTestId(testId: string): Locator };
}>({
  page: async ({ page }, use) => {
    // ✅ Runtime implementation
    page.getByAnyTestId = function (testId: string): Locator {
      return this.locator(`[data-testid="${testId}"], [data-test-id="${testId}"]`);
    };
    await use(page);
  },
});

export { expect } from '@playwright/test';
