var net     = require('net');
var handler = require('./client_handler')
var server  = module.exports = net.createServer(handler);