import { test, expect } from '@playwright/test';
import { MainPage } from '../page_objects/main-page';
import { SupportPage } from '../page_objects/support-page';

test('Go to Doplňkové služby', async ({ page }) => {
  const support = new SupportPage(page);
  await support.gotoCZ();
  await support.goToDopSluzby();
  });

test('Redirect to main page - CZ', async ({ page }) => {
  const main = new MainPage(page);
  const support = new SupportPage(page);
  await support.gotoCZ();
  await support.gotoappCZ();
  await main.verifyPageURL();
})

test('Redirect to main page - EN', async ({ page }) => {
  const main = new MainPage(page);
  const support = new SupportPage(page);
  await support.gotoEN();
  await support.gotoappEN();
  await main.verifyPageURL();
})

test('Assert count of attachments on Ceníky půjčovného page', async ({ page }) => {
  const support = new SupportPage(page);
  await support.gotoCZ();
  await support.goToCenikyPujcovneho();
  await support.assertCountofImages();
  await support.verifyPageSnapshot();
  });

test('Test capture screenshot on failing one test', async ({ page }) => {
  const support = new SupportPage(page);
  await support.gotoCZ();
  await support.gotoappEN();
});
