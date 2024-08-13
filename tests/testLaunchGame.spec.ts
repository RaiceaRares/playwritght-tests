import {test, expect} from '@playwright/test';
import * as fs from 'fs';
import {testLaunchGame } from './utils';


interface Credentials {
    username: string;
    password: string;
}

interface Config {
    target: string;
    minGamesPerCountry: {
        DE: number;
    }
}

test('Verify games page and launch games', async ({page}) =>{
    const credentials : Credentials = JSON.parse(fs.readFileSync('./userCredentials.json', 'utf-8'));
    const config: Config = JSON.parse(
      fs.readFileSync("../config.json", "utf-8")
    );

    await page.goto("${config.target}");
     await page.getByTestId("header:log-in").click();
     await page.getByTestId("login:username").fill("noitestam121");
     await page.getByTestId("login:password").click();
     await page.getByTestId("login:password").fill("GoldWin2023");
     await page.getByTestId("login:log-in").click();

    await page.goto('${config.target}/games');

    const games = await page.$$eval('div.game-card', cards => {
  return cards
    .map(card => (card as HTMLElement).textContent?.trim() || '');
    });

    expect(games.length).toBeGreaterThan(config.minGamesPerCountry.DE);

    for (let game of games) {
        await testLaunchGame(page, game);
    }
});