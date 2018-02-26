/**
 * 综合搜索  
 * Created by Administrator on 2017/1/18.
 */
module.search = (function(){
	
	var _f_ = {}, _MapApp, _cacheData, _rowcount, _smallPointVL, _numberPointVL, _popup, _selectFeature, _drawVL, _drawAction;
	var pageNum=0, queryPageSize=200, showPageSize=10;
	var param = {};
	
	//加载地图
	_MapApp = MapUtils.initMap(document.getElementById("zhcx-search-map"));
	
	/*
	 * 空间查询资源目录树 setting
	 */
	var setting = {
			check: {
				enable: true,
				nocheckInherit: true
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};

	/*
	 * 加载左侧资源目录
	 */
	_findZyfl = function(){
		Utils.ajax(basePath + '/main/zhcx/search/findZyfl', param, function(data){
			var treeNodes = [];
			for(var i=0; i<data.length; i++){
				var obj = data[i];
				var dl = obj.dl;
				var xl = obj.xl;
				var html = [];
				html.push('<div class="row zhcx-search-databox" style="margin-left:2px;margin-right:2px;">');
				html.push('<div class="col-lg-3 col-sm-3 col-xs-3">');
				html.push('<img src="static/images/zhcx/search/'+dl.url+'" style="width:40px; height:40px;margin: 25px auto;" >');
				html.push('</div>');
				html.push('<div class="col-lg-9 col-sm-9 col-xs-9 text-align-left padding-5" >');
				html.push('<label style="font-size: 14px;width:100%;color: #3698ec; font-weight: bolder;">'+dl.name+'</label>');
				treeNodes.push({ id:dl.code, pId:0, name:dl.name, open:false});
				for(var j=0; j<xl.length; j++){
					html.push(' <a href="#" class="btn btn-link"  style="padding:0;color:#000;font-size: 12px;display:inline" lx="'+dl.desp+'" xl="'+xl[j].desp+'">'+xl[j].name+'</a>');
					treeNodes.push({ id:xl[j].code, pId:dl.code, name:xl[j].name});
				}
				html.push('</div>');
				html.push('</div>');
				html.push('<hr style="margin-top:0px;margin-bottom:0px">');
				$("#zhcx-search-zyxl").append(html.join(""));
			}
			
			$.fn.zTree.init($("#treeDemo"), setting, treeNodes);
			
			$("#zhcx-search-zyxl a").on("click", function(){
				//console.log($(this).attr("xl"));
				var extent = _getMapExtent();
				pageNum = 0;
				param.keyword = "";
				param.lx = $(this).attr("lx");
				param.xl = $(this).attr("xl");
				param.ifview = $("#zhcx-search-ifview").is(":checked");
				param.extent = extent.join(",");
				param.pageNum = pageNum;
				param.pageSize = queryPageSize;
				_findIndex(0);
			});
		});
	}
	_findZyfl();
	
	/**
	 * 空间查询绘制图层
	 */
	_drawVL = new ol.layer.Vector({
		source: new ol.source.Vector({wrapX: false})
	});
	_MapApp.addLayer(_drawVL);
		
	/**
	 * 小红点查询绘制图层
	 */
	_smallPointVL = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
				image: new ol.style.Icon({
					src: 'static/images/zhcx/search/p.png'
				})
			})
    });
    _MapApp.addLayer(_smallPointVL);
    
    /**
	 * 大点查询绘制图层
	 */
    _numberPointVL = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    _MapApp.addLayer(_numberPointVL);
    
    _popup = new ol.Overlay.Popup (
			{	popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
				closeBox: true,
				onclose: function(){
					if($("#zhcx-search-ifview").is(":checked")){
						_MapApp.on("moveend", _onMapMoveEnd);
			    	}
				},
				positioning: "bottom-center",
				autoPan: false,
				autoPanAnimation: { duration: 100 }
			});
    _MapApp.addOverlay(_popup);
    
    _selectFeature = new ol.interaction.Select({});
    _MapApp.addInteraction(_selectFeature);
    
    _selectFeature.getFeatures().on(['add'], function(e)
	{	
    	if($("#zhcx-search-ifview").is(":checked")){
    		_MapApp.un("moveend", _onMapMoveEnd);
    	}
		
    	var feature = e.element;
    	var obj = feature.getProperties();
    	if(obj._markertype == "number"){
    		_popup.setOffset([0, -16]);
    	}else{
    		_popup.setOffset([0, 0]);
    	}
    	if(obj._markertype){
        	var html = "";
        	_popup.show(feature.getGeometry().getCoordinates(), obj.bt); 
    	}
    			
	})
	_selectFeature.getFeatures().on(['remove'], function(e)
	{	
		_popup.hide(); 
	});
    		
    		
    _gjSmallPointStyle = function(shade){
    	var st= [];
		// Shadow style
		if (shade){
			st.push ( new ol.style.Style(
					{	image: new ol.style.Shadow(
						{	radius: 8,
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
					{	
						color: "red",
						fontSize: 1,
						form: "none",
						glyph: "fa-circle",
						gradient: false,
						offsetY: 0,
						radius: 5,
						rotateWithView: false,
						rotation: 0,
						fill: new ol.style.Fill(
						{	color: "red"
						}),
						stroke: new ol.style.Stroke(
						{	color: "orange",
							width: 1
						})
					})
				}));
			return st;
		
    }
	
	$("#zhcx-search-button").on("click", function(){
		var extent = _getMapExtent();
		pageNum = 0;
		param.keyword = $("#zhcx-search-keyword").val();
		param.lx = $("#zhcx-search-zydl > LI[class='active']").attr("lx");;
		param.xl = "";
		param.ifview = $("#zhcx-search-ifview").is(":checked");
		param.extent = extent.join(",");
		param.pageNum = pageNum;
		param.pageSize = queryPageSize;
		_findIndex(0);
	});
	
	/*
	 * param 
	 * firstload:  是否是第一次加载  第一次加载需要加载分页插件
	 */
	_findIndex = function(curr){
		Utils.ajax(basePath + '/main/zhcx/search/findIndex', param, function(data){
        	_rowcount = data.count;
        	_showResultCount(_rowcount);
        	var result = data.result;
        	_cacheData = {};
        	for(var i=0; i<result.length; i++){
        		var key = (pageNum * queryPageSize) + i;
        		_cacheData[key] = result[i]
        	}
        	_showResultDiv();
        	_showSmallPoint();
        	$("#zhcx-search-result-list").html("");
        	if(result.length > 0){
        		var pageCount = Math.ceil(_rowcount/showPageSize);
            	layui_page({
    			    cont: 'zhcx-search-page-control',
    			    pages: pageCount,
    			    total: _rowcount,
    			    curr: curr,
    			    groups: 3,
    			    first: "<<",
    			    prev: '<',
    			    next: '>',
    			    last: false,
    			    skin: '#1E9FFF',
    			    jump: function(obj){
    			        //console.log(obj);
    			    	_findIndexJump(obj);
    			    }
    			});
        	}else{
        		$("#zhcx-search-page-control").html("");
        	}
        });
	}
	
	_findIndexJump = function(obj){
		var curr = obj.curr;
		_numberPointVL.getSource().clear();
		
		var index = (curr-1) * showPageSize;
		$("#zhcx-search-result-list").html("");
		/*
		 * 如果这一业的第0条没有数据   则需要去后台查询新的数据
		 */
		if(_cacheData[index]){
			for(var i=0; i<showPageSize; i++){
				var style = new ol.style.Style({
	  				image: new ol.style.Icon({
	  					src: 'static/images/zhcx/search/'+(i+1)+'.png',
	  					anchor: [0.5, 1]
	  				})
	  			});
				//index = index + i;
				var obj = _cacheData[index + i];
				
				//
				if(obj){
					var html = [];
					html.push('<div class="zhcx-search-result-list-item" id="zsrli-'+obj.id+'" index="'+(i+1)+'" title="'+obj.bt+'">');
					html.push('<div class="col-lg-3 col-sm-3 col-xs-3" >');
					html.push('<img src="'+'static/images/zhcx/search/'+(i+1)+'.png"  style="margin: 10px auto;"  class="rllayimg" >');
					html.push('</div>');
					html.push('<div class="col-lg-9 col-sm-9 col-xs-9 text-align-left padding-5" >');
					html.push('<p id="zsrli-p-'+obj.id+'"  style="margin-bottom: 1px;color: #36c;text-overflow:ellipsis;width:150px;white-space:nowrap;overflow:hidden;word-break:keep-all;cursor:pointer" >'+obj.bt+'</p>');
					html.push('<label style="font-weight:normal;"> 类型：'+obj.xl+' </label>');
					html.push('</div>');
					html.push('</div>');
					$("#zhcx-search-result-list").append(html.join(""));
					if( obj.x && obj.y){
						var pf = new ol.Feature({
			                geometry: new ol.geom.Point([obj.x, obj.y])
			            });
						obj._markertype = "number";
						pf.setProperties(obj);
						pf.setStyle(style);
						_numberPointVL.getSource().addFeature(pf);
					}
					
				}
			}
			
			$("#zhcx-search-result-list>div").hover(
					function () {
						var index = $(this).attr("index");
						var src = ($(this).find("img")).attr("src").replace(index, index+"_");
						($(this).find("img")).attr("src", src);
						var id = $(this).attr("id").split("-")[1];
						var features = _numberPointVL.getSource().getFeatures();
						for(var i=0; i<features.length; i++){
							var feature = features[i];
							if(feature.getProperties().id == id){
								var style = new ol.style.Style({
					  				image: new ol.style.Icon({
					  					src: src,
					  					anchor: [0.5, 1]
					  				})
					  			});
								feature.setStyle(style);

								break;
							}
						}
					},
					function () {
						var index = $(this).attr("index");
						var src = ($(this).find("img")).attr("src").replace(index+"_", index);
						($(this).find("img")).attr("src", src);
						
						var id = $(this).attr("id").split("-")[1];
						var features = _numberPointVL.getSource().getFeatures();
						for(var i=0; i<features.length; i++){
							var feature = features[i];
							if(feature.getProperties().id == id){
								var style = new ol.style.Style({
					  				image: new ol.style.Icon({
					  					src: src,
					  					anchor: [0.5, 1]
					  				})
					  			});
								feature.setStyle(style);
								
								break;
							}
						}
					}
			);
			
			$("#zhcx-search-result-list>div").find("p").on("click", function(){
				//console.log("hrer");
				var id = $(this).attr("id").split("-")[2];
				var features = _numberPointVL.getSource().getFeatures();
				for(var i=0; i<features.length; i++){
					var feature = features[i];
					var obj = feature.getProperties()
					console.log(obj.id + "  " + id)
					if(obj.id == id){
						_popup.setOffset([0, -16]);
				    	_popup.show(feature.getGeometry().getCoordinates(), obj.bt); 
				    	break;
					}
				}
			});
		}else{
			pageNum = Math.floor((curr-1)/(queryPageSize/showPageSize));
			param.pageNum = pageNum;
			_findIndex(curr);
		}
		
		
	}
	
	_showSmallPoint = function(){
		_smallPointVL.getSource().clear();
		_numberPointVL.getSource().clear();
		for(var i in _cacheData){
			if(_cacheData[i].x && _cacheData[i].y){
				var pf = new ol.Feature({
	                geometry: new ol.geom.Point([_cacheData[i].x, _cacheData[i].y])
	            });
				_cacheData[i]._markertype = "small";
				pf.setProperties(_cacheData[i]);
				_smallPointVL.getSource().addFeature(pf);
			}
		}
	}
	
	
	$("#zhcx-search-result-back").on("click", function(){
		_showZyflDiv();
	});
	
	$("#zhcx-search-ifview").on("change", function(){
		var flag = $(this).is(":checked");
		if(flag){
			_MapApp.on("moveend", _onMapMoveEnd);
		}else{
			_MapApp.un("moveend", _onMapMoveEnd);
		}
	})
	
	$("#zhcx-search-kjquery").on("click", function(){
		var screenWidth = $(window).width();
		
		layer.open({
			type: 1,
			title: '空间查询',
			maxmin: true,
		    closeBtn: 1,//0：没有关闭按钮，1：有关闭按钮
		    area: ["230px", "400px"],//宽高、
			offset: ["230px", screenWidth - 240 + "px"],
		    shade: false,
		    maxmin: false,
		    shadeClose: false, //是否点击白色以外的区域关闭
		    scrollbar: false,
		    content: $("#kjquery_layer_content"),
			success: function(){
		    }
		});
	});
	
	  //设备列表map范围查询设备按钮事件
    $("#zhcx-search-kjcx-buttonbar > button").on('click', function(){
    	
    	
    	_drawVL.getSource().clear();
    	
    	if(_drawAction){
    		_MapApp.removeInteraction(_drawAction);
    	}
    	
    	if($(this).attr('type') =='Circle'){
    		 //_MapApp.
    		_drawAction = new ol.interaction.Draw({
    			 source: _drawVL.getSource(),
    			 type: "Circle"
    		 });
    	 }else if($(this).attr('type') =='Box'){
    		 _drawAction = new ol.interaction.Draw({
    			 source: _drawVL.getSource(),
    			 type: "LineString",
    			 maxPoints: 2, 
    			 geometryFunction: function(coordinates, geometry){
    				 if(!geometry){
    					 geometry = new ol.geom.Polygon(null);
    				 }
    				var start =  coordinates[0];
 					var end = coordinates[1];
 					geometry.setCoordinates([
 						[start, [start[0], end[1]], end, [end[0], start[1]], start]
 					]);
 					return geometry;
    			 }
    		 });
    	 }else if($(this).attr('type') =='Polygon'){
    		 _drawAction = new ol.interaction.Draw({
    			 source: _drawVL.getSource(),
    			 type: "Polygon"
    		 });
    	 }
    	
    	_MapApp.addInteraction(_drawAction);
    	
    	_drawAction.on("drawend", function(eve){
    		_MapApp.removeInteraction(_drawAction);
    		var feature = eve.feature;
			var geo = feature.getGeometry();
			//console.log(geo.getCoordinates());
			var geotype = geo.getType();
			var coords = "";
			if(geotype == "Circle"){
				var center  = geo.getCenter();
				//coords = geo.getCenter() + "," + geo.getRadius();
				var x;
				var y;
				var points=[];
				var angle = Math.PI * 2 * i / 100;
				for (var i=0; i < 100; i++)
				{
					x=center[0] + radius * Math.sin(angle);
					y=center[1] + radius * Math.cos(angle);
					points.push(x + "," + y);
				}
				
			}else if(geotype == "Polygon"){
				var arr = geo.getCoordinates();
				arr = arr[0]
				for(var i=0; i<arr.length; i++){
					coords += arr[i][0] + "," + arr[i][1]
					if(i < arr.length -1){
						coords += ",";
					}
				}
			}
			
			console.log(coords);
    		
    	});
    	//
    });
	
	_onMapMoveEnd = function(event){
		//console.log(event.map);
		var extent = _getMapExtent();
		pageNum = 0;
		param.keyword = $("#zhcx-search-keyword").val();
		param.lx = $("#zhcx-search-zydl > LI[class='active']").attr("lx");;
		param.xl = "";
		param.ifview = $("#zhcx-search-ifview").is(":checked");
		param.extent = extent.join(",");
		param.pageNum = pageNum;
		param.pageSize = queryPageSize;
		_findIndex(0);
	}
	
	_getMapExtent = function(){
		var mbr=_MapApp.getView();
		mbr = mbr.calculateExtent(_MapApp.getSize());
		return mbr;
	}
	
	_showResultCount = function(count){
		$("#zhcx-search-result-count").html("共有" + count + "条结果");
	}
	
	_showZyflDiv = function(){
		$("#zhcx-search-zyxl").css("display", "block");
	}
	_showResultDiv = function(){
		$("#zhcx-search-zyxl").removeClass().addClass("fadeOutLeftBig animated").one("webkitAnimationEnd oanimationend animationend", function(){
			$("#zhcx-search-zyxl").removeClass();
			$("#zhcx-search-zyxl").css("display", "none");
		});
	}
	

    return {

    }

})();

