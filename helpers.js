const { doc, setDoc } = require("firebase/firestore");


const addToDb = async (user) => {
    try {
        {
            const data = {name: user.name, elo: user.name, rank: user.rank}
            await setDoc(doc(db, "users", user.name), data);
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// }
const addPlayer = async (tag) => {
    const name = tag.split('#')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://slippi.gg/user/${name[0]}-${name[1]}`)
    // const element = await page.waitForSelector('p > .css-1rxv754');

    const username = await page.$eval('.css-dshe97', (el) => el.innerText);
    console.log(username);
    const ELO = await page.$eval('.css-1rxv754', (el) => el.innerText);
    console.log(ELO);
    const rank = await page.$eval('.css-jh714q', (el) => el.innerText);
    console.log(rank);
    await browser.close();

    addToDb({ name: username, elo: ELO, rank: rank })
}
// getData()
module.exports = addPlayer;