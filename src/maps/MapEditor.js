/**
 * Created by Rock on 8/25/14.
 */

var MapEditor = cc.Class.extend({
    layer: null,
    thief: null,

    ctor: function( layer ) {
        this.layer = layer;
    },

    editMap: function( grid, tile, img ) {
        if( tile == "THIEF" ) {
            this._addThief( grid, img );
        } else if( tile == "MONEY" ) {
            this._addMoney( grid, img );
        } else {
            this._changeTile( grid, tile, img );
        }
    },

    _changeTile: function( pos, tile, img ) {
        var grid = this.layer.grids[pos.x][pos.y];
        var frame = cc.spriteFrameCache.getSpriteFrame(img);
        grid.sprite.setSpriteFrame( frame );
        grid.tile = tile;
    },

    _addThief: function( grid, img ) {
        if( grid.thief ) {
            this.layer.removeChild( grid.thief );
            grid.thief = null;
            this.thief = null;
            return;
        }
        if( grid.money ) return;
        if( grid.tile == "TREES" ) return;
        if( this.thief ) return;
        var p = Util.grid2World( grid );
        var thief = new cc.Sprite( "#"+img );
        thief.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: p.x,
            y: p.y,
            scale: Def.GRID_SCALE
        });
        this.layer.addChild( thief, MainLayer.Z.OBJ );
        grid.thief = thief;
        this.thief = thief;
    },

    _addMoney: function( grid, img ) {
        if( grid.money ) {
            this.layer.removeChild( grid.money );
            grid.money = null;
            return;
        }
        if( grid.thief ) return;
        if( grid.tile == "TREES" ) return;
        var p = Util.grid2World( grid );
        var money = new cc.Sprite( "#"+img );
        money.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: p.x,
            y: p.y,
            scale: Def.GRID_SCALE
        });
        this.layer.addChild( money, MainLayer.Z.OBJ );
        grid.money = money;
        this.money = money;
    }
});