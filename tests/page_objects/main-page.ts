import { expect, Locator, Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly accountLink: Locator;
  readonly autixLogo: Locator;
  readonly currentLang: Locator;
  readonly czLang: Locator;
  readonly langDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountLink = page.getByRole('link', { name: 'Account', exact: true });
    this.autixLogo = page.getByRole('link', { name: 'logo' });
    this.currentLang = page.getByRole('link', { name: 'en_GB EN' });
    this.czLang = page.getByRole('link', { name: 'cs_CZ CS' });
    this.langDropdown = page.locator('#shortcode-256-9');
  }

  async goto() {
    await this.page.goto('https://autix.eu');
    this.verifyMainPageCorrectlyOpened();
    this.verifyPageURL();
  }

  async verifyPageURL() {
    await expect(this.page).toHaveURL('https://autix.eu/');
  }

  async verifyMainPageCorrectlyOpened() {
    await expect(this.accountLink).toBeVisible();
    await expect(this.autixLogo).toBeVisible();
    await expect(this.page).toHaveTitle('AUTiX - ONLINE BUSINESS MANAGEMENT SYSTEM');
  }

  async switchLang() {
    await this.langDropdown.hover();
    await this.czLang.click();
  }

  async verifyCurrentLangEng() {
    await expect(this.currentLang).toBeVisible();
    await expect(this.page.getByText('AUTiXBMSOnline business management systemAutix BMS is a modern and comprehensive')).toBeVisible();
    await expect(this.page.getByText('business management systemModern BMS as a SaaS solutionEffective company managem')).toBeVisible();
    await expect(this.page.getByText('AUTiX featuresOnline. Modern. Available. Variable. Safe. Comprehensive. Flexible')).toBeVisible();
  }

  async verifyCurrentLangCz() {
    await expect(this.czLang).toBeVisible();
    await expect(this.page.getByText('AUTiXBMSOnline business management systemAutix BMS je moderní a komplexní online')).toBeVisible();
    await expect(this.page.getByText('business management systemModerní BMS formou SaaS řešeníEfektivní řízení firmyDa')).toBeVisible();
    await expect(this.page.getByText('business management systemOnline BMSKontrola zaměstnanců a minimalizace ztrátOn-')).toBeVisible();
  }
}