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

        // 产生builder
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length); 

        if(builders.length < 3) { 
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
        }

        // 产生upgrader
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length); 

        if(upgraders.length < 5) { 
            var newName = 'Upgraders' + Game.time;
            console.log('Spawning new upgarder: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'upgrader'}});
        }
        
        // 产生harvester1
        var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
        console.log('Harvesters1: ' + harvesters1.length); 

        if(harvesters1.length < 4) { 
            var newName = 'Harvesters1' + Game.time;
            console.log('Spawning new harvester1: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'harvester1'}});
        }
        
        // 产生harvester
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length); 

        if(harvesters.length < 4) { 
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }


        const target = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(ATTACK) != 0;
            }
        });
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        console.log('Attackers: ' + attackers.length); 

        if(attackers.length < target.length * 2) { 
            var newName = 'Attacker' + Game.time;
            console.log('Spawning new attacker: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,TOUCH,TOUCH], newName,
                {memory: {role: 'attacker'}});
        }

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
