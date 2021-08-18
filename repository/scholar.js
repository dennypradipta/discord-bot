const Scholar = require("../models/scholar");

module.exports = {
  async create(interaction) {
    try {
      const { member, data } = interaction;
      const { username, id: discordID } = member.user;
      const teamData = data.options.find((item) => item.name === "team");
      const scholarNumberData = data.options.find(
        (item) => item.name === "scholar_number"
      );

      const result = await Scholar.create(
        {
          username,
          discordID,
          team: teamData.value.toUpperCase(),
          scholarNumber: parseInt(scholarNumberData.value, 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          validate: true,
        }
      );

      return result;
    } catch (error) {
      throw Error(error);
    }
  },
};
