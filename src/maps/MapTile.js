/**
 * Created by Rock on 8/24/14.
 */

var MapTile = cc.Class.extend({
    layer: null,
    zOrder: 0,
    menu: null,

    ctor: function (layer, zOrder) {
        this.layer = layer;
        this.zOrder = zOrder;
    },

    createTiles: function() {
        var menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        this.menu = menu;
        this.layer.addChild( menu, this.zOrder );
        this._createTerrains();
        this._createObjs();
    },

    _createTerrains: function() {
        var menu = this.menu;
        var i = 0;
        for( var tile in Def.TILE2IMG ) {
            var img = "#" + Def.TILE2IMG[tile];
            var tileBtn = new cc.MenuItemImage(
                img,
                img,
                function () {
                    cc.log("Menu is clicked!");
                }, this);
            tileBtn.attr({
                x: g_size.width * MapTile.ORI_GRID.x + ( Def.GRID_SIZE + MapTile.EDGE ) * i,
                y: g_size.height * MapTile.ORI_GRID.y,
                anchorX: 0.5,
                anchorY: 0.5
            });
            menu.addChild( tileBtn );
            i++;
        }
    },

    _createObjs: function() {
        var menu = this.menu;
        var imgs = ["thief.png", "money.png"];
        for( var i in imgs ) {
            var img = "#" + imgs[i];
            var tileBtn = new cc.MenuItemImage(
                img,
                img,
                function () {
                    cc.log("Menu is clicked!");
                }, this);
            tileBtn.attr({
                x: g_size.width * MapTile.ORI_GRID.x + ( Def.GRID_SIZE + MapTile.EDGE ) * i,
                y: g_size.height * MapTile.ORI_GRID.y - MapTile.EDGE - Def.GRID_SIZE,
                anchorX: 0.5,
                anchorY: 0.5
            });
            menu.addChild( tileBtn );
        }
    }
});

MapTile.EDGE = 16;
MapTile.ORI_GRID = {
    x: 0.15, y: 0.7
};