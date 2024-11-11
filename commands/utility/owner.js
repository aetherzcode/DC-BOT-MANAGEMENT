const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('owner')
        .setDescription('Displays the bot owner\'s profile.'),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner's ID from .env

        try {
            const owner = await interaction.client.users.fetch(ownerId);

            const embed = new EmbedBuilder()
                .setColor(0x1E90FF) // Using hexadecimal value for blue
                .setTitle(`${owner.tag}'s Profile`)
                .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
                .addFields({ name: 'Username', value: `[${owner.username}](https://discord.com/users/${owner.id})`, inline: true }, // Clickable username
                    { name: 'Discriminator', value: owner.discriminator !== '0' ? `#${owner.discriminator}` : 'No discriminator set', inline: true }, // Check for discriminator
                    { name: 'Created At', value: owner.createdAt.toDateString(), inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while fetching the owner\'s profile.', ephemeral: true });
        }
    },
};