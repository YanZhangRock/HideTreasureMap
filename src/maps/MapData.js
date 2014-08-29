/**
 * Created by Rock on 8/28/14.
 */


var MapData = cc.Class.extend({
    rawData: null,
    saveData: null,
    owner: "",
    width: 0,
    height: 0,
    grids: null,
    loadMapCallBack: null,
    saveMapCallBack: null,
    mapid: 1,

    ctor: function (layer) {
        this.layer = layer;
    },

    loadFileList: function() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            }
            this.layer.testLabel.setString(theRequest["id"]);
        }
        return theRequest;
    },

    getMapURL: function() {
        return MapData.MAP_URL+this.mapid;
    },

    getUserURL: function() {},

    loadMap: function( callBack ) {
        this.loadMapCallBack = callBack;
        var self = this;
        Util.getHTML( this.getMapURL(), function(txt){self.onLoadMap(txt)} );
    },

    onLoadMap: function( txt ) {
        this.rawData = JSON.parse( txt );
        this._unserializeMap()
        if( this.loadMapCallBack ) {
            this.loadMapCallBack();
        }
    },

    saveMap: function( callBack ) {
        this.saveMapCallBack = callBack;
        this._serializeMap();
        var self = this;
        Util.postHTML( this.getMapURL(), JSON.stringify( this.saveData ),
            function(){
                self.saveMapCallBack();
            }
        );
    },

    saveObjs: function( callBack ) {},

    _serializeMap: function() {
        var data = new Object();
        //data.owner = this.owner;
        data.owner = "岩哥";
        data.width = this.width;
        data.height = this.height;
        data.thiefPos = {};
        data.moneyPos = [];
        data.gridsData = [];
        for( var i=0; i<this.width; i++ ) {
            for (var j = 0; j < this.height; j++) {
                var grid = this.grids[i][j];
                if( grid.thief ) {
                    data.thiefPos = { x: i, y: j };
                }
                if( grid.money ) {
                    data.moneyPos.push(
                        { x: i, y: j }
                    );
                }
                data.gridsData.push(
                    { x: i, y: j, tile: grid.tile }
                );
            }
        }
        this.saveData = data;
    },

    _unserializeMap: function() {
        this.owner = this.rawData.owner;
        var grids = {}
        for( var i=0; i<this.rawData.width; i++) {
            for( var j=0; j<this.rawData.height; j++ ) {
                grids[i] = grids[i] || [];
                grids[i][j] = { x:i, y:j };
            }
        }
        if( this.rawData["thiefPos"] ) {
            var d = this.rawData["thiefPos"];
            grids[d.x][d.y].thief = true;
        }
        for( var i in this.rawData["moneyPos"] ){
            var d = this.rawData["moneyPos"][i];
            grids[d.x][d.y].money = true;
        }
        for( var i in this.rawData["gridsData"] ){
            var d = this.rawData["gridsData"][i];
            grids[d.x][d.y].tile = d["tile"];
        }
        this.width = this.rawData.width;
        this.height = this.rawData.height;
        this.grids = grids;
    }
})

MapData.MAP_URL = "http://minihugscorecenter.appspot.com/map?mid=";
MapData.USER_URL = "http://minihugscorecenter.appspot.com/user?";