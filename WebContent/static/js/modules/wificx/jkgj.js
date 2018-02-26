/**
 * MAC轨迹查询
 * Created by Administrator on 2017/1/18.
 */
module.jkgj = (function(){

    var _f_ = {}, _MapApp, _gjVL, _gjStyle, _dataCache, playSlider, moveFeature, moveLayer, animationFrame;
    var speed = 100,  routeCoords=[], progress = 0;
    
    _MapApp = MapUtils.initMap(document.getElementById("jkgj-map"));

    _gjVL = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: function(feature, resolution){
            //_gjStyle.getText().setText(feature.get('name'));
        	
            return _gjStyle(feature, resolution);
        }
    });
    _MapApp.addLayer(_gjVL);
    
    
    moveFeature = new ol.Feature({
        geometry: new ol.geom.Point([0, 0])
    });
    moveLayer = new ol.layer.Vector(
			{	
				preview: "static/images/tracker.png",
				source: new ol.source.Vector()
			})
    moveLayer.getSource().addFeature(moveFeature);
    _MapApp.addLayer(moveLayer);
    

    $("#jkgj_play_slider").ionRangeSlider({
        min: 0,
        max: 0,
        from: 0,
        grid: true
   });

    playSlider = $("#jkgj_play_slider").data("ionRangeSlider");
