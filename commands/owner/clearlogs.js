const { SlashCommandBuilder } = require('discord.js');
const Log = require('../../database/models/log'); // Assuming you have a Log model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearlogs')
        .setDescription('Clears all logs from the database.'),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        await Log.deleteMany({});
        await interaction.reply('✅ All logs have been cleared.');
    },
};