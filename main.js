var roleHarvester = require('harvester.js');
var roleBuilder = require('builder.js');
var roleUpgrader = require('upgrader.js');
var rebirth = require('rebirth.js');
var makeroad = require('makeroad.js');

module.exports.loop = function () {

    rebirth.run();
    makeroad.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
