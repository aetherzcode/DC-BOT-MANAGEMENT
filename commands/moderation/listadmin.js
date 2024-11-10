const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listadmin')
        .setDescription('Displays a list of admins in the server.'),
    async execute(interaction) {
        const members = await interaction.guild.members.fetch();
        const adminRoles = interaction.guild.roles.cache.filter(role => role.permissions.has('ADMINISTRATOR'));
        const admins = members.filter(member => member.roles.cache.some(role => adminRoles.has(role.id)));

        if (admins.size === 0) {
            return interaction.reply({ content: 'There are no admins in this server.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('BLUE')
            .setTitle('👮 List of Admins')
            .setDescription('Here are the admins in this server:')
            .setTimestamp();

        admins.forEach(admin => {
            embed.addFields({ name: admin.user.tag, value: `ID: ${admin.user.id}`, inline: false });
        });

        await interaction.reply({ embeds: [embed] });
    },
};