/**
 * Created by Rock on 8/23/14.
 */

var Util = new Object();

Util.grid2World = function( grid ) {
    var x = ( grid.x + 1 ) * Def.GRID_SIZE + Def.ORI_GRID.x;
    var y = ( grid.y + 1 ) * Def.GRID_SIZE + Def.ORI_GRID.y;
    return { x: x, y: y };
};

Util.world2Grid = function( world ) {
    var x = Math.round( (world.x - Def.ORI_GRID.x) / Def.GRID_SIZE ) - 1;
    var y = Math.round( (world.y - Def.ORI_GRID.y) / Def.GRID_SIZE ) - 1;
    return { x: x, y: y };
};

Util.loadJsonFile = function( file ) {
    var txt = cc.loader._loadTxtSync( file );
    return JSON.parse( txt );
};