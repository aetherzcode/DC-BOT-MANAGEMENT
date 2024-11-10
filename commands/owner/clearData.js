const { SlashCommandBuilder } = require('discord.js');
const User = require('../../database/models/User'); // Adjust according to your models

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cleardata')
        .setDescription('Clears all user data from the database.'),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        await User.deleteMany({});
        await interaction.reply('All user data has been cleared from the database.');
    },
};