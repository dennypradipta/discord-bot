const axios = require("axios").default;
const dotenv = require("dotenv");

dotenv.config();
const { DISCORD_APP_ID, DISCORD_BOT_TOKEN } = process.env;

module.exports = {
  async globalGet() {
    try {
      const { data } = await axios.get(
        `https://discord.com/api/v8/applications/${DISCORD_APP_ID}/commands`,
        {
          headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw Error(error);
    }
  },
  async globalCreate(data) {
    try {
      const { name, description, options } = data;
      const body = options
        ? {
            name,
            description,
            options,
          }
        : {
            name,
            description,
          };

      const { data } = await axios.post(
        `https://discord.com/api/v8/applications/${DISCORD_APP_ID}/commands`,
        body,
        {
          headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw Error(error);
    }
  },
  async globalUpdate(commandID, data) {
    try {
      const { name, description, options } = data;
      const body = options
        ? {
            name,
            description,
            options,
            default_permission: true,
          }
        : {
            name,
            description,
            default_permission: true,
          };

      const { data } = await axios.patch(
        `https://discord.com/api/v8/applications/${DISCORD_APP_ID}/commands/${commandID}`,
        body,
        {
          headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            Accept: "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      throw Error(error);
    }
  },
  async guildCreate(guildID, data) {
    try {
      const { name, description, options } = data;
      const body = options
        ? {
            name,
            description,
            options,
          }
        : {
            name,
            description,
          };

      const { data } = await axios.post(
        `https://discord.com/api/v8/applications/${DISCORD_APP_ID}/guilds/${guildID}/commands`,
        body,
        {
          headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      throw Error(error);
    }
  },
  async post(interactionID, interactionToken, content) {
    try {
      const { data } = await axios.post(
        `https://discord.com/api/v8/interactions/${interactionID}/${interactionToken}/callback`,
        {
          type: 4,
          data: {
            content: content,
          },
        },
        {
          headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            Accept: "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      throw Error(error);
    }
  },
};
