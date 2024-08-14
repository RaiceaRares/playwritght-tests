import {test, expect} from '@playwright/test';


const providers = [
  { name: "1spin4win", selector: " 1spin4win" ,expectedGames: 119 },
  { name: "1x2 Gaming", selector: " 1x2 Gaming"  ,expectedGames: 81 },
  { name: "5men", selector: " 5men" ,expectedGames:  95 },
  { name: "Absolutely Live Gaming", selector: " Absolutely Live Gaming" ,expectedGames: 1  },
  { name: "Amatic", selector: " Amatic" ,expectedGames: 122 },
  { name: "Atmosfera", selector: " Atmosfera" ,expectedGames:  0 },
  { name: "AvatarUX", selector: " AvatarUX"  ,expectedGames: 33 },
  { name: "Beter.Live", selector: " Beter.Live"  ,expectedGames:0 },
  { name: "Betsoft ", selector: " Betsoft"  ,expectedGames: 226 },
  { name: "BGAMING", selector: " BGAMING" ,expectedGames:  166},
  { name: "Bluebird Gaming", selector: " Bluebird Gaming" ,expectedGames: 18  },
  { name: "Blueprint", selector: " Blueprint" ,expectedGames: 79 },
  { name: "Booongo", selector: " Booongo" ,expectedGames:  94},
  { name: "Evolution Gaming", selector: " Evolution Gaming" ,expectedGames: 216 },
  { name: "Ezugi", selector: " Ezugi"  ,expectedGames: 2},
  { name: "Gamebeat", selector: " Gamebeat"  ,expectedGames: 31},
  { name: "Habanero", selector: " Habanero" ,expectedGames: 196},
  { name: "Holle Games", selector: " Holle Games" ,expectedGames: 79 },
  { name: "Igrosof", selector: " Igrosof"  ,expectedGames: 21},
  { name: "IGTech", selector: " iGTech" ,expectedGames: 47},
  { name: "Jade Rabbit", selector: " Jade Rabbit" ,expectedGames: 5  },
  { name: "KA Gaming", selector: " KA Gaming"  ,expectedGames: 682 },
  { name: "Kalamba", selector: " Kalamba" ,expectedGames:  144 },
  { name: "Lucky", selector: " Lucky" ,expectedGames:  70},
  { name: "Mancala Gaming", selector: " Mancala Gaming" ,expectedGames: 64 },
  { name: "Mascot", selector: " Mascot"  ,expectedGames: 96},
  { name: "MPlay", selector: " MPlay"  ,expectedGames: 18 },
  { name: "MrSlotty", selector: " MrSlotty"  ,expectedGames: 342 },
  { name: "Nolimit City", selector: " Nolimit City" ,expectedGames: 362 },
  { name: "Nucleus", selector: " Nucleus"  ,expectedGames: 400},
  { name: "Platipus", selector: " Platipus"  ,expectedGames: 391},
  { name: "Play'n GO", selector: " Play'n GO"  ,expectedGames: 304 },
  { name: "Playtech", selector: " Playtech"  ,expectedGames: 519},
  { name: "Popiplay", selector: " Popiplay"  ,expectedGames: 43},
  { name: "Pragmatic", selector: " Pragmatic"  ,expectedGames: 431},
  { name: "QTech", selector: " QTech"  ,expectedGames: 0 },
  { name: "Quickspin", selector: " Quickspin" ,expectedGames: 182 },
  { name: "RAW iGaming", selector: " RAW iGaming"  ,expectedGames: 16 },
  { name: "Redgenn", selector: " Redgenn"  ,expectedGames: 48 },
  { name: "Reevo", selector: " Reevo" ,expectedGames:  58},
  { name: "SmartSoft", selector: " SmartSoft"  ,expectedGames: 57 },
  { name: "Spadegaming", selector: " Spadegaming" ,expectedGames: 107 },
  { name: "Spearhead", selector: " Spearhead"  ,expectedGames: 56 },
  { name: "Spinomenal", selector: " Spinomenal" ,expectedGames: 153 },
  { name: "Spinza", selector: " Spinza" ,expectedGames:  30 },
  { name: "Spribe", selector: " Spribe"  ,expectedGames: 9},
  { name: "Swintt", selector: " Swintt" ,expectedGames:  129},
  { name: "Thunderkick", selector: " Thunderkick" ,expectedGames: 81 },
  { name: "Turbo Games", selector: " Turbo Games"  ,expectedGames: 33 },
  { name: "Wazdan", selector: " Wazdan"  ,expectedGames: 449 },
  { name: "Yggdrasil", selector: " Yggdrasil"  ,expectedGames:273 },
];

test('Verify game filters', async({page})  =>{
    await page.goto("https://goldwin.com/games");
    //await page.getByRole("button", { name: "Allow", exact: true }).click();
    for (const provider of providers){
       await page.getByTestId("games-filters-dropdown-button").click();
       await page.getByRole("link", { name: provider.selector }).click();

       await page.waitForLoadState('networkidle');

       while(true) {
        const loadMoreButton = await page.getByTestId('games-grid:load-more').elementHandle();
        if(loadMoreButton){
          await page.evaluate(button =>button.scrollIntoView({behavior : 'smooth', block: 'center'}), loadMoreButton);
          await loadMoreButton.click();
          await page.waitForLoadState('networkidle');
        }else {
          break;
        }
       }

       const games = await page.$$('div.game-card');

       expect(games.length).toBe(provider.expectedGames)

       await page.getByTestId('scroll-to-top').click();
       await page.waitForTimeout(500);

       await page.getByRole('link', {name: 'Clear All'}).click();
       await page.waitForLoadState('networkidle');

    }
})