# Slippi Leaderboard Discord bot

A discord bot that webscrapes profiles of slippi users and fetches the rank, name and elo each player has and sorts them from highest elo to lowest elo.

Currently it is troublesome to look for your friends profiles since the page has no search functionality and profiles can only be found through editting the URL path

The webscraping is done through puppeteer and the framework used is discord.js. Each player is saved to the a firebase firestore backend.

# Commands
![image](https://user-images.githubusercontent.com/63982069/211643679-b396c705-90c5-464e-905b-0aee294388ad.png)

# Exampe of web page that is scraped

![image](https://user-images.githubusercontent.com/63982069/211643834-a520d088-2e59-489e-af11-2308df7e8693.png)


# Dependencies
    "discord.js": "^14.7.1",
    "firebase": "^9.15.0",
    "puppeteer": "^19.4.1"
