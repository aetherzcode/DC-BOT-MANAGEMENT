const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listservers')
        .setDescription('Lists all servers the bot is currently in.'),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const guilds = interaction.client.guilds.cache;

        if (guilds.size === 0) {
            return interaction.reply({ content: 'The bot is not in any servers.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor(0x1E90FF) // Using hexadecimal color for blue
            .setTitle('📜 List of Servers')
            .setDescription('Here are the servers the bot is currently in:')
            .setTimestamp();

        guilds.forEach(guild => {
            embed.addFields({ name: guild.name, value: `ID: ${guild.id}`, inline: false });
        });

        await interaction.reply({ embeds: [embed] });
    },
};