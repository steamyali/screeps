var roleTank = {
	
	//坦克，肉盾(I don't kone how to explain it...)
	//featur: [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK],成本370
	run: function(creep) {

		const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		
		if(target) {
    		if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        	creep.moveTo(target);
    		}
		}
		//自动寻找敌人并接近

		if(creep.hit*100 <= creep.hitsMax*20){
			var tower = Game.getObjectById('5d1d9a478602d7647c75fab9'); 
			creep.moveTo(tower);
		}
		//血量处于危险状态时回塔加血
		
	}
}

module.exports = roleTank;
