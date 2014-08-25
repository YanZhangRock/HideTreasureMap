/**
 * Created by Rock on 8/24/14.
 */

var MainLayer = cc.Layer.extend({
    mapPainter: null,
    mapTile: null,
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

    ctor: function () {
        this._super();
        // score label
//        var label = new cc.LabelTTF("得分：", "Arial", 40);
//        this.testLabel = label;
//        label.x = g_size.width * 0.2;
//        label.y = g_size.height * 0.94;
//        this.addChild( label, MainLayer.Z.UI );
        this.initMapPainter();
        this.initMapTile();
    },

    startGame: function() {
        this.mapPainter.loadMap( MainLayer.MAP );
        this.mapPainter.drawMap();
        //this.testLabel.setString(str);
    },

    initMapPainter: function() {
        this.mapPainter = new MapPainter( this );
        this.mapPainter.setParam({
            zOrder: MainLayer.Z.MAP,
            oriGrid: Def.ORI_GRID,
            gridScale: Def.GRID_SCALE
        });
        this.grids = this.mapPainter.getGrids();
    },

    initMapTile: function() {
        this.mapTile = new MapTile( this, MainLayer.Z.UI );
        this.mapTile.createTiles();
    }

});

MainLayer.Z = {
    MAP: 0,
    OBJ: 100,
    UI: 200
};
MainLayer.MAP = "res/mapCfg/map.json";