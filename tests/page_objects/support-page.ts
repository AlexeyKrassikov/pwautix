import { expect, Locator, Page } from '@playwright/test';
import { MainPage } from '../page_objects/main-page';

export class SupportPage {
  readonly page: Page;
  readonly autopujcovnaLink: Locator;
  readonly dopSluzbyLink: Locator;
  readonly cenikyPujcovnehoLink: Locator;
  readonly cenikyPujcovnehoHeader: Locator;
  readonly dopSluzbyHeader: Locator;
  readonly autixLogo: Locator;
  readonly goToAppCZLink: Locator;
  readonly goToAppENLink: Locator;
  readonly imgLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.autopujcovnaLink = page.getByRole('link', { name: 'Autopůjčovna' });
    this.dopSluzbyLink = page.getByRole('link', { name: 'Doplňkové služby' });
    this.cenikyPujcovnehoLink = page.getByRole('link', { name: 'Ceníky půjčovného' });
    this.dopSluzbyHeader = page.getByRole('heading', { name: 'Doplňkové služby' });
    this.cenikyPujcovnehoHeader = page.getByRole('heading', { name: 'Ceníky půjčovného' });
    this.autixLogo = page.getByRole('link').first();
    this.goToAppENLink = page.getByRole('link', { name: ' Go back to application' });
    this.goToAppCZLink = page.getByRole('link', { name: 'Autix' });
    this.imgLocator = page.locator('.image > img');
  }

  async gotoCZ() {
    await this.page.goto('https://help.autix.eu/cs');
    this.verifySupportPageCorrectlyOpened();
  }

  async gotoEN() {
    await this.page.goto('https://help.autix.eu/en');
    this.verifySupportPageCorrectlyOpened();
  }

  async verifySupportPageCorrectlyOpened() {
    await expect(this.autixLogo).toBeVisible();
  }

  async gotoappEN() {
    await this.goToAppENLink.click();
  }

  async gotoappCZ() {
    await this.goToAppCZLink.click();
  }

  async goToDopSluzby() {
    await this.autopujcovnaLink.click();
    await this.dopSluzbyLink.click();
    await expect(this.page).toHaveTitle('Doplňkové služby - Centrum pomoci');
    await expect(this.dopSluzbyHeader).toBeVisible();
  }

  async goToCenikyPujcovneho() {
    await this.autopujcovnaLink.click();
    await this.cenikyPujcovnehoLink.click();
    await expect(this.page).toHaveTitle('Ceníky půjčovného - Centrum pomoci');
    await expect(this.cenikyPujcovnehoHeader).toBeVisible();
  }

  async assertCountofImages() {
    await expect(this.imgLocator).toHaveCount(5);
  }

  async verifyPageSnapshot() {
    await expect(this.page).toHaveScreenshot('ceniky_pujcovneho.png');
  }
}