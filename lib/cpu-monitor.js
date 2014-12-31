(function () {
    'use strict';

    var CpuLoadModel = require('./cpu-load-model'),
        os = require('os');

    function CpuMonitor() {
        this.model = new CpuLoadModel({
            load: 0,
            lastUpdateTs: Date.now()
        });
    }

    CpuMonitor.prototype.getCpuUpdate = function() {
        var cpus = os.cpus(),
            numCpus = cpus.length,
            totalUserTime = 0,
            cpuIndex;

        for (cpuIndex = 0; cpuIndex < numCpus; cpuIndex += 1) {
            totalUserTime += cpus[cpuIndex].times.user;
        }

        this.model.set({
            lastUpdateTs: Date.now(),
            load: totalUserTime
        });
    };

    CpuMonitor.prototype.start = function (pollingInterval) {
        setInterval(this.getCpuUpdate.bind(this), pollingInterval);
    };

    module.exports = CpuMonitor;
}());