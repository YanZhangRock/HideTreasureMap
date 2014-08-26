/**
 * Created by Rock on 8/24/14.
 */

var MapTile = cc.Class.extend({
    layer: null,
    zOrder: 0,
    menu: null,
    listener: null,
    tile2Img: {},
    tile2Btn: {},

    ctor: function (layer, zOrder) {
        this.layer = layer;
        this.zOrder = zOrder;
    },

    createTiles: function() {
        this._createListener();
        this._initMenu();
        this._createTerrains();
        this._createObjs();
    },

    _createListener: function() {
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    self.onTouchBegan( touch, event );
                    return true;
                }
                return false;
            }
        });
        this.listener = listener;
    },

    _initMenu: function() {
        var menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        this.menu = menu;
        this.layer.addChild( menu, this.zOrder );
    },

    _createTerrains: function() {
        var menu = this.menu;
        var i = 0;
        for( var tile in Def.TILE2IMG ) {
            var imgName = Def.TILE2IMG[tile];
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
            this.tile2Img[tile] = imgName;
            this.tile2Btn[tile] = tileBtn;
            menu.addChild( tileBtn );
            cc.eventManager.addListener(this.listener.clone(), tileBtn);
            i++;
        }
    },

    _createObjs: function() {
        var menu = this.menu;
        var imgs = ["thief.png", "money.png"];
        var names = ["THIEF", "MONEY"]
        for( var i in imgs ) {
            var imgName = imgs[i];
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
            this.tile2Img[names[i]] = imgName;
            this.tile2Btn[names[i]] = tileBtn;
            menu.addChild( tileBtn );
            cc.eventManager.addListener(this.listener.clone(), tileBtn);
        }
    },

    onTouchBegan: function( touch, event ) {
        var btn = event.getCurrentTarget();
        for( var k in this.tile2Btn ) {
            if( this.tile2Btn[k] == btn ) {
                this.layer.setCurTile( k, this.tile2Img[k] );
                return;
            }
        }
    }
});

MapTile.EDGE = 16;
MapTile.ORI_GRID = {
    x: 0.15, y: 0.7
};