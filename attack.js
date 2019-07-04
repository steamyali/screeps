var sieger = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target 
        const target = creep.pos.findClosestByRange(2, 9);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
	}
};

module.exports = sieger;

