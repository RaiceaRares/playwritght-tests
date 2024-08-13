import {Page, expect} from '@playwright/test'

export async function testLaunchGame(page : Page, gameName: string): Promise <void>{
    await page.click('text =${gameName}');
    await expect(page).toHaveURL(new RegExp('/game/${gameName}'));
    await page.goBack();
}