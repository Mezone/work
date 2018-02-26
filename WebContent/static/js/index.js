var layer, laydate, layui_page, layui_flow, table;

var _MapApp, _baseVL, _polygonVL, _bkxxVL, _yjclVL,  _ztzyVL,  _gpsVL, _clgjVL, _selectFeature, _popup, _gpsWsSocket, _sysWsSocket;
var _drawAction, _drawVL, _ztzyKjVL;
var  gpsOnCircle = false, turfpolygon=[];
var meter1 = 50000, meter2 = 3000;
var layer_jcz, layer_clgj, layer_videoplaylist, sjdt_layer;
var clgjFeatureLine;
var _measureTooltipElement,_measureTooltip;
var plotDraw, plotEdit, drawOverlay;
var zbcsData;

$(document).ready(function(){
	
	layui.use(['layer', 'laydate', 'laypage', 'flow', 'table'], function(){
	    layer = layui.layer;
	    laydate = layui.laydate;
	    layui_page = layui.laypage;
	    layui_flow = layui.flow;
	    table = layui.table;
		initYjbbTable();
	    _connectionSys(wsPath + "/syssocket", wsPath + "/sockjs/syssocket");
	    
	    layer.open({
	    	type: 1,
			title: "专题资源",
			area: ['400px', '280px'],
			offset: [ "90px", "15px"],
			shade: 0,
			content: $("#ztzy-widget"),
			closeBtn: false,
			success: function(){
				
			},
			cancel: function(){
			}
	    })
	});
	
	initMap();
	
	
    _connectionGps(wsPath + "/gpssocket", wsPath + "/sockjs/gpssocket");
    
    initColorPick();
    
    
    	
    	

});

function initMap(){
	_MapApp = MapUtils.initMap(document.getElementById("main-map"));
	
	
	_baseVL = new ol.layer.Vector({
	       source: new ol.source.Vector({wrapX: false})
	});
    _MapApp.addLayer(_baseVL);
	 /**
    * 空间查询绘制图层
    */
  _drawVL = new ol.layer.Vector({
       source: new ol.source.Vector({wrapX: false})
   });
   _MapApp.addLayer(_drawVL);
   
   _polygonVL = new ol.layer.Vector({
       source: new ol.source.Vector({wrapX: false})
   });
   _MapApp.addLayer(_polygonVL);
   
   _ztStyle = function(feature, resolution){
	   	var st= [];
	   	var obj = feature.getProperties();
//	   	var policetypeid = parseInt(obj.gpsInfo.policetypeid);
	   	var anchor = [0.5, 0.5];
	   	var imgurl = "static/images/ztzy/spjk.png";
	   	if(obj.type == "spjk"){
	   		imgurl = "static/images/ztzy/spjk.png";
	   	}else if(obj.type == "jcz"){
	   		imgurl = "static/images/ztzy/zagt.png";
	   	}else if(obj.type == "jczzb"){
	   		imgurl = "static/images/ztzy/zagt.png";
	   	}else if(obj.type == "kk"){
	   		imgurl = "static/images/ztzy/zakk.png";
	   	}else if(obj.type == "gps"){
	   		var icon = obj.gpsInfo.icon;
	   	   	imgurl = 'static/images/gps/'+icon+'.png';
	   	}else if(obj.type == "yjcl"){
	   		imgurl = 'static/images/bkyj/red.png';
	   	}else if(obj.type == "clgj"){
	   		anchor = [0.5, 1];
	   		imgurl = "static/images/ztzy/zakk.png";
	   	}
	   	
		st.push ( new ol.style.Style(
					{	image: new ol.style.Icon({  
			            src: imgurl,  
			            rotateWithView: true,
			           anchor: anchor
			        })
					}));
			return st;
	   }
   
	_gpsVL = new ol.layer.Vector({
       source: new ol.source.Vector(),
       style: function(feature, resolution){
           //_gjStyle.getText().setText(feature.get('name'));
           return _ztStyle(feature, resolution);
       },
       visible: false
   });
   
   _MapApp.addLayer(_gpsVL);
   
   
   _ztzyVL= new ol.layer.Vector({
       source: new ol.source.Vector(),
       style: function(feature, resolution){
           //_gjStyle.getText().setText(feature.get('name'));
           return _ztStyle(feature, resolution);
       }
   });
	
   _MapApp.addLayer(_ztzyVL);
   
   _ztzyKjVL= new ol.layer.Vector({
       source: new ol.source.Vector(),
       style: function(feature, resolution){
           //_gjStyle.getText().setText(feature.get('name'));
           return _ztStyle(feature, resolution);
       }
   });
	
   _MapApp.addLayer(_ztzyKjVL);
   
   
   
   _bkxxVL= new ol.layer.Vector({
       source: new ol.source.Vector(),
	   style: function(feature, resolution){
	       //_gjStyle.getText().setText(feature.get('name'));
	       return _ztStyle(feature, resolution);
	   },
   });
	
   _MapApp.addLayer(_bkxxVL);

   _yjclVL= new ol.layer.Vector({
       source: new ol.source.Vector(),
	   style: function(feature, resolution){
	       //_gjStyle.getText().setText(feature.get('name'));
	       return _ztStyle(feature, resolution);
	   },
	   visible: false,
   });
	
   _MapApp.addLayer(_yjclVL);
   

   _clgjVL= new ol.layer.Vector({
       source: new ol.source.Vector(),
	   style: function(feature, resolution){
	       //_gjStyle.getText().setText(feature.get('name'));
	       return _ztStyle(feature, resolution);
	   }
   });
	
   _MapApp.addLayer(_clgjVL);
   
   
   
   
   _popup = new ol.Overlay.Popup (
			{	popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
				closeBox: true,
				onclose: function(){
						_selectFeature.getFeatures().clear();
				},
				positioning: "bottom-center",
				autoPan: false,
				autoPanAnimation: { duration: 100 }
			});
   _MapApp.addOverlay(_popup);
   
   _MapApp.on('click', function(e){
	   console.log(e.coordinate);
   })
   
   
   _selectFeature = new ol.interaction.Select({
	   style: function(feature, resolution){
           //_gjStyle.getText().setText(feature.get('name'));
           return _ztStyle(feature, resolution);
       }, 
       layers: [_ztzyVL, _bkxxVL, _ztzyKjVL, _gpsVL, _yjclVL, _clgjVL]
   });
   _MapApp.addInteraction(_selectFeature);
   
   _selectFeature.getFeatures().on(['add'], function(e)
	{	
	   var feature = e.element;
	   _measureTooltipElement.classList.add('hidden');
	   openPopWin(feature);
   			
	});
	_selectFeature.getFeatures().on(['remove'], function(e)
	{	
		_mouseOnFeature.setActive(true);
	});
	
	
	_mouseOnFeature = new ol.interaction.Select({
		   style: function(feature, resolution){
	           //_gjStyle.getText().setText(feature.get('name'));
	           return _ztStyle(feature, resolution);
	       }, 
	       condition: ol.events.condition.pointerMove,
	       layers: [_ztzyVL, _gpsVL]
	   });
	_MapApp.addInteraction(_mouseOnFeature);
	_mouseOnFeature.getFeatures().on(['add'], function(e)
	{	
	   var feature = e.element;
		var obj = feature.getProperties();
		//_popup.show(feature.getGeometry().getCoordinates(),  obj.mc);
		//if(obj.type == "spjk" || obj.type == "jcz" || obj.type == "kk" || obj.type == "gps"){
			 _measureTooltipElement.innerHTML = obj.mc;
		   	 _measureTooltip.setPosition(feature.getGeometry().getCoordinates());
		     _measureTooltipElement.classList.remove('hidden');
	   //	}
	  
   			
	});
	_mouseOnFeature.getFeatures().on(['remove'], function(e)
	{	
	       _measureTooltipElement.classList.add('hidden');

	});
	
	if(_measureTooltipElement) {
		 _measureTooltipElement.parentNode.removeChild(_measureTooltipElement);
      }
	_measureTooltipElement = document.createElement('div');
	_measureTooltipElement.className = 'map-tooltip map-tooltip-measure';
    _measureTooltip = new ol.Overlay({
        element: _measureTooltipElement,
        offset: [0, -20],
        positioning: 'bottom-center'
      });
    _MapApp.addOverlay(_measureTooltip);
    
    _MapApp.getView().on('change:resolution', function(evt){
    	//console.log(evt);
    	console.log(_MapApp.getView().getZoom());
    	
    	showZbcsByLevel(_MapApp.getView().getZoom());
    	
    });
    
    if(lj == 1){
    	$(".ol-viewport canvas").addClass("mapfilter");
    }
    
    initZbcs();
    
}

