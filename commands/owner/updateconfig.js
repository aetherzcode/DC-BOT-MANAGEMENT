const { SlashCommandBuilder } = require('discord.js');
const Config = require('../../database/models/config'); // Assuming you have a Config model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updateconfig')
        .setDescription('Updates bot configuration settings.')
        .addStringOption(option =>
            option.setName('key')
            .setDescription('Configuration key to update')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('value')
            .setDescription('New value for the configuration key')
            .setRequired(true)),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');

        await Config.updateOne({ key }, { value }, { upsert: true });
        await interaction.reply(`✅ Configuration updated: **${key}** set to **${value}**.`);
    },
};