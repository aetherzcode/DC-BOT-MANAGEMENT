const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aetherz')
        .setDescription('Responds with AETHERz is online!!'),
    async execute(interaction) {
        await interaction.reply('AETHERz is online!!');
    },
};