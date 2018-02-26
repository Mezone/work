/**
 * 地图服务切换控件
 */
ol.control.LayerSwitcher = function(opt_options){

    var options = opt_options || {};

    this.mapListeners = [];
    this.hiddenClassName = 'ol-layer-switcher';
    this.shownClassName = 'ol-layer-switcher hover';

    var element = document.createElement('div');
    element.className = this.hiddenClassName;

    var button = document.createElement('button');
    var btnimg = document.createElement('i');
    this.btntext = document.createElement('span');
    button.appendChild(btnimg);
    button.appendChild(this.btntext);
    element.appendChild(button);

    this.panel = document.createElement('ul');
    element.appendChild(this.panel);

    var this_ = this;

    element.onmouseover = function(e){
        this_.showPanel();
    }

    element.onmouseout = function(e){
        this_.hidePanel();
    }

    //this.renderPanel();

    ol.control.Control.call(this, {
        element: element,
        target: options.target
    });

}
ol.inherits(ol.control.LayerSwitcher, ol.control.Control);

ol.control.LayerSwitcher.prototype.showPanel = function(){
    this.element.className = this.shownClassName;
}

ol.control.LayerSwitcher.prototype.hidePanel = function(){
    this.element.className = this.hiddenClassName;
}

ol.control.LayerSwitcher.prototype.renderPanel = function() {
    this.ensureTopVisibleBaseLayerShown_();
    this.renderLayers_(this.getMap());
};

ol.control.LayerSwitcher.prototype.setMap = function(map) {
    // Clean up listeners associated with the previous map
    for (var i = 0, key; i < this.mapListeners.length; i++) {
        this.getMap().unByKey(this.mapListeners[i]);
    }
    this.mapListeners.length = 0;
    // Wire up listeners etc. and store reference to new map
    ol.control.Control.prototype.setMap.call(this, map);

    if (map) {
        /*
         var this_ = this;
         this.mapListeners.push(map.on('pointerdown', function() {
         this_.hidePanel();
         }));
         */
        this.renderPanel();
    }
};

ol.control.LayerSwitcher.prototype.ensureTopVisibleBaseLayerShown_ = function() {
    var lastVisibleBaseLyr;
    ol.control.LayerSwitcher.forEachRecursive(this.getMap(), function(l, idx, a) {
        if (l.get('type') === 'base' && l.getVisible()) {
            lastVisibleBaseLyr = l;
        }
    });
    if (lastVisibleBaseLyr) this.setVisible_(lastVisibleBaseLyr, true);
};

ol.control.LayerSwitcher.prototype.setVisible_ = function(lyr, visible) {
    var map = this.getMap();
    lyr.setVisible(visible);
    this.btntext.innerHTML = lyr.get('title');
    if (visible && lyr.get('type') === 'base') {
        // Hide all other base layers regardless of grouping
        ol.control.LayerSwitcher.forEachRecursive(map, function(l, idx, a) {
            if (l != lyr && l.get('type') === 'base') {
                l.setVisible(false);
            }
        });
    }
};

ol.control.LayerSwitcher.prototype.renderLayer_ = function(lyr, idx) {
    var this_ = this;
    var li = document.createElement('li');
    var lyrTitle = lyr.get('title');
    var lyrId = ol.control.LayerSwitcher.uuid();
    if (!lyr.getLayers){
        var a = document.createElement('a');
        a.id = lyrId;
        var img = document.createElement('img');
        img.src = lyr.get('icon');
        if(lyr.get('visible')){
            a.className = 'checked';
        }
        a.onclick = function(e) {
            var lyrEleLis = this_.panel.children;
            for(var i=0; i<lyrEleLis.length; i++){
                var lyrAs = lyrEleLis[i].children;
                for(var j=0; j<lyrAs.length;j++){
                    lyrAs[j].className = "";
                }
            }
            if(e.currentTarget.className != 'checked'){
                e.currentTarget.className = 'checked';
                this_.setVisible_(lyr, true);
            }
        };
        var label = document.createElement('label');
        label.htmlFor = lyrId;
        label.innerHTML = lyrTitle;
        a.appendChild(img);
        a.appendChild(label);
        li.appendChild(a);
    }
    return li;
};

ol.control.LayerSwitcher.prototype.renderLayers_ = function(lyr, elm) {
    var lyrs = lyr.getLayers().getArray().slice().reverse();
    for (var i = 0, l; i < lyrs.length; i++) {
        l = lyrs[i];
        if (l.get('title')) {
            this.panel.appendChild(this.renderLayer_(l, i));
        }
    }
};

ol.control.LayerSwitcher.forEachRecursive = function(lyr, fn) {
    lyr.getLayers().forEach(function(lyr, idx, a) {
        fn(lyr, idx, a);
        if (lyr.getLayers) {
            ol.control.LayerSwitcher.forEachRecursive(lyr, fn);
        }
    });
};

ol.control.LayerSwitcher.uuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
 * PGIS天地图标准瓦片服务
 * @param opt_options
 * @constructor
 */
ol.source.PGIS = function(opt_options){
    var options = opt_options || {};
    var projection = 'EPSG:4326';
    var tileGrid = new ol.tilegrid.TileGrid({
        origin: [-180, 90],
        maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
        minZoom: options.minZoom !== undefined ? options.minZoom : 0,
        tileSize: 256,
        resolutions: [
            1.40625,
            0.703125,
            0.3515625,
            0.17578125,
            0.087890625,
            0.0439453125,
            0.02197265625,
            0.010986328125,
            0.0054931640625,
            0.00274658203125,
            0.001373291015625,
            0.0006866455078125,
            0.00034332275390625,
            0.000171661376953125,
            0.0000858306884765625,
            0.00004291534423828125,
            0.000021457672119140625,
            0.0000107288360595703125,
            0.00000536441802978515625,
            0.000002682209014892578125,
            0.0000013411045074462890625
        ]
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        cacheSize: options.cacheSize,
        crossOrigin: options.crossOrigin,
        logo: options.logo,
        opaque: options.opaque,
        projection: projection,
        reprojectionErrorThreshold: options.reprojectionErrorThreshold,
        tileGrid: tileGrid,
        tileLoadFunction: options.tileLoadFunction,
        tilePixelRatio: options.tilePixelRatio,
        tileUrlFunction: function(tileCoord, pixelRatio, projection){
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            return options.url.replace('{z}', z.toString()).replace('{y}', y.toString()).replace('{x}',x.toString());
        },
        url: options.url,
        urls: options.urls,
        wrapX: options.wrapX !== undefined ? options.wrapX : true
    });

}
ol.inherits(ol.source.PGIS, ol.source.TileImage);