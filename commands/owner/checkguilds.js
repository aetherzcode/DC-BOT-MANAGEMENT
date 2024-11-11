const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkguilds')
        .setDescription('Check the guilds the bot is currently in.'),
    async execute(interaction) {
        const guilds = interaction.client.guilds.cache.map(guild => `${guild.name} (ID: ${guild.id})`).join('\n');

        if (!guilds) {
            return interaction.reply({ content: 'The bot is not in any guilds.', ephemeral: true });
        }

        await interaction.reply({ content: `The bot is currently in the following guilds:\n${guilds}`, ephemeral: true });
    },
};