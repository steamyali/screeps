var Run = require('run.js');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // 跟其它的同理
	    if(creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

        // 找到最近的待修建的建筑
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

	    if(creep.memory.building == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(target) {
            // 第一优先级为修建建筑
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else { 
            // 第二优先级为对缺少能量的TOWER提供能量
            var Powers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER 
                        && structure.energy < structure.energyCapacity)
                }
            });
            
            if ( Targets ) {
                if(creep.transfer(Targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Targets);
                }
            }
            else {
                // 第三优先级为将多于的能量储存
                Run.run(creep);
            }
        }
	}
};

module.exports = roleBuilder;

