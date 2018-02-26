/**
 * Created by Administrator on 2016/6/1.
 */

var MapUtils = {};

MapUtils.LAYERS = [

	['全国矢量','/static/images/layers/qgsl.jpg','http://10.1.12.96/PGIS_S_TileMapServer/Maps/GDDH/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=1.0.0', 'TDT'],
	['矢影叠加','/static/images/layers/tdt_sy.png','http://10.48.1.227:9080/TileMapServer/Maps/sddj3d/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=1.0.0', 'TDT'],
	['山东矢量','/static/images/layers/tdt_sl.png','http://10.48.1.227:9080/TileMapServer/Maps/SDMap2000/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=1.0.0', 'TDT'],
	['影像地图','/static/images/layers/tdt_yx.png','http://10.53.185.46/PGIS_S_TileMapServerTDT/Maps/yx2017/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=1.0.0', 'TDT'],
    ['矢量地图','/static/images/layers/tdt_sl.png','http://localhost:8000/EzServerTDT/Maps/RZSL/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=1.0.0', 'TDT'],
    //['矢量','/static/images/layers/tdt_sl.png','http://10.48.1.227:9080/TileMapServer/Maps/SDMap2000/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=1.0.0', 'TDT'],
    
];

MapUtils.ezMap2010 = function(options) {
	for (var e = "EPSG:4326", t = new Array(22), r = 9; r >= 0; --r)
		t[r] = Math.pow(2, 9 - r) / 256;
	for (var r = 10; 22 >= r; ++r)
		t[r] = 1 / Math.pow(2, r - 9) / 256;
	var tilegrid= new ol.tilegrid.TileGrid({
		origin: [0, 0],
		resolutions: t,
		tileSize: 256
	});

	return new ol.layer.Tile({
		title: options.title,
		type: options.type,
		visible: options.visible,
		icon: options.icon,
		source: new ol.source.TileImage({
			projection: 'EPSG:4326',    
			tileGrid: tilegrid,
			tileUrlFunction:function(o, e, t){
				var r = o[0], i = o[1], n = o[2], g = options.url;
				return g.replace("{z}", r.toString()).replace("{y}", n.toString()).replace("{x}", i.toString())
			}
		})
	});
}

MapUtils.panTo = function(map, coordinate){
    map.beforeRender(ol.animation.pan({
        duration: 1000,
        source: (map.getView().getCenter())
    }));
    map.getView().setCenter(coordinate);
};

MapUtils.flyTo = function(map, coordinate){
    var start = +new Date();
    map.beforeRender(ol.animation.pan({
        duration: 2000,
        source: (map.getView().getCenter()),
        start: start
    }), ol.animation.bounce({
        duration: 2000,
        resolution: 3 * map.getView().getResolution(),
        start: start
    }));
    map.getView().setCenter(coordinate);
};

MapUtils.initMap = function(target, layers){
    if(layers === undefined){
        layers = [];
        for(var i= 0, j=MapUtils.LAYERS.length - 1; i<j; i++){
            var layerProperty = MapUtils.LAYERS[i];
            layerProperty.type = 'base';
            layerProperty.visible = 'false';
            var obj = {};
            obj.title = layerProperty[0];
            obj.type = 'base';
            obj.visible = 'false';
            obj.icon = basePath + layerProperty[1];
            console.log(obj.icon);
            obj.url = layerProperty[2];
            if( layerProperty[3]== "ezmap2010"){
                layers.push(MapUtils.ezMap2010(obj));
            }else{
//            	layers.push(new ol.layer.Tile({
//                    title: layerProperty[0],
//                    type: 'base',
//                    visible: false,
//                    icon: obj.icon,
//                    source: new ol.source.PGIS({
//                    	url: layerProperty[2]
//                    })
//                }));
            	layers.push(new ol.layer.Tile({
                    title: layerProperty[0],
                    type: 'base',
                    visible: false,
                    icon: obj.icon,
                    source: new ol.source.XYZ(
							{
								url: layerProperty[2],
								//url : "http://10.34.128.147/EzServerTDT/Maps/SL/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=0.3",
								projection : "EPSG:4326"
							})
                }));
            }
    		
            
        }
        var layerProperty = MapUtils.LAYERS[MapUtils.LAYERS.length - 1];
        var obj = {};
        obj.title = layerProperty[0];
        obj.type = 'base';
        obj.visible = 'false';
        obj.icon = basePath + layerProperty[1];
        obj.url = layerProperty[2];
        console.log(obj.icon);
        if( layerProperty[3]== "ezmap2010"){
            layers.push(MapUtils.ezMap2010(obj));
        }else{
        	layers.push(new ol.layer.Tile({
                title: MapUtils.LAYERS[MapUtils.LAYERS.length - 1][0],
                type: 'base',
                visible: true,
                icon: basePath + MapUtils.LAYERS[MapUtils.LAYERS.length - 1][1],
                source: new ol.source.XYZ(
						{
							url: MapUtils.LAYERS[MapUtils.LAYERS.length - 1][2],
							//url : "http://10.34.128.147/EzServerTDT/Maps/SL/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=0.3",
							projection : "EPSG:4326"
						})
//                source: new ol.source.PGIS({
//                    url: MapUtils.LAYERS[MapUtils.LAYERS.length - 1][2]
//                })
            }));
        }

        console.log(layers);
        
    }
    
    var map = new ol.Map({
        controls: [
            new ol.control.Zoom({
                zoomInTipLabel: '放大',
                zoomOutTipLabel: '缩小'
            }),
           // new ol.control.ZoomSlider(),
            new ol.control.LayerSwitcher()
        ],
        layers: layers,
        target: target,
        view: new ol.View({
            projection: 'EPSG:4326',
            //center: [121.09863,32.20312],
            center: [119.5249,35.41748],
            zoom: 10,
            minZoom: 10,
            maxZoom: 18
        })
    });
    return map;

};

