/**
 * Created by Rock on 8/24/14.
 */

var MapPainter = cc.Class.extend({
    layer: null,
    oriGrid: {x:0,y:0},
    gridScale: 1.0,
    zOrder: 0,
    mapName: "",
    rawData: null,
    grids: null,
    mapBatch: null,

    ctor: function ( layer ) {
        this.layer = layer;
    },

    setParam: function( param ) {
        this.zOrder = param.zOrder || this.zOrder;
        this.oriGrid = param.oriGrid || this.oriGrid;
        this.gridScale = param.gridScale || this.gridScale;
    },

    getGrids: function() {
        return this.grids;
    },

    loadMap: function( mapName ) {
        this.mapName = mapName
        this.rawData = Util.loadJsonFile( mapName );
        this._initMap();
    },

    _initMap: function(){
        this.owner = this.rawData.owner;
        this.grids = {}
        for( var i=0; i<this.rawData.width; i++) {
            for( var j=0; j<this.rawData.height; j++ ) {
                this.grids[i] = this.grids[i] || [];
                this.grids[i][j] = { x:i, y:j };
            }
        }
        if( this.rawData["thiefPos"] ) {
            var d = this.rawData["thiefPos"];
            this.grids[d.x][d.y].thief = true;
        }
        for( var i in this.rawData["moneyPos"] ){
            var d = this.rawData["moneyPos"][i];
            this.grids[d.x][d.y].money = true;
        }
        for( var i in this.rawData["gridsData"] ){
            var d = this.rawData["gridsData"][i];
            this.grids[d.x][d.y].tile = d["tile"];
        }
        this.grids.width = this.rawData.width;
        this.grids.height = this.rawData.height;
    },

    drawMap: function() {
        var mapImg = cc.textureCache.addImage(res.Tile_png);
        var batchNode = new cc.SpriteBatchNode(mapImg, 200);
        this.mapBatch = batchNode;
        this.layer.addChild( batchNode, this.zOrder+MapPainter.Z.TILE );
        for( var i=0; i<this.grids.width; i++ ) {
            for( var j=0; j<this.grids.height; j++) {
                var grid = this.grids[i][j];
                // draw tile
                var sprite = new cc.Sprite( "#"+this.getTileImg( grid.tile ) );
                grid.sprite = sprite;
                var pos = Util.grid2World( grid );
                sprite.attr({
                    anchorX: 0.5,
                    anchorY: 0.5,
                    x: pos.x,
                    y: pos.y,
                    scale: Def.GRID_SCALE
                });
                batchNode.addChild( sprite );
                // draw money
                if( grid.money ) {
                    var money = new cc.Sprite( "#"+Def.OBJ2IMG["MONEY"] );
                    money.attr({
                        anchorX: 0.5,
                        anchorY: 0.5,
                        x: pos.x,
                        y: pos.y,
                        scale: Def.GRID_SCALE
                    });
                    grid.money = money;
                    this.layer.addChild( money, this.zOrder+MapPainter.Z.OBJ );
                }
                // draw thief
                if( grid.thief ) {
                    var thief = new cc.Sprite( "#"+Def.OBJ2IMG["THIEF"] );
                    thief.attr({
                        anchorX: 0.5,
                        anchorY: 0.5,
                        x: pos.x,
                        y: pos.y,
                        scale: Def.GRID_SCALE
                    });
                    grid.thief = thief;
                    this.layer.addChild( thief, this.zOrder+MapPainter.Z.OBJ );
                }
            }
        }
    },

    getTileImg: function( tile ) {
        return Def.TILE2IMG[tile];
    }
});

MapPainter.Z = {
    TILE: 0, OBJ: 1
}