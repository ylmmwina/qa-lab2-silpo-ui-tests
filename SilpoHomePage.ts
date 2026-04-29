import { Page, Locator } from '@playwright/test';

export class SilpoHomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly priceElement: Locator;
    readonly emptyMessage: Locator;
    readonly langSwitcher: Locator;

    constructor(page: Page) {
        this.page = page;
        // Збираємо всі локатори тут
        this.searchInput = page.locator('input:not([type="hidden"])').first();
        this.priceElement = page.locator('text=грн').first();
        this.emptyMessage = page.getByText(/не знайдено|нічого/i).first();
        this.langSwitcher = page.getByText('EN', { exact: true }).first();
    }

    // Метод для відкриття сторінки
    async goto() {
        await this.page.goto('https://silpo.ua/');
        await this.page.waitForTimeout(3000);
    }

    // Метод для пошуку (один для обох тестів!)
    async searchFor(query: string) {
        await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.searchInput.click({ force: true });
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
    }

    // Метод для зміни мови
    async changeLanguageToEnglish() {
        if (await this.langSwitcher.isVisible()) {
            await this.langSwitcher.click({ force: true });
        }
    }
}