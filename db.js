var mongoose = require('mongoose');
var dbUrl = process.env.DB_URL || 'mongodb://docgardens:desertfox1@ds043971.mongolab.com:43971/bitemetest';

mongoose.connect(dbUrl);

module.exports = mongoose.connection;
