var makeroad = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var a = [14, 15, 16, 16, 16], b = [16, 16, 16, 17, 18];
        for ( var i in a ) {
            Game.spawns['Spawn1'].room.createConstructionSite( a[i], b[i], STRUCTURE_ROAD );
        }
    }
};

module.exports = makeroad;
