/**
 * Created by Rock on 8/29/14.
 */

var ObjIO = cc.Class.extend({
    map: null,
    rawData: null,
    loadObjCallBack: null,
    saveObjCallBack: null,

    ctor: function ( map ) {
        this.map = map;
    },

    getSaveURL: function() {
        return ObjIO.URL+this.map.saveUserid+"&name="+this.map.owner+"&mid="+this.map.saveMapid;
    },

    getLoadURL: function() {
        return ObjIO.URL+this.map.userid;
    },

    loadObjs: function( callBack ) {
        this.loadObjCallBack = callBack;
        var self = this;
        Util.getHTML( this.getLoadURL(), function(txt){self.onLoadObjs(txt)} );
    },

    onLoadObjs: function( txt ) {
        if( txt == "null\n" ) return;
        var idx = txt.indexOf("{");
        var pre = txt.substr( 0, idx );
        var content = txt.substr( idx );
        var strs = pre.split( "," );
        this.map.userid = strs[0];
        this.map.owner = strs[1];
        this.map.mapid = strs[2];
        this.rawData = JSON.parse( content );
        //this.map.unserializeObjs( rawData )
        if( this.loadObjCallBack ) {
            this.loadObjCallBack();
        }
    },

    initObjs: function() {
        this.map.unserializeObjs( this.rawData )
    },

    saveObjs: function( callBack ) {
        this.saveObjCallBack = callBack;
        var saveData = this.map.serializeObjs();
        var self = this;
        Util.postHTML( this.getSaveURL(), JSON.stringify( saveData ),
            function(){
                if( self.saveObjCallBack ) {
                    self.saveObjCallBack();
                }
            }
        );
    }

});

ObjIO.URL = "http://minihugscorecenter.appspot.com/user?uid=";