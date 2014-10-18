(function () {
    'use strict';

    var CpuMonitor = require('./lib/cpu-monitor'),
        monitor = new CpuMonitor();

    monitor.start(5000);

    monitor.on(CpuMonitor.prototype.CPU_UPDATE_EVENT, function (data) {
        console.log('Total User Time: ', data.totalUserTime);
    });
}());