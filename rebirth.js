var create = require('create.js');

var rebirth = {

    // 命名规则为职务+当前游戏时间，如Builders1766
    run: function() {
        
        // 清理存储空间
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var a = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        
        create.run(a, 'builder', 3);
        create.run(a, 'upgrader', 5);
        create.run(a, 'harvester1', 2);
        create.run(a, 'harvester', 4);

        a = [TOUGH,TOUGH,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE]; 

        const target = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(ATTACK) != 0;
            }
        });
        create.run(a, 'attacker', 2 * target.length);

        // 这段函数没看懂...
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
	}
};

module.exports = rebirth;
