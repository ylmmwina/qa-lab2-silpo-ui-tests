import { test, expect } from '@playwright/test';

test.use({ channel: 'chrome' });
test.describe.configure({ timeout: 60000 });

test.describe('Silpo.ua UI Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://silpo.ua/');
        await page.waitForTimeout(3000);
    });

    // Тест 1 (TC-01): Пошук існуючого товару [ПРАЦЮЄ]
    test('TC-01: Search for an existing product', async ({ page }) => {
        const searchInput = page.locator('input:not([type="hidden"])').first();
        await searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await searchInput.click({ force: true });
        await searchInput.fill('Банан');
        await searchInput.press('Enter');

        const priceElement = page.locator('text=грн').first();
        await expect(priceElement).toBeVisible({ timeout: 15000 });
    });

    // Тест 2 (TC-02): Пошук за невалідним запитом [ПРАЦЮЄ]
    test('TC-02: Search with invalid query', async ({ page }) => {
        const searchInput = page.locator('input:not([type="hidden"])').first();
        await searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await searchInput.click({ force: true });
        await searchInput.fill('qwerty12345');
        await searchInput.press('Enter');

        const emptyMessage = page.getByText(/не знайдено|нічого/i).first();
        await expect(emptyMessage).toBeVisible({ timeout: 15000 });
    });

    // Тест 4 (TC-09): Перехід у категорію через головне меню [ОНОВЛЕНО]
    test('TC-09: Navigate to category via catalog menu', async ({ page }) => {
        // Шукаємо текст Каталог або Всі товари
        const catalogButton = page.getByText(/Всі товари|Каталог|Catalog/i).first();
        await catalogButton.waitFor({ state: 'visible', timeout: 15000 });
        await catalogButton.click({ force: true });

        const categoryLink = page.locator('a').filter({ hasText: /Випічка|Овочі|Фрукти|М'ясо/i }).first();
        await categoryLink.waitFor({ state: 'visible', timeout: 15000 });
        await categoryLink.click({ force: true });

        await expect(page).toHaveURL(/category|catalog/i, { timeout: 15000 });
    });

    // Тест 5 (TC-10): Зміна мови інтерфейсу [ПРАЦЮЄ]
    test('TC-10: Change interface language', async ({ page }) => {
        const langSwitcher = page.getByText('EN', { exact: true }).first();

        if (await langSwitcher.isVisible()) {
            await langSwitcher.click({ force: true });
            await expect(page.locator('body')).toContainText(/Cart|Search|All/i, { timeout: 15000 });
        }
    });

});