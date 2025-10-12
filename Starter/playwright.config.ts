import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  projects: [
    {
      name: 'root-tests',
      testDir: './tests',
    },
    {
      name: 'starter-tests',
      testDir: './playwright-course/Starter/tests',
    },
    {
      name: 'locator-tests',
      testDir: './playwright-course/Starter/tests/locators',
    }

  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:5000',
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://localhost:5000',
    headless: false
  }
});
