import { test, expect } from '@playwright/test';
import { SilpoHomePage } from './SilpoHomePage';

test.use({ channel: 'chrome' });
test.describe.configure({ timeout: 60000 });

test('TC-01: Search for an existing product', async ({ page }) => {
    const homePage = new SilpoHomePage(page);
    await homePage.goto();
    await homePage.searchFor('Банан');
    await expect(homePage.priceElement).toBeVisible({ timeout: 15000 });
});