const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('Sets a custom status for the bot.')
        .addStringOption(option =>
            option.setName('status')
            .setDescription('The status message to set')
            .setRequired(true)),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const status = interaction.options.getString('status');
        await interaction.client.user.setPresence({ activities: [{ name: status }], status: 'online' });
        await interaction.reply(`✅ Status set to: **${status}**`);
    },
};