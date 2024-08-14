
import { Page, expect } from "@playwright/test";

export async function testLaunchGame(
  page: Page,
  gameName: string
): Promise<void> {
  await page.click(`text =${gameName}`);
  await expect(page).toHaveURL(new RegExp(`/game/${gameName}`));
  await page.goBack();
}

interface Credentials {
  username: string;
  password: string;
}

interface Config {
  target: string;
  minGamesPerCountry: {
    DE: number;
  };
}

function getCredentials(): Credentials {
  return {
    username: "noitestam121",
    password: "GoldWin2023",
  };
}

function getConfig(): Config {
  return {
    target: "https://goldwin.com/",
    minGamesPerCountry: {
      DE: 10,
    },
  };
}

export { getCredentials, getConfig };
