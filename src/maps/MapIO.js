/**
 * Created by Rock on 8/29/14.
 */

var MapIO = cc.Class.extend({
    map: null,
    loadMapCallBack: null,
    saveMapCallBack: null,

    ctor: function ( map ) {
        this.map = map;
    },

    getURL: function() {
        return MapIO.URL+this.map.mapid;
    },

    loadMap: function( callBack ) {
        this.loadMapCallBack = callBack;
        var self = this;
        Util.getHTML( this.getURL(), function(txt){self.onLoadMap(txt)} );
    },

    onLoadMap: function( txt ) {
        var rawData = JSON.parse( txt );
        this.map.unserializeMap( rawData )
        if( this.loadMapCallBack ) {
            this.loadMapCallBack();
        }
    },

    saveMap: function( callBack ) {
        this.saveMapCallBack = callBack;
        var saveData = this.map.serializeMap();
        var self = this;
        Util.postHTML( this.getURL(), JSON.stringify( saveData ),
            function(){
                if( self.saveMapCallBack ) {
                    self.saveMapCallBack();
                }
            }
        );
    }

});

MapIO.URL = "http://minihugscorecenter.appspot.com/map?mid=";