function initZbcs(){
	Utils.ajax(basePath + "/app/selectZbcs", {}, function(data){
		zbcsData = data.data;
		showZbcsByLevel(10);
	});
	
}

function showZbcsByLevel(level){
	var data = zbcsData[level];
	_baseVL.getSource().clear();
	for(var i=0; i<data.length; i++){
		var obj = data[i];
		var text = obj.bt;
		var points =  obj.zbz;
		points = points.split(";");
		var style = new ol.style.Style({
			text: new ol.style.Text({
    				textAlign: "left",
    				textBaseline: "middle",
    				text: text,
    				fill: new ol.style.Fill({color: "#6C1460"}),
    				font: "bold 20px Microsoft YaHei UI"
    			})
			});
		for(var j=0; j<points.length; j++){
			var pp = points[j].split(",")
			var feature =  new ol.Feature({
        		geometry: new ol.geom.Point([parseFloat(pp[0]), parseFloat(pp[1])])
		    });
    		feature.setStyle(style);
    		_baseVL.getSource().addFeature(feature);
		}
	}
}


function openPopWin(feature){
	_mouseOnFeature.setActive(false);
   	var obj = feature.getProperties();
   	if(obj.type){
   		var htm = "";
   		if(obj.mc){ 
   			htm += "<font style='color: #2b84ea;font-weight: bold;font-size:20px'>" + obj.mc + "</font>";
   		}
   		htm += "<ul>";
   		if("clgj" != obj.type){
   			if(obj.kkmc){
   	   			htm += "<li class='padding-top-5'>卡口名称：" + obj.kkmc + "</li>";
   	   		}
   		}
   		
   		if(obj.date){
   			htm += "<li class='padding-top-5'>信号时间：" + obj.date + "</li>";
   		}
   		
   		if(obj.ssdwmc){
   			htm += "<li class='padding-top-5'>所属单位名称：" + obj.ssdwmc + "</li>";
   		}
   		if(obj.bmmc){
   			htm += "<li class='padding-top-5'>单位名称：" + obj.bmmc + "</li>";
   		}
   		if(obj.typemc){
   			htm += "<li class='padding-top-5'>监控类型：" + obj.typemc + "</li>";
   		}
   		if(obj.hphm){
   			htm += "<li class='padding-top-5'>车牌号码：" + obj.hphm + "</li>";
   		}
   		if(obj.jgsj){
   			htm += "<li class='padding-top-5'>经过时间：" + obj.jgsj + "</li>";
   		}
   		if(obj.xsfxmc){
   			htm += "<li class='padding-top-5'>行驶方向：" + obj.xsfxmc + "</li>";
   		}
   		if(obj.bkyy){
   			htm += "<li class='padding-top-5'>布控原因：" + obj.bkyy + "</li>";
   		}
   		if(obj.gpsInfo){
   			var gpsinfo = obj.gpsInfo;
   			if(gpsinfo.sim){
   				htm += "<li class='padding-top-5'>SIM卡号：" + gpsinfo.sim + "</li>";
   			}
   			if(gpsinfo.ssdwmc){
   				htm += "<li class='padding-top-5'>所属单位：" + gpsinfo.ssdwmc + "</li>";
   			}
   			if(gpsinfo.ssdwlx){
   				htm += "<li class='padding-top-5'>单位类型：" + gpsinfo.ssdwlx + "</li>";
   			}
   		}
   		
   		switch(obj.type){
   			case "spjk":
   				htm += "<li class='padding-top-5'><a href='javascript:void(0)' style='line-height:20px' >查看2.5维地图</a><a id='pop-video' style='margin-left:10px;line-height:20px'  href='javascript:void(0)' >查看视频</a></li>";;
   				htm += "<li class='padding-top-5'><a id='pop-video-addlist' style='line-height:20px'  href='javascript:void(0)' >添加到播放列表</a></li>";;
   				break;
   			case "jczzb":
   				htm += "<li class='padding-top-5'><a href='javascript:void(0)' style='line-height:20px'>查看2.5维地图</a><a id='pop-video-many' style='margin-left:10px;line-height:20px'  href='javascript:void(0)'>查看周边视频</a>" + "</li>";
   				htm += "<li class='padding-top-5'><a href='javascript:void(0)' style='line-height:20px' name='pop-video-jcz-zn'>查看站内视频</a><a   name='pop-video-jcz-zw' style='margin-left:14px;line-height:20px'  href='javascript:void(0)'>查看站外视频</a>" + "</li>";;
   				htm += "<li class='padding-top-5'><a name='pop-cksj' style='margin-left:10px;line-height:20px'  href='javascript:void(0)'>查看实景</a></li>";;
   				break;
   			case "yjcl":
   				htm += "<li class='padding-top-5'>抓拍照片：<img src="+obj.zp+" style='max-width:200px;cursor:pointer;' id='popup-qjzp' >" + "</li>";;
   				 break;
   			case "clgj":
   				htm += "<li class='padding-top-5'>抓拍照片：<img src="+obj.zp+" style='max-width:200px;cursor:pointer' id='popup-qjzp' >" + "</li>";;
   				 break;
   			case "jcz":
   				htm += "<li class='padding-top-5'><a href='javascript:void(0)' style='line-height:20px' name='pop-video-jcz-zn'>查看站内视频</a><a name='pop-video-jcz-zw' style='margin-left:10px;line-height:20px'  href='javascript:void(0)'>查看站外视频</a>" + "</li>";;
   				htm += "<li class='padding-top-5'><a href='javascript:void(0)' style='line-height:20px'>查看2.5维地图</a><a name='pop-cksj' style='margin-left:10px;line-height:20px'  href='javascript:void(0)'>查看实景</a>" + "</li>";
   				break;
   			default: 
   				if(obj.type != "gps"){
   		   			htm += "<li class='padding-top-5'><a href='javascript:void(0)' style='line-height:20px'>查看2.5维地图</a>" + "</li>";;
   				}
   		}
   		htm += "</ul>";
       	_popup.show(feature.getGeometry().getCoordinates(), htm);
       	
       	popOpenClick(obj);
   	}
}

