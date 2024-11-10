const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('backup')
        .setDescription('Creates a backup of the database.'),
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID; // Get owner ID from .env

        if (interaction.user.id !== ownerId) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Assuming you have a function to export your database
        const backupData = await mongoose.connection.db.collection('yourCollectionName').find({}).toArray();
        fs.writeFileSync('backup.json', JSON.stringify(backupData, null, 2));
        await interaction.reply('✅ Database backup created successfully!');
    },
};