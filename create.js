var create = {

    /** @param {Creep} creep **/
    run: function(a, name, x) {

        var Target = _.filter(Game.creeps, (creep) => creep.memory.role == name);
        console.log(name + ': ' + Target.length); 

        if(Target.length < x) { 
            var newName = name + Game.time;
            console.log('Spawning new ' + name + ': ' + newName); 
            Game.spawns['Spawn1'].spawnCreep(a, newName, {memory: {role: name}});
        }

	}
};

module.exports = create;
