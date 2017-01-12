var mongoose = require('mongoose'); 

var graph = mongoose.Schema({
    graph           : String,
    description     : String,
    created_on      : Date,
    components		: []
});

module.exports = mongoose.model('graph',graph);