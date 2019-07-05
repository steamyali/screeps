var run = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // 第一优先级为找到可以储存资源的EXTENSION(一种放资源的装置)

        creep.say("carry");        
        var Extensions = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION 
                    && structure.energy < structure.energyCapacity)
            }
        });
            
        if ( Extensions ) {
            if(creep.transfer(Extensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Extensions);
            }
        }
        else {
            // 放满了就放到Spawn中
            if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = run;

