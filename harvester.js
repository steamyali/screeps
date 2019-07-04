var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.carry.energy == 0) {
            creep.memory.carrying = false;
            creep.say('harvest');
	    }
	    if(creep.carry.energy == creep.carryCapacity) {
	        creep.memory.carrying = true;
	        creep.say('finish');
	    }

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => ( object.hits < object.hitsMax && object.structureType == STRUCTURE_ROAD )});

        targets.sort((a,b) => a.hits - b.hits);

        var targets1 = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && 
                    structure.energy < structure.energyCapacity;
            }
        });

	    if(creep.memory.carrying == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        else if(targets1.length > 0) {
            if(creep.transfer(targets1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets1[0]);
            }
        }
        else {            
            var Targets = creep.pos.findClosestByPlath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                        || structure.structureType == STRUCTURE_SPAWN) 
                        && structure.energy < structure.energyCapacity;
                }
            });

            if(creep.transfer(Targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Targets);
            }
        }
	}
};

module.exports = roleHarvester;
