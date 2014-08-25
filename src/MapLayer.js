/**
 * Created by Rock on 8/23/14.
 */

var MapLayer = cc.Layer.extend({
    mapPainter: null,
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
        var label = new cc.LabelTTF("得分：", "Arial", 40);
        this.testLabel = label;
        label.x = g_size.width * 0.2;
        label.y = g_size.height * 0.94;
        this.addChild( label, MapLayer.Z.UI );
        this.mapPainter = new MapPainter( this );
        this.mapPainter.setParam({
            zOrder: MapLayer.Z.TILE,
            oriGrid: Def.ORI_GRID,
            gridScale: Def.GRID_SCALE
        });
        this.grids = this.mapPainter.getGrids();
    },

    startGame: function() {
        this.mapPainter.loadMap( MapLayer.MAP );
        this.mapPainter.drawMap();
        //this.testLabel.setString(str);
    }

});

MapLayer.Z = {
    TILE: 0,
    ITEM: 1,
    OBJ: 2,
    UI: 3
};
MapLayer.MAP = "res/mapCfg/map.json";