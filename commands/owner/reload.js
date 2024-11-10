const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
            .setDescription('The command to reload')
            .setRequired(true)),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const commandName = interaction.options.getString('command');
        const commandPath = path.join(__dirname, '../..', 'commands', commandName);

        if (!fs.existsSync(commandPath)) {
            return interaction.reply({ content: 'Command not found!', ephemeral: true });
        }

        delete require.cache[require.resolve(commandPath)];
        require(commandPath); // Reload the command

        await interaction.reply(`Command **${commandName}** has been reloaded.`);
    },
};