var Run = require('run.js');

var changeroom = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // 我们当前房间的编号为'W11N4'，隔壁房间为'W11N3'
        if ( creep.room.name != 'W11N3' ) {
            if ( creep.carry.energy == 0 ) {
                // 这一段是还在赶往另外一个房间的路上
                creep.say('move');
                const route = Game.map.findRoute(creep.room, 'W11N3');
                // 移动到隔壁房间
                if(route.length > 0) {
                    const exit = creep.pos.findClosestByRange(route[0].exit);
                    creep.moveTo(exit);
                }
            }
            else {
                // 当前已经完成资源收集，直接调用函数
                Run.run(creep);
            }
        }
        else if ( creep.carry.energy < creep.carryCapacity )
        {
            // 先进行资源采集
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else
        { 
            creep.say('carry');
            // 返回原本的房间
            const route = Game.map.findRoute(creep.room, 'W11N4');
            if(route.length > 0) {
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }

        }
	}
};

module.exports = changeroom;
