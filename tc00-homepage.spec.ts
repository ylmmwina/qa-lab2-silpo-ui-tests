import { test, expect } from '@playwright/test';
import { SilpoHomePage } from './SilpoHomePage';

test.use({ channel: 'chrome' });

test('TC-00: Homepage loads successfully', async ({ page }) => {
    const homePage = new SilpoHomePage(page);
    await homePage.goto();
    await expect(page).toHaveTitle(/Сільпо/i);
});