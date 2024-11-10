const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('owner')
        .setDescription('Displays the bot owner\'s profile.'),
    async execute(interaction) {
        const ownerId = '1220645095389270019'; // Replace with the actual owner ID
        const owner = await interaction.client.users.fetch(ownerId);

        const embed = new EmbedBuilder()
            .setColor('BLUE')
            .setTitle(`${owner.tag}'s Profile`)
            .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
            .addFields({ name: 'ID', value: owner.id, inline: true }, { name: 'Username', value: owner.username, inline: true }, { name: 'Discriminator', value: `#${owner.discriminator}`, inline: true }, { name: 'Created At', value: owner.createdAt.toDateString(), inline: true })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};