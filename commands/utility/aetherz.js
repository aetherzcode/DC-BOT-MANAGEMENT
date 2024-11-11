const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aetherz')
        .setDescription('Responds AETHERz!!'),
    async execute(interaction) {
        await interaction.reply('Yoshhh AETHERz in here!!');
    },
};