const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { currentStatus } = require('../owner/setstatus'); // Mengimpor currentStatus dari setstatus.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getstatus')
        .setDescription('Get the current status of the bot.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x1E90FF) // Warna biru
            .setTitle('Current Bot Status')
            .setDescription(`The current status is: **${currentStatus}**`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};