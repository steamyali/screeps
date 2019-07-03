var rebirth = {

    /** @param {Creep} creep **/
    run: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length); 

        if(harvesters.length < 3) { 
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length); 

        if(builders.length < 1) { 
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'builder'}});
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Builders: ' + upgraders.length); 

        if(upgraders.length < 1) { 
            var newName = 'Builder' + Game.time;
            console.log('Spawning new upgarder: ' + newName); 
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'upgrader'}});
        }

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
