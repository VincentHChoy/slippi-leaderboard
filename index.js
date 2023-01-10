// import db from "./db"
// import { clientId, guildId, token } from './config.json'
const { REST, Routes } = require("discord.js");
const { addPlayer, showLeaderboard, updateLeaderboard } = require("./helpers");
const { token, clientId } = require("./config.json");
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "add",
    type: 1,
    description: "adds player to leaderboard",
    options: [
      {
        name: "tag",
        description: "a slippi tag to be added to the leaderboard",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "leaderboard",
    description: "shows the slippi leaderboard",
  },
  {
    name: "update",
    description: "update the slippi leaderboard",
  },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const { clientId, GatewayIntentBits } = require("discord.js");
const clientId = new clientId({ intents: [GatewayIntentBits.Guilds] });

clientId.on("ready", () => {
  console.log(`Logged in as ${clientId.user.tag}!`);
});

clientId.on("interactionCreate", async (interaction) => {
  const { commandName, options } = interaction;

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "add") {
    const tag = options.getString("tag");
    const result = await addPlayer(tag);

    await interaction.reply(result);
  }
  if (interaction.commandName === "leaderboard") {
    const list = await showLeaderboard();
    let msg = "";
    for (const player of list) {
      msg += player + "\n";
    }
    await interaction.reply(msg);
  }

  if (interaction.commandName === "update") {
    updateLeaderboard();
    await interaction.reply("Leaderboard updated!");
  }
});

clientId.login(token);
