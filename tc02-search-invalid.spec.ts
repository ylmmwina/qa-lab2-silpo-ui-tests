import { test, expect } from '@playwright/test';
import { SilpoHomePage } from './SilpoHomePage';

test.use({ channel: 'chrome' });
test.describe.configure({ timeout: 60000 });

test('TC-02: Search with invalid query', async ({ page }) => {
    const homePage = new SilpoHomePage(page);
    await homePage.goto();
    await homePage.searchFor('qwerty12345');
    await expect(homePage.emptyMessage).toBeVisible({ timeout: 15000 });
});