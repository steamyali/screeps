var tower = {

    /** @param {Creep} creep **/
    run: function() {
        var tower = Game.getObjectById('5d1d9a478602d7647c75fab9');
        // 这个是当前tower的ID值
        if(tower) {

            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            // 找到最近的hits < hitsMax的建筑进行修复
            if(closestDamagedStructure) { 
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            // 否则找到最近的敌人进行攻击(其实可以调整顺序，不用在意)
            if(closestHostile) { 
                tower.attack(closestHostile);
            }
        }
	}
};

module.exports = tower;

