import { test, expect } from '@playwright/test';
import { MainPage } from '../page_objects/main-page';

test('Page correctly translated to the default language - EN', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();
  await main.verifyCurrentLangEng();
});

test('Page correctly translated to the selected language - CZ', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();
  await main.switchLang();
  await main.verifyCurrentLangCz();
});