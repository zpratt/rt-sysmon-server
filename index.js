(function () {
    'use strict';

    var restify = require('restify'),

        CpuMonitor = require('./lib/cpu-monitor'),
        monitor = new CpuMonitor(),

        Socket = require('socket.io'),
        io,

        clients = [],
        server = restify.createServer();

    io = Socket.listen(server);

    io.on('connection', function (socket) {
        clients.push(socket);
    });

    monitor.start(5000);

    monitor.on(monitor.CPU_UPDATE_EVENT, function (data) {
        var clientIndex;

        for (clientIndex = 0; clientIndex < clients.length; clientIndex += 1) {
            clients[clientIndex].emit('cpu_update', data);
        }
    });

    server.listen(8080, function () {
        console.log('listening on port 8080');
    });
}());