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
        // hits越小优先级越高

        const roads = creep.room.find(FIND_STRUCTURES, {
            filter: object => ( object.hits < object.hitsMax && object.structureType == STRUCTURE_ROAD )});
        // 寻找类型为STRUCTURE_ROAD，hits < hitsMax的所有ROAD，这里返回的是一个数组
        roads.sort((a,b) => a.hits - b.hits);

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
        else if(roads.length > 0) {
            // 我们认为修复ROAD的优先级比储存资源更高(其实修复ROAD只需要很短的时间即可)
            if(creep.repair(roads[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roads[0]);
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
            
            if ( Powers ) {
                if(creep.transfer(Powers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Powers);
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

