const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, '../..', 'commands');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allcommands')
        .setDescription('Displays a list of all available commands.'),
    async execute(interaction) {
        const categories = fs.readdirSync(commandsPath);
        const embed = new EmbedBuilder()
            .setColor('BLUE')
            .setTitle('📜 List of All Commands')
            .setDescription('Here are all the commands available in the bot:')
            .setTimestamp();

        categories.forEach(category => {
            const commandFiles = fs.readdirSync(path.join(commandsPath, category)).filter(file => file.endsWith('.js'));
            const commandList = commandFiles.map(file => {
                const command = require(path.join(commandsPath, category, file));
                return `**/${command.data.name}**: ${command.data.description}`;
            }).join('\n');

            if (commandList) {
                embed.addFields({ name: `${category.charAt(0).toUpperCase() + category.slice(1)} Commands`, value: commandList || 'No commands available in this category.', inline: false });
            }
        });

        await interaction.reply({ embeds: [embed] });
    },
};