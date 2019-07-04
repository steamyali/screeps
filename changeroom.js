var changeroom = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if ( creep.room.name != 'E28N16' && creep.carry.energy == 0) {
            creep.say('move');
            const route = Game.map.findRoute(creep.room, 'E28N16');
            if(route.length > 0) {
                console.log('Now heading to room '+route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
        else if ( creep.room.name != 'E28N16' ) 
        {
            creep.say('carry');
            var Targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                        && structure.energy < structure.energyCapacity)
                }
            });
            
            if ( Targets ) {
                if(creep.transfer(Targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Targets);
                }
            }
            else {
                if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(Game.spawns['Spawn1']);
                }
            }
        }
        else if ( creep.carry.energy < creep.carryCapacity )
        {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else
        { 
            creep.say('carry');
            const route = Game.map.findRoute(creep.room, 'E29N16');
            if(route.length > 0) {
                console.log('Now heading to room '+route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }

        }
	}
};

module.exports = changeroom;
