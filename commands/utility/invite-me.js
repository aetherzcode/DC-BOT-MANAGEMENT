const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite-me')
        .setDescription('Get the invite link to add the bot to your server.'),
    async execute(interaction) {
        const clientId = interaction.client.user.id; // Mendapatkan ID bot
        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=8`; // Tautan undangan dengan izin penuh

        await interaction.reply({ content: `You can invite me to your server using the following link: [Invite Me](<${inviteLink}>)`, ephemeral: true });
    },
};