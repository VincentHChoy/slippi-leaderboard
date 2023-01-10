const puppeteer = require('puppeteer');
const { doc, setDoc, getDocs, collection } = require("firebase/firestore");
const {db} = require('./db')

const addToDb = async (user) => {
  try {
    {
      const data = { name: user.name, elo: user.elo, rank: user.rank, tag: user.tag};
      console.log(data)
      await setDoc(doc(db, "users", user.name), data);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addPlayer = async (tag) => {

  const name = tag.split("#");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let result = ''
  await page.goto(`https://slippi.gg/user/${name[0]}-${name[1]}`);

  try {
    {
        const username = await page.$eval(".css-dshe97", (el) => el.innerText);
        console.log(username);
        const ELO = await page.$eval(".css-1rxv754", (el) => el.innerText);
        console.log(ELO);
        const rank = await page.$eval(".css-jh714q", (el) => el.innerText);
        console.log(rank);
        await browser.close();
        const eloToNum = +ELO.split(' ')[0]
        addToDb({ name: username, elo: eloToNum, rank: rank, tag:tag });
        result = 'Sucessfully added player!'

    }
  } catch (e) {
    console.error("Error adding document: ", e);
    result = 'Failed to add player!'
  }
  return result
};

const showLeaderboard = async () =>{
    const leaderboard = [];
    const result = [];

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      leaderboard.push(data)
      // doc.data() is never undefined for query doc snapshots
      // leaderboard.push(`${data.name} - ${data.rank} - ${data.elo}`);
    });
    const sortedLeaderboard = leaderboard.sort((a,b)=>{
      return b.elo - a.elo
    })
    console.log(sortedLeaderboard,'LOOK AT ME ITS MR MEESEEKS')

    for (const player of sortedLeaderboard) {
      result.push(`${player.name} - ${player.rank} - ${player.elo}`);
    }
    return result
}

const updateLeaderboard = async () =>{
  const tags = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
      let data = doc.data()
      tags.push(data.tag)
  });
  for (const player of tags) {
    addPlayer(player)
  }
}
module.exports = {addPlayer, showLeaderboard, updateLeaderboard};