function popOpenClick(obj){
	if(	$("#pop-video")){
   		$("#pop-video").click(function(){
       		window.open("IEttp://10.53.188.161:80/cas/remoteLogin?username=client001&password=2DF8FE27B67B858F22321D2DE94549E0&service=http%3A%2F%2F10.53.188.161%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%3D"+obj.dm+"%26wndNum%3D1%26previewType%3D1");
       	});
   	}
   	if(	$("#pop-video-many")){
   		$("#pop-video-many").click(function(){
   			var jcradius =  meter2 * 360/(2 * Math.PI * 6378137) ;
        	
        	var points = [];
    		for (var j=0; j < 100; j++)
            {
                var angle = Math.PI * 2 * j / 100;
                var x = parseFloat(obj.zbx) + jcradius * Math.sin(angle);
                var y = parseFloat(obj.zby) + jcradius * Math.cos(angle);
                points.push([x, y]);
            }
    		points.push(points[0]);
    		
    		 Utils.ajax (basePath + "/app/selectZyByCoords", {coords: points.join(",")}, function(data){
    			var sptddm = [];
 				var list = data["spjk"];
					for(var ki=0; ki<list.length; ki++){
 					if(list[ki].dm){
 						sptddm.push(list[ki].dm);
 					}
 				}
				var len = sptddm.length;
				var	size = 25;
				var page = Math.floor(len/size) + 1;
				
				console.log(len + "  " + page);
				for(var i = 0; i<page; i++){
					var num = size;
					if(i == page -1){
						num = len - (page - 1) * size
					}
					var dms = [];
					for(var j=0; j<num; j++){
						dms.push(sptddm[i * size + j]);
					}
					console.log(dms);
		       		window.open("IEttp://10.53.188.161:80/cas/remoteLogin?username=client001&password=2DF8FE27B67B858F22321D2DE94549E0&service=http%3A%2F%2F10.53.188.161%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%3D"+dms.join("|")+"%26wndNum%3D"+dms.length+"%26previewType%3D1");

					//console.log("IEttp://10.53.188.161:80/cas/remoteLogin?username=client001&password=2DF8FE27B67B858F22321D2DE94549E0&service=http%3A%2F%2F10.53.188.161%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%3D"+dms.join("|")+"%26wndNum%3D"+dms.length+"%26previewType%3D1");
				}
     			
     		});
       	});
   	}
   	if($("#popup-qjzp")){
   		$("#popup-qjzp").click(function(){
        	var that = this
        	layer.photos({
        		photos: {
        			start: 0,
            		data: [
            			{
            				src: $(that).attr("src"),
            				thumb: $(that).attr("src")
            			}
            			]
        		},
        		anim: 0,
        		shade: .1
        		
        	});
        });
   	}
   	if($("#pop-video-jcz")){
   		$("#pop-video-jcz").click(function(){
   			var tdh = obj.tdh;
   			tdh = tdh.split("|");
   			if(tdh.length > 0){
	       		window.open("IEttp://10.53.188.161:80/cas/remoteLogin?username=client001&password=2DF8FE27B67B858F22321D2DE94549E0&service=http%3A%2F%2F10.53.188.161%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%3D"+tdh.join("|")+"%26wndNum%3D"+tdh.length+"%26previewType%3D1");
   			}
   		});
   	}
   	
   	if($("#pop-video-addlist")){
   		$("#pop-video-addlist").click(function(){
   			console.log(obj);
   			if(!layer_videoplaylist){
   				var width = $(window).width();
   				layer_videoplaylist = layer.open({
   					type: 1,
   					title: "播放列表",
   					area: ['250px', '300px'],
   					offset: [ "90px", width - 270 + "px"],
   					shade: 0,
   					content: "<div  style='font-size:18px;height:250px;width:250px;overflow-y:auto' ><table id='video_play_list' class='layui-table'></table><div style='position:absolute;bottom:5px;width:250px;text-align:center;'><button class='btn btn-primary' id='video_list_play_button' >播放全部</button></div></div>",
   					success: function(){
   						$("#video_play_list").append("<tr><td style='min-height: 14px;line-height: 14px; font-size: 18px;' dm='"+obj.dm+"'>"+obj.mc+"</td></tr>");
   						
   						$("#video_list_play_button").click(function(){
   							var dms = [];
   			   				$("#video_play_list td").each(function(index, item){
   			   					//console.log(index + "  " + item);
   			   					if($(item).attr("dm")){
   			   						dms.push($(item).attr("dm"));
   			   					}
   			   				});
	   			   			if(dms.length > 0){
	   				       		window.open("IEttp://10.53.188.161:80/cas/remoteLogin?username=client001&password=2DF8FE27B67B858F22321D2DE94549E0&service=http%3A%2F%2F10.53.188.161%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%3D"+dms.join("|")+"%26wndNum%3D"+dms.length+"%26previewType%3D1");
	   			   			}
   						})
   					},
   					cancel: function(){
   						layer_videoplaylist = null;
   					}
   				});
   			}else{
   				var dms = [];
   				$("#video_play_list td").each(function(index, item){
   					//console.log(index + "  " + item);
   					if($(item).attr("dm")){
   						dms.push($(item).attr("dm"));
   					}
   				});
   				if( $.inArray(obj.dm, dms) <0 ){
   	   				$("#video_play_list").append("<tr><td style='min-height: 14px;line-height: 14px; font-size: 18px;' dm='"+obj.dm+"'>"+obj.mc+"</td></tr>")
   				}
   			}
   		});
   	}
   	
   	if($("a[name='pop-video-jcz-zn']")){
   		$("a[name='pop-video-jcz-zn']").click(function(){
   			var param = {jczid: obj.jlbh, type: "2"};
	   		 Utils.ajax (basePath + "/app/selectJczGlJk", param, function(data){
	 			var sptddm = [];
				var list = data.list
				for(var ki=0; ki<list.length; ki++){
					if(list[ki].tdh){
						sptddm.push(list[ki].tdh);
					}
				}
					
		       window.open("IEttp://10.53.188.161:80/cas/remoteLogin?username=client001&password=2DF8FE27B67B858F22321D2DE94549E0&service=http%3A%2F%2F10.53.188.161%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%3D"+sptddm.join("|")+"%26wndNum%3D"+sptddm.length+"%26previewType%3D1");

	  		});
   		});
   	}
   	if($("a[name='pop-video-jcz-zw']")){
   		$("a[name='pop-video-jcz-zw']").click(function(){
   			var param = {jczid: obj.jlbh, type: "1"};
	   		 Utils.ajax (basePath + "/app/selectJczGlJk", param, function(data){
	 			var sptddm = [];
				var list = data.list
				for(var ki=0; ki<list.length; ki++){
					if(list[ki].tdh){
						sptddm.push(list[ki].tdh);
					}
				}
		       window.open("IEttp://10.53.188.161:80/cas/remoteLogin?username=client001&password=2DF8FE27B67B858F22321D2DE94549E0&service=http%3A%2F%2F10.53.188.161%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%3D"+sptddm.join("|")+"%26wndNum%3D"+sptddm.length+"%26previewType%3D1");

	  		});
   		});
   	}
   	
   	if($("a[name='pop-cksj']")){
   		$("a[name='pop-cksj']").click(function(){
   			var height = $(window).height();
			var width = $(window).width();
			if(sjdt_layer){
				sjdt_layer.close();
				sjdt_layer = null;
			}
			sjdt_layer = layer.open({
				type: 2,
				area: ['400px', '400px'],
				offset: [  110 + "px", width - 420 + "px"],
				shade: 0,
				content: "http://10.53.187.115:8080/sjdt/index.html",
				title: "实景",
				cancel: function(){
					sjdt_layer = null;
				}
			})
   		});
   	}
   	
}

