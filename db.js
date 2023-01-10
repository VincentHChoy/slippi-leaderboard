const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBkQ-dEUw_zxgbAjKf-Siyz4y_jpau461Q",
  authDomain: "slippi-leaderboard-a6d80.firebaseapp.com",
  projectId: "slippi-leaderboard-a6d80",
  storageBucket: "slippi-leaderboard-a6d80.appspot.com",
  messagingSenderId: "954710948059",
  appId: "1:954710948059:web:158aaf4bc8a419844474fe",
  measurementId: "G-XP529TPX2K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
