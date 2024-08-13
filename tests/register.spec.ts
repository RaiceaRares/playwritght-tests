import { test, expect } from '@playwright/test';
const randomName = require ('random-name');

test('test', async ({ page }) => {
  const email = randomName.first().toLowerCase() + "@example.com";
  //let username = randomName.first().toLowerCase();
  //while (username.length < 5) {
  //username = randomName.first().toLowerCase();
  const username = `testuser_${Math.random().toString(36).substring(2, 15)}`;
  //}
  await page.goto("https://goldwin.com/");
  //await page.getByRole("button", { name: "Allow", exact: true }).click();
  await page.getByTestId("footer:accept-cookies").click();
  await page.getByTestId("header:sign-up").click();
  await page.getByTestId("register:enter-your-username").click();
  await page.getByTestId("register:enter-your-username").fill(username);
  await page.getByTestId("register:currency").locator("div").click();
  await page.getByTestId("register:currency-EUR").click();
  await page.getByTestId("register:email").click();
  await page.getByTestId("register:email").fill(email);
  await page.getByTestId("register:password").click();
  await page.getByTestId("register:password").fill("1Qazxsw2");
  await page
    .locator("label")
    .filter({ hasText: "I am over 18 years of age. I" })
    .locator("div")
    .click();
  await page.getByTestId("register:continue").click();
  await page.getByTestId("register:first-name").fill("test");
  await page.getByTestId("register:last-name").click();
  await page.getByTestId("register:last-name").fill("games");
  await page.getByTestId("register:mobile").click();
  await page.waitForTimeout(1000);
  await page.getByTestId("register:mobile").fill("1234567890");
  await page.getByTestId("register:date").fill("1999-08-12");
  await page.pause();
  await page.getByTestId("register:gender").locator("i").click();
  await page.getByTestId("register:gender-M").click();
  await page.getByTestId("register:address").click();
  await page.getByTestId("register:address").fill("adresa");
  await page.getByTestId("register:city").click();
  await page.getByTestId("register:city").fill("oras");
  await page.getByTestId("register:postal-code").click();
  await page.getByTestId("register:postal-code").fill("123456");
  await page.getByTestId("register:continue").click();
  await page.getByTestId("verify-email:verify-email").click();
  await expect(
    page.getByText(
      ".st0{fill:#1F2331;} .st1{fill:#E1AB46;} Verify your emailYou need to verify"
    )
  ).toBeVisible();
});