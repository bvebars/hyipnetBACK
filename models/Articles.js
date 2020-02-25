const {Schema, model, Types} = require('mongoose');

const schema = Schema({
    title: {type: String, required: true,},
    description: {type: String, required: true},
});

module.exports = model('Articles', schema);