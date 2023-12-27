const mongoose = require('mongoose');

const calcSchema = mongoose.Schema({
    value: { type: String, required: true}
});

module.exports = mongoose.model('Calc', calcSchema);