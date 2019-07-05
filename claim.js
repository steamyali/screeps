var claim = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if ( creep.room.name != 'E28N16') {
            const route = Game.map.findRoute(creep.room, 'E28N16');
            if(route.length > 0) {
                console.log('Now heading to room '+route[0].room);
                const exit = creep.pos.findClosestByRange(route[0].exit);
                creep.moveTo(exit);
            }
        }
        else
        { 
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = claim;
