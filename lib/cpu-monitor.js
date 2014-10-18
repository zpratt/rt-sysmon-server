(function () {
    'use strict';

    var util = require('util'),
        EventEmitter = require('events').EventEmitter,
        os = require('os');

    function CpuMonitor() { }

    util.inherits(CpuMonitor, EventEmitter);

    CpuMonitor.prototype.CPU_UPDATE_EVENT = 'cpu-update';

    CpuMonitor.prototype.getCpuUpdate = function() {
        var cpus = os.cpus(),
            numCpus = cpus.length,
            totalUserTime = 0,
            cpuIndex;

        for (cpuIndex = 0; cpuIndex < numCpus; cpuIndex += 1) {
            totalUserTime += cpus[cpuIndex].times.user;
        }

        this.emit(this.CPU_UPDATE_EVENT, {
            totalUserTime: totalUserTime
        });
    };

    CpuMonitor.prototype.start = function (pollingInterval) {
        setInterval(this.getCpuUpdate.bind(this), pollingInterval);
    };

    module.exports = CpuMonitor;
}());