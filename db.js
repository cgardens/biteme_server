var mongoose = require('mongoose');

mongoose.connect('mongodb://docgardens:desertfox1@ds043971.mongolab.com:43971/bitemetest');

module.exports = mongoose.connection;
