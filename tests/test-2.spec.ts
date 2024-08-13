import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://goldwin.com/');
  await page.getByTestId('header:log-in').click();
  await page.getByTestId('login:username').fill('noitestam121');
  await page.getByTestId('login:password').click();
  await page.getByTestId('login:password').fill('GoldWin2023');
  await page.getByTestId('login:log-in').click();
  await page.goto('https://goldwin.com/games');
  await page.getByTestId('footer:accept-cookies').click();
  await page.getByTestId('games-game-card-overlay').click();
});