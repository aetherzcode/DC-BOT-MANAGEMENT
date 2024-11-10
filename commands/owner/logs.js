const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Log = require('../../database/models/log'); // Assuming you have a Log model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Displays the bot logs.'),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const logs = await Log.find({ guildId: interaction.guild.id }).sort({ createdAt: -1 }).limit(10);

        if (logs.length === 0) {
            return interaction.reply({ content: 'No logs available.', ephemeral: true });
        }

        const logEmbed = new EmbedBuilder()
            .setTitle('📜 Bot Logs')
            .setColor('BLUE')
            .setTimestamp();

        logs.forEach(log => {
            logEmbed.addFields({ name: log.action, value: log.details, inline: false });
        });

        await interaction.reply({ embeds: [logEmbed] });
    },
};