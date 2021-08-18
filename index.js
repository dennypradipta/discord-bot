const { Client } = require("discord.js");
const dotenv = require("dotenv");
const commands = require("./commands");
const db = require("./utils/db");
const logger = require("./utils/logger");
const SlashCommand = require("./utils/slash");

// Models
require("./models/scholar");

// Initiate from ENV
dotenv.config();
const { DISCORD_APP_ID, DISCORD_BOT_TOKEN } = process.env;

// Login to Bot Account
const bot = new Client();
bot.login(DISCORD_BOT_TOKEN);

// Listen to when bot is ready
bot.on("ready", async () => {
  try {
    // Connect to DB
    await db.sync({ force: true });
    logger.success("Connect to DB");

    logger.success(`Log in as ${bot.user.tag}`);

    // Get all globals command
    const availableCommands = await SlashCommand.globalGet(
      DISCORD_APP_ID,
      DISCORD_BOT_TOKEN
    );

    // Map commands to be run later
    Object.keys(commands).map(async (key) => {
      const { name, description, options } = commands[key];
      const foundCommand = availableCommands.find((c) => c.name === name);

      if (!foundCommand) {
        // New command

        // // Create command for global use
        // await SlashCommand.globalCreate({
        //   name,
        //   description,
        //   options,
        // });

        // Create command for guilds use
        const guildID = bot.guilds.cache.first().id;
        await SlashCommand.guildCreate(guildID, {
          name,
          description,
          options,
        });

        logger.success(`Create command ${name}`);
      } else {
        logger.log(`Command ${name} is already defined, moving on...`);
      }
    });
  } catch (error) {
    logger.error(error);
    process.exit(0);
  }
});

bot.ws.on("INTERACTION_CREATE", async (interaction) => {
  try {
    const { id, username, discriminator } = interaction.member.user;
    const foundKey = Object.keys(commands).find(
      (c) => c === interaction.data.name
    );

    if (!foundKey) {
      // Command not found
      await SlashCommand.post(
        interaction.id,
        interaction.token,
        "Invalid command :confused: Please refer to /help"
      );
    } else {
      // Command found
      const command = commands[foundKey];
      const { name, execute } = command;

      // Execute the command
      // Return the result to channel
      const result = await execute(interaction, bot);
      logger.success(
        `Command "${name}" by ${username}#${discriminator} with ID ${id}`
      );
      await SlashCommand.post(interaction.id, interaction.token, result);
    }
  } catch (error) {
    await SlashCommand.post(interaction.id, interaction.token, error.message);
  }
});
