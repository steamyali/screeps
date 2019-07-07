var roleAttacker = {
	
	run: function(creep) {

    /*    if ( creep.room.name != 'W11N3' ) {
            // 这一段是还在赶往另外一个房间的路上
            creep.say('move');
            const route = Game.map.findRoute(creep.room, 'W11N3');
            // 移动到隔壁房间
            if(route.length > 0) {
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
*/            
		const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		
		if(target) {
    		if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        	    creep.moveTo(target);
    		}
		}
		//自动寻找敌人并接近
		if(creep.hit*100 <= creep.hitsMax*30){
			var tower = Game.getObjectById('5d1d9a478602d7647c75fab9'); 
			creep.moveTo(tower);
		}
		//血量处于危险状态时回塔加血
	}
}

module.exports = roleAttacker;