function initColorPick(){
	$('.colorpicker').each(function () {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function (hex, opacity) {
                if (!hex) return;
                if (opacity) hex += ', ' + opacity;
                try {
                   // console.log(hex);
                } catch (e) { }
            },
            theme: 'bootstrap'
        });

    });

}

$('#ztzy-widget *[data-toggle="collapse"]').on("click",function(n){
	n.preventDefault();
	var t=$(this).parents(".widget").eq(0),r=t.find(".widget-body"),i=$(this).find("i"),u="fa-plus",f="fa-minus",e=300;
	t.hasClass("collapsed")?(i&&i.addClass(f).removeClass(u),t.removeClass("collapsed"),r.slideUp(0,function(){r.slideDown(e)})):(i&&i.addClass(u).removeClass(f),r.slideUp(200,function(){t.addClass("collapsed")}))
});

$("#zy-spjk").change(function(){
	_drawVL.getSource().clear();
	if($(this).is(":checked")){
		//
		Utils.ajax (basePath + "/app/selectAllVideo", {}, function(data){
			data = data.list;
			for(var i=0; i<data.length; i++){
				data[i].type = "spjk";
				var feature =  new ol.Feature({
            		geometry: new ol.geom.Point([parseFloat(data[i].zbx), parseFloat(data[i].zby)])
    		    });
            	feature.setProperties(data[i]);
            	_ztzyVL.getSource().addFeature(feature);
			}
		});
	}else{
		var features = _ztzyVL.getSource().getFeatures();
		for(var i=0; i<features.length; i++){
			var feature = features[i];
			var obj = feature.getProperties();
			if(obj.type == "spjk"){
				_ztzyVL.getSource().removeFeature(feature);
			}
		}
		
	}
});

$("#zy-jcz").change(function(){
	if($(this).is(":checked")){
		//
		Utils.ajax (basePath + "/app/selectAllJcz", {}, function(data){
			data = data.list;
			var html = [];
			html.push("<table class='layui-table'>");
			html.push("<tr><th>名称</th><th>操作</th></tr>");
			for(var i=0; i<data.length; i++){
				data[i].type = "jcz";
				var feature =  new ol.Feature({
            		geometry: new ol.geom.Point([parseFloat(data[i].zbx), parseFloat(data[i].zby)])
    		    });
				feature.setId("ztzy-jcz-"+ data[i].jlbh);
            	feature.setProperties(data[i]);
            	_ztzyVL.getSource().addFeature(feature);
            	html.push("<tr><td style='cursor:pointer' event='openpop' jczid='"+data[i].jlbh+"'>"+data[i].mc+"</td>");
            	html.push("<td><a style='margin-left:10px;line-height:20px' jczid='"+data[i].jlbh+"' href='javascript:void(0)' >查看实景</a></td></tr>");
			}
			html.push("</table>");
			
			layer_jcz = layer.open({
				type: 1,
				id: "layer_jcz_all", 
				area: ['400px', '300px'],
				offset: [ "380px", "15px"],
				shade: 0,
				content: html.join(""),
				title: "检查站",
				success: function(){
					$("#layer_jcz_all td[event='openpop']").click(function(){
						//console.log($(this).attr("jczid"));
						var feature = _ztzyVL.getSource().getFeatureById("ztzy-jcz-"+ $(this).attr("jczid"));
						openPopWin(feature);
						MapUtils.panTo(_MapApp, feature.getGeometry().getCoordinates());

					});
					
					$("#layer_jcz_all a").click(function(){
						//console.log($(this).attr("jczid"));
						console.log(12312);
						var jczid = $(this).attr("jczid")
						var height = $(window).height();
						var width = $(window).width();
						if(sjdt_layer){
							sjdt_layer.close();
							sjdt_layer = null;
						}
						sjdt_layer = layer.open({
							type: 2,
							area: [ width + "px", height + "px"],
							//offset: [  110 + "px", width - 420 + "px"],
							shade: 0,
							maxmin: true,
							content: basePath + "/main/swqj?jlbh="+jczid,
							title: "实景",
							
							cancel: function(){
								sjdt_layer = null;
							}
						})
					});
				},
				cancel: function(){
					layer_jcz = null;
				}
			});

		});
	}else{
		var features = _ztzyVL.getSource().getFeatures();
		for(var i=0; i<features.length; i++){
			var feature = features[i];
			var obj = feature.getProperties();
			if(obj.type == "jcz"){
				_ztzyVL.getSource().removeFeature(feature);
			}
		}
		layer.close(layer_jcz);
		
	}
});

$("#zy-kk").change(function(){
	if($(this).is(":checked")){
		//
		Utils.ajax (basePath + "/app/selectAllKk", {}, function(data){
			data = data.list;
			for(var i=0; i<data.length; i++){
				data[i].type = "kk";
				var feature =  new ol.Feature({
            		geometry: new ol.geom.Point([parseFloat(data[i].zbx), parseFloat(data[i].zby)])
    		    });
            	feature.setProperties(data[i]);
            	_ztzyVL.getSource().addFeature(feature);
			}
		});
	}else{
		var features = _ztzyVL.getSource().getFeatures();
		for(var i=0; i<features.length; i++){
			var feature = features[i];
			var obj = feature.getProperties();
			if(obj.type == "kk"){
				_ztzyVL.getSource().removeFeature(feature);
			}
		}
		
	}
});

$("#zy-gps").change(function(){
	if($(this).is(":checked")){
		_gpsVL.setVisible(true);
	}else{
		_gpsVL.setVisible(false);
	}
});



