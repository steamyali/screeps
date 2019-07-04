var tower = {

    /** @param {Creep} creep **/
    run: function() {
        var tower = Game.getObjectById('5d1d9a478602d7647c75fab9');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) { 
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) { 
                tower.attack(closestHostile);
            }
        }
	}
};

module.exports = tower;

