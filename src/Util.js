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

Util.getHTML = function( url, callBack ) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open( "GET", url );
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if( callBack ) {
                callBack( xhr.responseText );
            }
        }
    };
    xhr.send();
};

Util.postHTML = function( url, param, callBack ) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open( "POST", url, true );
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-type", "text/plain");
    //xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8" );
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if( callBack ) {
                callBack( xhr.responseText );
            }
        }
    };
    xhr.send( param );
};