$("#kjcx-button a").click(function(){
	$("#zy-spjk, #zy-jcz, #zy-kk").prop("checked", false).change();
	_drawVL.getSource().clear();
	_ztzyKjVL.getSource().clear();
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
    }else if($(this).attr('type') =='Clear'){
    	//$("#zy-spjk, #zy-jcz, #zy-kk").prop("checked", false).change();
    	_ztzyKjVL.getSource().clear();
    	_popup.hide();
    }
    if($(this).attr('type') !='Clear'){
    	_MapApp.addInteraction(_drawAction);

        _drawAction.on("drawend", function(eve){
            _MapApp.removeInteraction(_drawAction);
            var feature = eve.feature;
            var geo = feature.getGeometry();
            //console.log(geo.getCoordinates());
            var geotype = geo.getType();
            var coords = [];
            if(geotype == "Circle"){
                var center  = geo.getCenter();
                var radius = geo.getRadius();
                for (var i=0; i < 100; i++)
                {
                    var angle = Math.PI * 2 * i / 100;
                    var x=center[0] + radius * Math.sin(angle);
                    var y=center[1] + radius * Math.cos(angle);
                    coords.push(x + "," + y)
                }
                coords.push(coords[0])
            }else if(geotype == "Polygon"){
                var arr = geo.getCoordinates();
                arr = arr[0]
                for(var i=0; i<arr.length; i++){
                    //coords += arr[i][0] + " " + arr[i][1]
                    coords.push(arr[i][0] + "," + arr[i][1])
                }
            }
            
            Utils.ajax (basePath + "/app/selectZyByCoords", {coords: coords.join(",")}, function(data){
    			for(var key in data){
    				var list = data[key];
    				for(var i=0; i<list.length; i++){
    					list[i].type = key;
    					var feature =  new ol.Feature({
    	            		geometry: new ol.geom.Point([parseFloat(list[i].zbx), parseFloat(list[i].zby)])
    	    		    });
    	            	feature.setProperties(list[i]);
    	            	_ztzyKjVL.getSource().addFeature(feature);
    				}
    			}
    			
    		});
        });
    }

    
	
});



$("#clyj-checkbox").change(function(){
	if($(this).is(":checked")){
		classie.add( document.getElementById( 'bottom-menu' ), 'cbp-spmenu-open' );
		_yjclVL.setVisible(true);
	}else{
		classie.remove( document.getElementById( 'bottom-menu' ), 'cbp-spmenu-open' );
		_yjclVL.setVisible(false);

	}
});

$("#map_plot").click(function(){
	//_plotVl
	var height = $(window).height();
	var width = $(window).width();
	layer.open({
		type: 1,
		id: "plot_layer",
		title: "地图标绘",
		area: ['400px', '280px'],
		offset: [  110 + "px", width - 420 + "px"],
		shade: 0,
		content: $("#polt_form"),
		success: function(){
		    // 初始化标绘绘制工具，添加绘制结束事件响应
		    plotDraw = new P.PlotDraw(_MapApp);
		    plotDraw.on(P.Event.PlotDrawEvent.DRAW_END, onDrawEnd, false, this);

		    // 初始化标绘编辑工具
		    plotEdit = new P.PlotEdit(_MapApp);

		    // 设置标绘符号显示的默认样式
		    var stroke = new ol.style.Stroke({
		        color: '#FF0000',
		        width: 2
		    });
		    var fill = new ol.style.Fill({color: 'rgba(0,255,0,0.4)'});
		    var image = new ol.style.Circle({fill: fill, stroke: stroke, radius: 8});
		    drawStyle = new ol.style.Style({image: image, fill:fill, stroke:stroke});

		    // 绘制好的标绘符号，添加到FeatureOverlay显示。
		    drawOverlay = new ol.layer.Vector({
		        source: new ol.source.Vector()
		    });
		    drawOverlay.setStyle(drawStyle);
		    _MapApp.addLayer(drawOverlay);

		},
		cancel: function(){
			_MapApp.removeLayer(drawOverlay);
			plotDraw = null;
			plotEdit = null;
			drawOverlay = null;
		}
	});
});

$("#polt_drawtype img").click(function(){
	var type = $(this).attr("type");
	if(type == "clear"){
		plotDraw.deactivate();
		drawOverlay.getSource().clear();
	}else{
		plotEdit.deactivate();
		if(type == "text"){
			type = "marker";
		}
		plotDraw.activate(type);
		
		$("#polt_drawtype img").each(function(index, item){
			$(this).removeClass("active");
		})
		$(this).addClass("active")
	}
});

//绘制结束后，添加到FeatureOverlay显示。
function onDrawEnd(event){
    var feature = event.feature;
    var geo = feature.getGeometry();
    //console.log(geo.getCoordinates());
    var geotype = geo.getType();
    var style;
    var param = plotStyle();
    if(geotype === "Polygon"){
    	style = new ol.style.Style({
			fill: new ol.style.Fill({
				color: Utils.hexToRgba(param.fillColor, param.opacity)
			}),
			stroke: new ol.style.Stroke({
				color: param.strokeColor,
				width: param.strokeWidth
			})
		})
    }
    if(geotype === "LineString"){
    	style = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: param.strokeColor,
				width: param.strokeWidth
			})
		})
    }
    if(geotype === "Point"){
    	var type;
    	$("#polt_drawtype img").each(function(index, item){
    		//$(this).removeClass("active");
    		if($(this).hasClass("active")){
    			type = $(this).attr("type");
    			return true;
    		}
    	})
    	if(type == "marker"){
    		style = new ol.style.Style(
					{	image: new ol.style.FontSymbol(
						{	form: "marker", //"hexagone", 
							gradient: false,
							glyph: "",//car[Math.floor(Math.random()*car.length)], 
							fontSize: .6,
							radius: 17, 
							//offsetX: -15,
							rotation: 0,
							rotateWithView: false,
							offsetY: 0,
							color: "",
							fill: new ol.style.Fill(
							{	color: "#0000ff"
							}),
							stroke: new ol.style.Stroke(
							{	color: "#ffffff",
								width: 0
							})
						})
					})
    	}else{
    		if(!param.text){
    			return false;
    		}
    		style = new ol.style.Style({
    			text: new ol.style.Text({
	    				textAlign: "left",
	    				textBaseline: "middle",
	    				text: param.text,
	    				fill: new ol.style.Fill({color: param.textColor}),
	    				font: "bold "+param.textSize+"px Microsoft YaHei UI"
	    			})
    			})
    	}
    	
    }
    if(style){
    	feature.setStyle(style);
    }
    drawOverlay.getSource().addFeature(feature);
    // 开始编辑
    //plotEdit.activate(feature);
}

function plotStyle(){
	var param = {};
	var strokeColor = $("#polt_stroke_colorpicker").val();
	var strokeWidth = $("#polt_stroke_width").val();
	var fillColor = $("#polt_fill_colorpicker").val();
	var opacity = $("#polt_fill_opacity").val();
	var text = $("#polt_text").val();
	var textSize = $("#polt_text_size").val();
	var textColor = $("#polt_text_color").val();
	param = {strokeColor: strokeColor, strokeWidth: strokeWidth, fillColor: fillColor, opacity: opacity, text: text, textSize: textSize, textColor: textColor};
	return param;
}


