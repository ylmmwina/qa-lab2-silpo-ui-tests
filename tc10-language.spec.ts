import { test, expect } from '@playwright/test';
import { SilpoHomePage } from './SilpoHomePage';

test.use({ channel: 'chrome' });

test('TC-10: Change interface language', async ({ page }) => {
    const homePage = new SilpoHomePage(page);
    await homePage.goto();
    await homePage.changeLanguageToEnglish();
    await expect(page.locator('body')).toContainText(/Cart|Search|All/i, { timeout: 15000 });
});