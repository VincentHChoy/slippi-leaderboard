// Import puppeteer
import puppeteer from 'puppeteer';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBkQ-dEUw_zxgbAjKf-Siyz4y_jpau461Q",
    authDomain: "slippi-leaderboard-a6d80.firebaseapp.com",
    projectId: "slippi-leaderboard-a6d80",
    storageBucket: "slippi-leaderboard-a6d80.appspot.com",
    messagingSenderId: "954710948059",
    appId: "1:954710948059:web:158aaf4bc8a419844474fe",
    measurementId: "G-XP529TPX2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const users = [];

const addPlayer = async (user) => {

    try {
        {
            const data = {name: user.name, elo: 1900, rank: user.rank}
            await setDoc(doc(db, "users", user.name), data);
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// }

const getPlayer = async (tag) => {
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
    addPlayer({ name: username, elo: ELO, rank: rank })

}
getPlayer('kase#672')
// getData()