$("#jczzb-checkbox").change(function(){
	if($(this).is(":checked")){
		Utils.ajax (basePath + "/app/selectAllJcz", {}, function(data){
			data = data.list;
			for(var i=0; i<data.length; i++){
				data[i].type = "jczzb";
				var feature =  new ol.Feature({
            		geometry: new ol.geom.Point([parseFloat(data[i].zbx), parseFloat(data[i].zby)])
    		    });
            	feature.setProperties(data[i]);
            	_bkxxVL.getSource().addFeature(feature);
    			var jcradius =  meter2 * 360/(2 * Math.PI * 6378137) ;
            	var circlegeom = new ol.geom.Circle([parseFloat(data[i].zbx), parseFloat(data[i].zby)], jcradius);
            	var featurecircle = new ol.Feature({
        			geometry: circlegeom
        		});
            	featurecircle.setStyle(new ol.style.Style({
        			fill: new ol.style.Fill({
        				color: 'rgba(255, 255, 255, 0.2)'
        			}),
        			stroke: new ol.style.Stroke({
        				color: "#FF0000", 
        				width: 1
        			})
        		}));
            	_polygonVL.getSource().addFeature(featurecircle);
            	
            	var points = [];
	    		for (var j=0; j < 100; j++)
                {
                    var angle = Math.PI * 2 * j / 100;
                    var x = parseFloat(data[i].zbx) + jcradius * Math.sin(angle);
                    var y = parseFloat(data[i].zby) + jcradius * Math.cos(angle);
                    points.push([x, y]);
                }
	    		points.push(points[0]);
	    		
	    		 Utils.ajax (basePath + "/app/selectZyByCoords", {coords: points.join(",")}, function(data){
	     			for(var key in data){
	     				var list = data[key];
	     				if(key == "spjk"){
	     					for(var ki=0; ki<list.length; ki++){
		     					list[ki].type = key;
		     					var feature =  new ol.Feature({
		     	            		geometry: new ol.geom.Point([parseFloat(list[ki].zbx), parseFloat(list[ki].zby)])
		     	    		    });
		     	            	feature.setProperties(list[ki]);
		     	            	_bkxxVL.getSource().addFeature(feature);
		     				}
	     				}
	     				
	     			}
	     			
	     		});
	    		
	    		turfpolygon.push(turf.polygon([points]));
			}
			
			gpsOnCircle = true;
			var features = _gpsVL.getSource().getFeatures();
			for(var it=0; it<turfpolygon.length; it++){
				var pl = turfpolygon[it];
				for(var k=0; k<features.length; k++){
    				var feature = features[k];
    				var pt = turf.point(feature.getGeometry().getCoordinates());
    				if(turf.booleanPointInPolygon(pt, pl)){
    					_bkxxVL.getSource().addFeature(feature);
    				}
    			}
			}
			
        	
		});
	}else{
		gpsOnCircle = false;
		turfpolygon = [];
		_bkxxVL.getSource().clear();
		_polygonVL.getSource().clear();
	}

})


	


_connectionGps = function(websocketUrl, sockJSUrl) {
	var websocketProtocol = document.location.protocol=='https:' ? 'wss' : 'ws';
    if (!websocketUrl || !sockJSUrl) {
        alert("链接地址不能为空");
    }
    if ('WebSocket' in window) {
    	_gpsWsSocket = new WebSocket(websocketProtocol + "://" + websocketUrl);
    } else if ('MozWebSocket' in window) {
    	_gpsWsSocket = new MozWebSocket(websocketProtocol + "://" + websocketUrl);
    } else {
    	_gpsWsSocket = new SockJS(websocketProtocol + "://" + sockJSUrl);
    }
    _gpsWsSocket.onopen = function (evnt) {
       console.log("链接服务器成功");
    };
    _gpsWsSocket.onmessage = function (evnt) {
        var data = evnt.data;
        data = JSON.parse(data);
        var gpsid = data.gpsId;
        //var orgid = data.gpsInfo.orgid;
    	var feature = _gpsVL.getSource().getFeatureById(gpsid);
    	if(data.onLine == "online"){
    		if(feature){
            	feature.setGeometry(new ol.geom.Point([parseFloat(data.x), parseFloat(data.y)])); 
            }else{
            	feature =  new ol.Feature({
            		geometry: new ol.geom.Point([parseFloat(data.x), parseFloat(data.y)])
    		    });
            	data.type = "gps";
            	data.mc = data.gpsInfo.carno;
            	feature.setId(gpsid);
            	feature.setProperties(data);
            	_gpsVL.getSource().addFeature(feature);
            //	{"accuracy":0,"bodysize":51,"command":"cccc","date":"2017-3-29 11:3:42","direct":90,"gpsId":"51343481","gpsInfo":{"gpsid":"51343481","carno":"袁雪峰","callno":"266287","policetypeid":9,"orgid":"320623980000"},"head":"aaaa","height":0,"msgType":0,"speed":0,"state":0,"version":"0022","x":121.29353333333331,"y":32.27161666666667}
            }
    		// gpsOnCircle = false, turfpolygon;
    		if(gpsOnCircle && turfpolygon.length > 0){
    			var pt = turf.point([parseFloat(data.x), parseFloat(data.y)]);
    			var ifaround = false;
    			var ff = _bkxxVL.getSource().getFeatureById(gpsid);
    			for(var it=0; it<turfpolygon.length; it++){
    				var tfp = turfpolygon[it];
    				if(turf.booleanPointInPolygon(pt, tfp)){
        				if(ff){
        	            	ff.setGeometry(new ol.geom.Point([parseFloat(data.x), parseFloat(data.y)])); 
        				}else{
        					_bkxxVL.getSource().addFeature(feature);
        				}
        				ifaround = ifaround||true;
        			}
    			}
    			if(!ifaround && ff){
    				_bkxxVL.getSource().removeFeature(ff);
    			}
    		}
    	}else{
    		if(feature){
    			_gpsVL.getSource().removeFeature(feature);
    		}
    		
    		var ff = _bkxxVL.getSource().getFeatureById(gpsid);
			if(ff){
				_bkxxVL.getSource().removeFeature(ff);
			}
    	}
        
        
        
    };
    _gpsWsSocket.onerror = function (evnt) {
    	console.log("出现了一个错误");
    };
    _gpsWsSocket.onclose = function (evnt) {
    	console.log("链接服务器断开");
    }
}

_connectionSys = function(websocketUrl, sockJSUrl) {
	var websocketProtocol = document.location.protocol=='https:' ? 'wss' : 'ws';
    if (!websocketUrl || !sockJSUrl) {
        alert("链接地址不能为空");
    }
   
    if ('WebSocket' in window) {
    	_sysWsSocket = new WebSocket(websocketProtocol + "://" + websocketUrl);
    } else if ('MozWebSocket' in window) {
    	_sysWsSocket = new MozWebSocket(websocketProtocol + "://" + websocketUrl);
    } else {
    	_sysWsSocket = new SockJS(websocketProtocol + "://" + sockJSUrl);
    }
    _sysWsSocket.onopen = function (evnt) {
       console.log("链接服务器成功");
    };
    _sysWsSocket.onmessage = function (evnt) {
        var data = evnt.data;
       // console.log(data);
        data = JSON.parse(data);
        table.reload('lay-bkxx-table', {
        	page: false,
	        data: data
	      });
        _yjclVL.getSource().clear();
        for(var i=0; i<data.length; i++){
        	data[i].type = "yjcl";
			var feature =  new ol.Feature({
        		geometry: new ol.geom.Point([parseFloat(data[i].zbx), parseFloat(data[i].zby)])
		    });
			data[i].mc = data[i].hphm;
        	feature.setProperties(data[i]);
        	_yjclVL.getSource().addFeature(feature);
        }
        
    };
    _sysWsSocket.onerror = function (evnt) {
    	console.log("出现了一个错误");
    };
    _sysWsSocket.onclose = function (evnt) {
    	console.log("链接服务器断开");
    }
}


