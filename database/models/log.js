const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: { type: String, required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String, required: false }
});

module.exports = mongoose.model('Log', logSchema);