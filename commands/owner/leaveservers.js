const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaveservers')
        .setDescription('Leaves a server using the server ID.')
        .addStringOption(option =>
            option.setName('server_id')
            .setDescription('The ID of the server to leave')
            .setRequired(true)),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const serverId = interaction.options.getString('server_id');

        try {
            const guild = interaction.client.guilds.cache.get(serverId);
            if (!guild) {
                return interaction.reply({ content: 'I am not in that server or the server ID is invalid.', ephemeral: true });
            }

            await guild.leave();
            await interaction.reply(`✅ Successfully left the server with ID: **${serverId}**`);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Failed to leave the server. Please check the server ID.', ephemeral: true });
        }
    },
};