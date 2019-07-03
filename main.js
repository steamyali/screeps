var roleHarvester = require('harvester.js');
var roleBuilder = require('harvester.js');
var roleUpgrader = require('upgrader.js');
var rebirth = require('rebirth.js');

module.exports.loop = function () {

    rebirth.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memoty.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
