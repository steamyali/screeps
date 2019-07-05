var Run = require('run.js');

var roleHarvester = {

    run: function(creep) {

        // 这个就是一个可以传递的值: creep.memory.carrying 
	    if(creep.carry.energy == 0) {
            // 我们以一次采集资源+一次任务为一个任务周期
            // 为了区分采集资源和任务，我们将一次采集资源这一部分设为false，另一部分设为true
            // 大部分的代码都是按照这个逻辑设定的
            creep.memory.carrying = false;
            creep.say('harvest');
            // 为了可视化管理，可以让当前creep的头顶上出现一个话语框
	    }
	    if(creep.carry.energy == creep.carryCapacity) {
            // 当资源收集完成时
	        creep.memory.carrying = true;
	    }

        const roads = creep.room.find(FIND_STRUCTURES, {
            filter: object => ( object.hits < object.hitsMax && object.structureType == STRUCTURE_ROAD )});
        // 寻找类型为STRUCTURE_ROAD，hits < hitsMax的所有ROAD，这里返回的是一个数组
        roads.sort((a,b) => a.hits - b.hits);
        // hits越小优先级越高

	    if(creep.memory.carrying == false) {
            // 采集资源
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(roads.length > 0) {
            // 我们认为修复ROAD的优先级比储存资源更高(其实修复ROAD只需要很短的时间即可)
            if(creep.repair(roads[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roads[0]);
            }
        }
        else {            
            // 这里是存储资源，因为需要经常调用所以额外写了一个函数
            Run.run(creep);
        }
	}
};

module.exports = roleHarvester;
