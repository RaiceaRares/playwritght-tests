import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://goldwin.com/');
  //await page.getByRole('button', { name: 'Don\'t allow' }).click();
  await page.getByTestId('header:log-in').click();
  await page.getByTestId('login:username').fill('noitestam121');
  await page.getByTestId('login:password').click();
  await page.getByTestId('login:password').fill('GoldWin2023');
  await page.getByTestId('login:log-in').click();
  await expect(page.getByTestId('balance-hover-container')).toBeVisible();
});