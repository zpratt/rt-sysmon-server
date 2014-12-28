(function () {
    'use strict';

    var Hapi = require('hapi'),

        CpuMonitor = require('./lib/cpu-monitor'),
        monitor = new CpuMonitor(),

        Socket = require('socket.io'),
        io,

        clients = [],

        server = new Hapi.Server();

    server.connection({
        host: 'localhost',
        port: 8080
    });

    server.start();
    monitor.start(5000);

    io = Socket.listen(server.listener);

    io.on('connection', function (socket) {
        clients.push(socket);
    });

    monitor.on(monitor.CPU_UPDATE_EVENT, function (data) {
        var clientIndex;

        for (clientIndex = 0; clientIndex < clients.length; clientIndex += 1) {
            clients[clientIndex].emit('cpu_update', data);
        }
    });

    server.route({
        path: "/{static*}",
        method: "GET",
        handler: {
            directory: {
                path: "."
            }
        }
    })
}());