function initYjbbTable(){
	table.render({
	    elem: '#bkxx-table'
	   // ,url: basePath + '/user/selectUsers'
	    ,height: "230"
	    ,id: "lay-bkxx-table"
	    //,where: {orgcode: $("#user_hiddden_orgcode").val()} //如果无需传递额外参数，可不加该参数
	    ,method: 'post' //如果无需自定义HTTP类型，可不加该参数
	    ,page: false
	    ,limit: 1000
	    ,cols: [[
	      {field:'hphm', title: '车牌号码', templet: '#bkxx_cphm_href'}
	      ,{field:'bkkssj', title: '布控时间', event: 'view-center', style: 'cursor:pointer'}
	      ,{field:'bkyy',  title: '布控类型', event: 'view-center', style: 'cursor:pointer'}
	      ,{field:'kkmc',  title: '经过卡口', event: 'view-center', style: 'cursor:pointer'}
	      ,{field:'jgsj',  title: '经过时间', event: 'view-center', style: 'cursor:pointer'}
	      ,{field:'xsfxmc',  title: '行驶方向', event: 'view-center', style: 'cursor:pointer'}
	      ,{fixed: 'right',  title: '操作', align:'center', toolbar: '#bkxx_list_bar', fixed: 'right'}
	    ]]
	  });
	  table.on('tool(bkxx-table)', function(obj){
		  console.log("herer");
		  tableClickEvents(obj);
	  });
		    
}


function tableClickEvents(obj){
	var data = obj.data;
	console.log(obj);
	switch(obj.event){
		case "view-zp":
			openZpImage(data);
			break;
		case "view-ljq":
			viewBkLjq(data);
			break;
		case "view-center":
			centerOnMap(data);
			break;
		case "view-gj":
			//selectBkclLsgj
			viewglLsgj(data);
			break;
		case "view-clxx":
			viewClxx(data);
	}

}

function openZpImage(data){
	layer.photos({
		photos: {
			title: data.hphm,
			start: 0,
			data: [
    			       {
    			    	   src: data.zp
    			       }
			       ],
	       anim: 0,
    		shade: .1
		}
	});
}

function viewBkLjq(data){
	if(!(data.zbx && data.zby)){
		layer.msg("该卡位没有坐标信息");
		return;
	}
	_bkxxVL.getSource().clear();
	_polygonVL.getSource().clear();
	var cx = parseFloat(data.zbx);
	var cy = parseFloat(data.zby);
	
	var style = new ol.style.Style({
			image: new ol.style.Icon({
				src: 'static/images/ztzy/zakk.png',
			})
		});
	var feature =  new ol.Feature({
		geometry: new ol.geom.Point([parseFloat(data.zbx), parseFloat(data.zby)])
    });
	data.type = "cl-kk";
	feature.setProperties(data);
	feature.setStyle(style);
	_bkxxVL.getSource().addFeature(feature);
	MapUtils.panTo(_MapApp, [parseFloat(data.zbx), parseFloat(data.zby)]);
	
	var radius = meter1 * 360/(2 * Math.PI * 6378137) ;
	var coords = [];
	
	switch(data.xsfx){
		case "1": 
			for (var i=0; i < 100; i++)
            {
                var angle = Math.PI * 2 * i / 100;
                var x=cx + radius * Math.sin(angle);
                var y=cy + radius * Math.cos(angle);
               
                 //南向北
                if(y >= cy){
                    coords.push([x, y]);
                }
            }
			break;
		case "2": 
			for (var i=0; i < 100; i++)
            {
                var angle = Math.PI * 2 * i / 100;
                var x=cx + radius * Math.sin(angle);
                var y=cy + radius * Math.cos(angle);
                 //北向南
                if(y <= cy){
                    coords.push([x, y]);
                }
            }
			break;
		case "3": 
			for (var i=0; i < 100; i++)
            {
                var angle = Math.PI * 2 * i / 100;
                var x=cx + radius * Math.sin(angle);
                var y=cy + radius * Math.cos(angle);
                 //东向西
                if(x <= cx){
                    coords.push([x, y]);
                }
            }
			break;
		case "4": 
			for (var i=0; i < 100; i++)
            {
                var angle = Math.PI * 2 * i / 100;
                var x=cx + radius * Math.sin(angle);
                var y=cy + radius * Math.cos(angle);
                 //西向东
                if(x >= cx){
                    coords.push([x, y]);
                }
            }
			break;
	}
	coords.push(coords[0]);
	
	 Utils.ajax (basePath + "/app/selectJczZyByCoords", {coords: coords.join(",")}, function(data){
			var list = data.list;
			var style = new ol.style.Style({
  				image: new ol.style.Icon({
  					src: 'static/images/ztzy/zagt.png',
  				})
  			});
			
			
			
			var html = [];
			html.push("<table style='width:100%' class='layui-table'>");
			for(var i=0; i<list.length; i++){
				list[i].type = "jcz";
				var feature =  new ol.Feature({
            		geometry: new ol.geom.Point([parseFloat(list[i].zbx), parseFloat(list[i].zby)])
    		    });
            	feature.setProperties(list[i]);
            	feature.setStyle(style);
            	_bkxxVL.getSource().addFeature(feature);
            	html.push("<tr>");
            	html.push("<td>"+list[i].mc+"</td>");
            	html.push("<td>caozuo</td>");
            	html.push("</tr>");
            	
            	var jcradius =  meter2 * 360/(2 * Math.PI * 6378137) ;
            	var circlegeom = new ol.geom.Circle([parseFloat(list[i].zbx), parseFloat(list[i].zby)], jcradius);
            	var featurecircle = new ol.Feature({
	    			geometry: circlegeom
	    		});
            	featurecircle.setStyle(new ol.style.Style({
	    			fill: new ol.style.Fill({
	    				color: 'rgba(255, 255, 255, 0.2)'
	    			}),
	    			stroke: new ol.style.Stroke({
	    				color: "#FF0000", 
	    				width: 1
	    			})
	    		}));
            	_polygonVL.getSource().addFeature(featurecircle);
	    		var points = [];
	    		for (var j=0; j < 100; j++)
                {
                    var angle = Math.PI * 2 * j / 100;
                    var x = parseFloat(list[i].zbx) + jcradius * Math.sin(angle);
                    var y = parseFloat(list[i].zby) + jcradius * Math.cos(angle);
                    points.push([x, y]);
                }
	    		points.push(points[0]);
	    		turfpolygon.push(turf.polygon([points]));
			}
			gpsOnCircle = true;
			var features = _gpsVL.getSource().getFeatures();
			for(var it=0; it<turfpolygon.length; it++){
				var pl = turfpolygon[it];
				for(var k=0; k<features.length; k++){
    				var feature = features[k];
    				var pt = turf.point(feature.getGeometry().getCoordinates());
    				if(turf.booleanPointInPolygon(pt, pl)){
    					_bkxxVL.getSource().addFeature(feature);
    				}
    			}
			}
			
			
			html.push("</table>");
			var height = $(window).height();
			var width = $(window).width();
			if(layer_jcz){
				layer.close(layer_jcz);
			}
			layer_jcz = layer.open({
				type: 1,
				area: ['400px', '300px'],
				offset: [  height - 300 - 260 + "px", width - 420 + "px"],
				shade: 0,
				content: html.join(""),
				title: "拦截圈",
				success: function(){
					
				}
			});
			
		});
	 	var geom = new ol.geom.Polygon([coords]);
		var polygonStyle = new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0)'
			}),
			stroke: new ol.style.Stroke({
				color: "#319FD3", 
				width: 1
			})
		});
		var feature = new ol.Feature({
			geometry: geom
		});
		feature.setStyle(polygonStyle);
		_polygonVL.getSource().addFeature(feature);
}

