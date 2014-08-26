/**
 * Created by Rock on 8/24/14.
 */

var MainLayer = cc.Layer.extend({
    mapPainter: null,
    mapTile: null,
    mapEditor: null,
    grids: {},
    thief: null,
    guards: [],
    moneys: [],
    traps: [],
    testLabel: null,
    touchBaganLoc: null,
    mapBatch: null,
    objBatch: null,
    owner: "",
    testString: "",
    curTile: {sprite: null, name: "", img: ""},
    gridMoved: null,

    ctor: function () {
        this._super();
        this._initMapPainter();
        this._initMapTile();
        this._initMapEditor();
        this._createCurTile();
        this._createListener();
    },

    startGame: function() {
        this.mapPainter.loadMap( MainLayer.MAP );
        this.mapPainter.drawMap();
        this.grids = this.mapPainter.getGrids();
        //this.testLabel.setString(str);
    },

    _initMapPainter: function() {
        this.mapPainter = new MapPainter( this );
        this.mapPainter.setParam({
            zOrder: MainLayer.Z.MAP,
            oriGrid: Def.ORI_GRID,
            gridScale: Def.GRID_SCALE
        });
    },

    _initMapTile: function() {
        this.mapTile = new MapTile( this, MainLayer.Z.UI );
        this.mapTile.createTiles();
    },

    _initMapEditor: function() {
        this.mapEditor = new MapEditor( this );
    },

    _createCurTile: function() {
        var sprite = new cc.Sprite( "#" + Def.TILE2IMG["GRASS"] );
        sprite.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: g_size.width * 0.18,
            y: g_size.height * 0.82,
            scale: Def.GRID_SCALE
        });
        this.curTile.sprite = sprite;
        this.curTile.name = "GRASS";
        this.curTile.img = Def.TILE2IMG["GRASS"];
        this.addChild( sprite, MainLayer.Z.UI );
    },

    _createListener: function() {
        cc.eventManager.addListener({
            prevTouchId: -1,
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan:function (touches, event) {
                var touch = touches[0];
                this.prevTouchId = touch.getId();
                event.getCurrentTarget().onTouchBegan( touch );
            },
            onTouchesMoved:function (touches, event) {
                var touch = touches[0];
                if (this.prevTouchId != touch.getId()){
                    this.prevTouchId = touch.getId();
                } else {
                    event.getCurrentTarget().onTouchMoved( touch );
                }
            }
        }, this);
    },

    setCurTile: function( tile, img ) {
        this.curTile.name = tile;
        this.curTile.img = img;
        var frame = cc.spriteFrameCache.getSpriteFrame(img);
        this.curTile.sprite.setSpriteFrame( frame );
    },

    onTouchBegan: function( touch ) {
        var l = touch.getLocation();
        var p = Util.world2Grid( l );
        if( p.x < 0 || p.x > this.grids.width ||
            p.y < 0 || p.y > this.grids.height ) return;
        var grid = this.grids[p.x][p.y];
        this.gridMoved = grid;
        this.mapEditor.editMap( grid, this.curTile.name, this.curTile.img );
    },

    onTouchMoved: function( touch ) {
        var l = touch.getLocation();
        var p = Util.world2Grid( l );
        if( p.x < 0 || p.x > this.grids.width ||
            p.y < 0 || p.y > this.grids.height ) return;
        var grid = this.grids[p.x][p.y];
        if( this.gridMoved && this.gridMoved == grid ) return;
        this.gridMoved = grid;
        this.mapEditor.editMap( grid, this.curTile.name, this.curTile.img );
    }

});

MainLayer.Z = {
    MAP: 0,
    OBJ: 100,
    UI: 200
};
MainLayer.MAP = "res/mapCfg/map.json";