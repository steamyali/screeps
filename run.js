var run = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
};

module.exports = run;