//    _gjStyle = new ol.style.Style({
//        image: new ol.style.Circle({
//            radius:10,
//            fill: new ol.style.Fill({
//                color: 'rgba(166, 21, 7, 0.9)'
//
//            }),
//            stroke: new ol.style.Stroke({
//                color: '#FFFFFF',
//                width: 1
//            })
//        }),
//        text: new ol.style.Text({
//            font: 'bold 12px Arial',
//            fill: new ol.style.Fill({
//                color: '#FFFFFF'
//            })
//        })
//    });
//    
    
    
    _gjStyle = function(feature, resolution){
    	var st= [];
		// Shadow style
		if (false){
			st.push ( new ol.style.Style(
					{	image: new ol.style.Shadow(
						{	radius: 15,
							blur: 5,
							offsetX: 0,
							offsetY: 0,
							fill: new ol.style.Fill(
							{	color: "rgba(0,0,0,0.5)"
							})
						})
					}));
		}
			
		// Font style
		st.push ( new ol.style.Style(
					{	image: new ol.style.FontSymbol(
						{	form: "none", //"hexagone", 
							gradient: false,
							glyph: "fa-mobile-phone",//car[Math.floor(Math.random()*car.length)], 
							fontSize: .8,
							radius: 15, 
							//offsetX: -15,
							rotation: 0*Math.PI/180,
							rotateWithView: false,
							offsetY: 0,
							color: "blue",
							fill: new ol.style.Fill(
							{	color: "blue"
							}),
							stroke: new ol.style.Stroke(
							{	color: "#ffffff",
								width: 3
							})
						}),
						text: new ol.style.Text({
							textAlign: "left",
							textBaseline: "middle",
							text: _getText(feature, resolution),
							fill: new ol.style.Fill({color: "blue"}),
							stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
							font: "bold 12px",
							offsetX: 10,
							offsetY: 0,
							rotation: 0
						})
					}));
			return st;
    }
    
    
    _getText = function(feature, resolution){
    	if( resolution > 0.00034332275390625){
    		return "";
    	}else{
        	return feature.get("name");
    	}
    }
    

    _f_.onSearchHandler = function(){
        _gjVL.getSource().clear();
        var startTime = $('#jkgj-startTime').val();
        var endTime = $('#jkgj-endTime').val();
        var mac = $('#jkgj-mac').val();
        if(startTime == '' || endTime == '' || mac == ''){
            bootbox.alert({message: '查询参数有误！开始时间、结束时间和MAC地址不可以为空。'});
            return;
        }
        Utils.ajax(basePath + '/main/wifi/jkgj/findJkgjByMac', {
            startTime: Utils.formatDT2DT(startTime),
            endTime: Utils.formatDT2DT(endTime),
            mac: mac
        },function(data){
            _dataCache = data.result;
            routeCoords=[];
            progress = 0;
            if(animationFrame != null){
                cancelAnimationFrame(animationFrame);  
                animationFrame = null;
			}
            if(_dataCache && _dataCache.length > 0){
                $.each(_dataCache, function(i, item){
                    var point = [parseFloat(item.longitude), parseFloat(item.latitude)];
                    var pf = new ol.Feature({
                        geometry: new ol.geom.Point(point),
                        name:  Utils.formatDTString(item.recordtime)
                    });
                    _gjVL.getSource().addFeature(pf);
                   // timer.push(Utils.formatDTString(item.recordtime));
                    if(item.longitude && item.latitude){
                		routeCoords.push([parseFloat(item.longitude), parseFloat(item.latitude)]);
                    }
                });
                
                
                playSlider.update({
                     min: 0,
                     max: _dataCache.length -1,
                     from: 0,
                     grid: true,
                     prettify: function(num){
                     	return  Utils.formatDTString(_dataCache[num].recordtime);
                     },
                     onChange: function(res){
                    	// console.log(res.from);
                    	 progress =  res.from * 100 ;
                     }
                });
                
                
                //moveFeature2();  
                
            }else{
                Utils.notifyWarning("没有查询到结果，请修改查询条件");
            }
        }, true);
    };
    
      
    var moveFeature2 = function(){  
        progress += 1;  
        playSlider.update({
            from: Math.floor(progress/speed)
       });
        if(progress%speed==0){  
        	 var currentPoint = new ol.geom.Point(routeCoords[progress/speed]);  
             var dx = routeCoords[progress/speed][0] - routeCoords[progress/speed-1][0];  
             var dy = routeCoords[progress/speed][1] - routeCoords[progress/speed-1][1]; 
             var rotation = Math.atan2(dy, dx) ;  
             var styleGeomarker = new ol.style.Style({  
                 image: new ol.style.Icon({  
                     src: 'static/images/tracker.png',  
                     rotateWithView: false,  
                     rotation: -rotation
                 })})  
             moveFeature.setGeometry(currentPoint);
             if(dx == 0 && dy == 0){
             }else{
                 moveFeature.setStyle(styleGeomarker);
             }           
        }  
        if(progress/speed < (routeCoords.length-1) && progress%speed!=0){  
        	 var arcGenerator = new arc.GreatCircle(  
                     {x: routeCoords[Math.floor(progress/speed)][0], y: routeCoords[Math.floor(progress/speed)][1]},  
                     {x: routeCoords[Math.floor(progress/speed+1)][0], y: routeCoords[Math.floor(progress/speed+1)][1]});   
            var arcLine = arcGenerator.Arc(speed, {offset: 0});//在两个点之间生成100个点 js地址为https://api.mapbox.com/mapbox.js/plugins/arc.js/v0.1.0/arc.js  
            var line = new ol.geom.LineString(arcLine.geometries[0].coords);  
            var lineFeature = new ol.Feature({  
                type: 'route',  
                geometry: line  
            });  
            var currentPoint = new ol.geom.Point(arcLine.geometries[0].coords[progress%speed]);  
            var dx = arcLine.geometries[0].coords[progress%speed][0] - arcLine.geometries[0].coords[progress%speed-1][0];  
            var dy = arcLine.geometries[0].coords[progress%speed][1] - arcLine.geometries[0].coords[progress%speed-1][1];  
            if(isNaN(dx) && isNaN(dy)){
            	
            }else{
            	var rotation = Math.atan2(dy, dx)  ;  
                var styleGeomarker = new ol.style.Style({  
                    image: new ol.style.Icon({  
                        src: 'static/images/tracker.png',  
                        rotateWithView: false,  
                        rotation: -rotation
                    })})  
                moveFeature.setGeometry(currentPoint);
                moveFeature.setStyle(styleGeomarker);
            }
            
        }  
        if (progress/speed < routeCoords.length-1) {  
        	animationFrame =  requestAnimationFrame(moveFeature2);  
        } else{
			$("#jkgj-btn-play-start > i").attr("class", "fa fa-play");
        	cancelAnimationFrame(animationFrame);  
            animationFrame = null;
        }
    }  
    
    
    

    $('#jkgj-mac').on('keyup', function(event){
        if(event.keyCode == 13){
            _f_.onSearchHandler();
        }
    });

    $('#jkgj-search-btn').on('click', function(){
        _f_.onSearchHandler();
    });

    $('#jkgj-startTime, #jkgj-endTime').on('click', function(){
        laydate({istime: true, elem: this, format: 'YYYY/MM/DD hh:mm:ss'});
    });
    
    $("#jkgj-btn-play-start").on("click", function(){
    	if(routeCoords.length > 0){
    		if($("#jkgj-btn-play-start > i").attr("class") == "fa fa-play"){
    			$("#jkgj-btn-play-start > i").attr("class", "fa fa-stop");
    			animationFrame = requestAnimationFrame(moveFeature2);  
    		}else{
    			$("#jkgj-btn-play-start > i").attr("class", "fa fa-play");
    			if(animationFrame != null){
                    cancelAnimationFrame(animationFrame);  
                    animationFrame = null;
    			}
    		}

    	}
    });
    $("#jkgj-btn-play-backward").on("click", function(){
    	if(routeCoords.length > 0 && progress >= speed){
    		var index = Math.floor(progress/speed) - 1;
    		progress =  index * 100 ;
			playSlider.update({
		         from: index
		    });
    	}
    		
    })
	 $("#jkgj-btn-play-forward").on("click", function(){
	    	if(routeCoords.length > 0 && progress < (routeCoords.length -1 )*speed){
	    		var index = Math.floor(progress/speed) + 1;
	    		progress =  index * 100 ;
				playSlider.update({
			         from: index
			    });
	    	}
	    })
    return {
        find: function(mac, startTime, endTime){
            $('#jkgj-startTime').val(Utils.formatDTString(startTime));
            $('#jkgj-endTime').val(Utils.formatDTString(endTime));
            $('#jkgj-mac').val(mac);
            //_f_.onSearchHandler();
        }
    }

})();