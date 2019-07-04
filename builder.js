var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => ( object.hits < object.hitsMax 
                && object.structureType == STRUCTURE_RAMPART)});

        targets.sort((a,b) => a.hits - b.hits);

	    if(creep.memory.building == false) {
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
        else { 
            const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                var Targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                        && structure.energy < structure.energyCapacity)
                        || (structure.structureType == STRUCTURE_SPAWN
                        && structure.energy < 150);
                }
                });

                if(creep.transfer(Targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Targets);
                }
            }
        }
	}
};

module.exports = roleBuilder;