function centerOnMap(data){
	if(!(data.zbx && data.zby)){
		layer.msg("该卡位没有坐标信息");
		return;
	}
	MapUtils.panTo(_MapApp, [parseFloat(data.zbx), parseFloat(data.zby)]);
}


function viewglLsgj(obj){
	 Utils.ajax (basePath + "/app/selectBkclLsgj", obj, function(data){
		var data = data.list;
		_clgjVL.getSource().clear();
		var html = []
		html.push("<div style='display:none'><div class='checkbox'> <label>  <input id='clgj_showline'  type='checkbox' class='colored-blue' checked> <span class='text'>显示连线</span></label> </div></div>");
		html.push("<table class='layui-table'><tr><th style='min-height: 14px;line-height: 14px; font-size: 18px;'>卡口名称</th><th  style='min-height: 14px;line-height: 14px; font-size: 18px;width:120px'>经过时间</th></tr>");
		var points = [];
		for(var i=0; i<data.length; i++){
			html.push("<tr zbx='"+data[i].zbx+"'  zby='"+data[i].zby+"' jgsj='"+data[i].jgsj+"' style='cursor:pointer'>");
        	html.push("<td style='min-height: 14px;line-height: 14px; font-size: 18px;'>"+data[i].kkmc+"</td>");
        	html.push("<td style='min-height: 14px;line-height: 14px; font-size: 18px;'>"+data[i].jgsj.split(" ")[1]+"</td>");
        	html.push("</tr>");
			if(data[i].zbx && data[i].zby){
				points.push([parseFloat(data[i].zbx), parseFloat(data[i].zby)]);
			}
		}
		html.push("</table>");
		var geo =  new ol.geom.LineString(points);
		
		clgjFeatureLine = new ol.Feature({
    		geometry: geo
    	});
		var styles = [];
		var dash = [ 0,  1,  2,  3,  4,  5,  6 ];
		styles.push(new ol.style.Style({
			 stroke: new ol.style.Stroke({
				 width: 2,
				 color: '#ff0000',
				 lineDash: dash
			 })
		 }));
		geo.forEachSegment(function(start, end){
			var dx = end[0] - start[0];
			var dy = end[1] - start[1];
			var rotation = Math.atan2(dy, dx);
			styles.push(new ol.style.Style({
				geometry: new ol.geom.Point(end), 
				image: new ol.style.Icon({
					src: "static/images/arrow.png",
					anchor: [1, 0.5],
					rotateWithView: true,
					rotation: -rotation
				})
			}));
		});
		clgjFeatureLine.setStyle(styles);
    	_clgjVL.getSource().addFeature(clgjFeatureLine);

    	for(var i=0; i<data.length; i++){
			//_clgjVL
			if(data[i].zbx && data[i].zby){
				var feature =  new ol.Feature({
	        		geometry: new ol.geom.Point([parseFloat(data[i].zbx), parseFloat(data[i].zby)])
			    });
				data[i].mc = data[i].kkmc;
				data[i].type = "clgj";

	        	feature.setProperties(data[i]);
	        	_clgjVL.getSource().addFeature(feature);
			}
		}

		var height = $(window).height();
		var width = $(window).width();
		if(layer_clgj){
			layer.close(layer_clgj);
			layer_clgj = null;
		}
		layer_clgj = layer.open({
			type: 1,
			title: "卡口车辆轨迹：" + obj.hphm,
			area: ['400px', '350px'],
			offset: [  height - 350 - 200 + "px", width - 400 + "px"],
			shade: 0,
			content: "<div id='clgj_list_div' style='font-size:12px'>" + html.join("") + "</div>",
			success: function(){
				$("#clgj_list_div input").change(function(){
					if($(this).is(":checked")){
						_clgjVL.getSource().addFeature(clgjFeatureLine);
					}else{
						_clgjVL.getSource().removeFeature(clgjFeatureLine);
					}
				})
				
				$("#clgj_list_div table tr").click(function(){
					console.log($(this).attr("zbx"));
					var zbx = $(this).attr("zbx");
					var zby = $(this).attr("zby");
					var jgsj = $(this).attr("jgsj");
					if(zbx && zby){
						MapUtils.panTo(_MapApp, [parseFloat(zbx), parseFloat(zby)]);
						_popup.show([parseFloat(zbx), parseFloat(zby)],  jgsj);
					}
				});
			},
			cancel: function(){
				layer_clgj = null;
				_clgjVL.getSource().clear();
				clgjFeatureLine = null
			}
		});
	 });
}

function viewClxx(obj){
	Utils.ajax (basePath + "/app/selectClxx", obj, function(data){
		var list = data.list;
		var html = [];
		for(var i=0; i<list.length; i++){
			var item = list[i];
            html.push("<table class='layui-table'>");
            html.push("<tr><td>车辆品牌</td><td>"+item.clpp1+"</td></tr>");
            html.push("<tr><td>所有人/单位</td><td>"+item.syr+"</td></tr>");
            html.push("<tr><td>证件号码</td><td>"+item.sfzmhm+"</td></tr>");
            html.push("<tr><td>联系电话</td><td>"+item.sjhm+"</td></tr>");
            html.push("<tr><td>住所地址</td><td>"+item.zsxxdz+"</td></tr>");
            html.push("</table>");
            html.push("<hr style='height:3px;color: #555555'>");
		}
		var height = $(window).height();
		var width = $(window).width();
		layer.open({
			type: 1,
			title: "车辆信息：" + obj.hphm,
			area: ['400px', '280px'],
			offset: [  height - 280 - 200 + "px", width - 420 + "px"],
			shade: 0,
			content: html.join(""),
			success: function(){
				
			},
			cancel: function(){
			}
		});
	});
}



