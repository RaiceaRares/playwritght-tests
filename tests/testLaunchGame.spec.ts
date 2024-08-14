import { test, expect } from "@playwright/test";
import { getCredentials, getConfig, testLaunchGame} from "./utils"; // importă funcțiile din utils.ts

test("Verify games page and launch games", async ({ page }) => {
  const credentials = getCredentials();
  const config = getConfig();

  await page.goto(config.target);

  await page.getByTestId("header:log-in").click();
  await page.getByTestId("login:username").fill(credentials.username);
  await page.getByTestId("login:password").click();
  await page.getByTestId("login:password").fill(credentials.password);
  await page.getByTestId("login:log-in").click();

  await page.goto(`${config.target}/games`);

  const games = await page.$$eval("div.game-card", (cards) => {
    return cards.map((card) => (card as HTMLElement).textContent?.trim() || "");
  });

  expect(games.length).toBeGreaterThan(config.minGamesPerCountry.DE);

  for (let game of games) {
    await testLaunchGame(page, game);
  }
});
