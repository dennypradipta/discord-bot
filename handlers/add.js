const ScholarRepository = require("../repository/scholar");
const logger = require("../utils/logger");

module.exports = {
  name: "add",
  description: "Add new Scholar",
  allowedRoles: [],
  options: [
    {
      name: "user",
      description: "Which user should be added as a new Scholar",
      type: 6,
      required: true,
    },
    {
      name: "team",
      description: "Which team should user be placed",
      type: 3,
      required: true,
    },
    {
      name: "scholar_number",
      description: "The scholar number",
      type: 4,
      required: true,
    },
  ],
  async execute(interaction) {
    try {
      const result = await ScholarRepository.create(interaction);

      if (!result) {
        throw Error(e);
      }

      const { username, discordID, team, scholarNumber } = result;

      return `User ${username} with ID ${discordID} has been added to ${team} Team with Scholar Number ${scholarNumber} :partying_face:`;
    } catch (e) {
      logger.error(e.message);
      throw Error(`Cannot add user to Scholars list because of ${e.message}`);
    }
  },
};
