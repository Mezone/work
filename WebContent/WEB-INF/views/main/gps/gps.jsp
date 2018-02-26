<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/12/12 0012
  Time: 下午 4:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div style="height: 250px;max-height: 250px;overflow-y: auto;overflow-x: hidden">
    <ul id="kjcx_tree" class="ztree"></ul>
</div>
<div class="form-group" style="margin: 4px 8px 4px 0;">
    <div class="input-group" >
        <input type="text" value=""   id="spjk-search-key"  class="form-control" placeholder="请输入关键字" style="width:178px"/>
        <span class="input-group-btn">
            <button class="btn btn-blue" id="kjcx-search-btn"><i class="fa fa-search"></i> 搜索 </button>
        </span>
    </div>
</div>
<div class="form-group"  style="margin-bottom:5px;text-align:center">
    <div id="spjk-search-kjcx-buttonbar" class="btn-group">
        <button class="btn btn-primary" type="Circle"> 圆形</button>
        <button class="btn btn-warning" type="Box">矩形</button>
        <button class="btn btn-danger" type="Polygon">多边形</button>
    </div>
</div>



<SCRIPT type="text/javascript">
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        check: {
            enable: true
        },
        callback: {
            onClick: onClickKjcxTree
        }
    };

    /**
     * 大点查询绘制图层
     */
    var _numberPointVL = new ol.layer.Vector({
        source: new ol.source.Vector()
    });

    _MapApp.addLayer(_numberPointVL);

    /**
     * 空间查询绘制图层
     */
   var  _drawVL = new ol.layer.Vector({
        source: new ol.source.Vector({wrapX: false})
    });
    _MapApp.addLayer(_drawVL);


    var zNodes =[
        { id:1, pId:0, name:"常州市公安局", open:true},
        { id:11, pId:1, name:"新北区"},
        { id:111, pId:11, name:"河海派出所"},
        { id:112, pId:11, name:"三井派出所"},
        { id:113, pId:11, name:"青龙派出所"},
        { id:12, pId:1, name:"天宁区"},
        { id:121, pId:12, name:"河海派出所"},
        { id:122, pId:12, name:"三井派出所"},
        { id:123, pId:12, name:"青龙派出所"},
        { id:13, pId:1, name:"钟楼区"},
        { id:131, pId:13, name:"河海派出所"},
        { id:132, pId:13, name:"三井派出所"},
        { id:133, pId:13, name:"青龙派出所"}
    ];

    $(document).ready(function(){
        $.fn.zTree.init($("#kjcx_tree"), setting, zNodes);
    });


    var spjkdata = [
        {mc: "测试视频1", x: 13353488.11560868, y:3737790.901802895},
        {mc: "测试视频2", x: 13351488.11560868, y:3737790.901802895},
        {mc: "测试视频3", x: 13353488.11560868, y:3737890.901802895},
        {mc: "测试视频4", x: 13353288.11560868, y:3737890.901802895},
        {mc: "测试视频5", x: 13353288.11560868, y:3737490.901802895},
        {mc: "测试视频6", x: 13353458.11560868, y:3737390.901802895},
        {mc: "测试视频7", x: 13353388.11560868, y:3737690.901802895},
        {mc: "测试视频8", x: 13353688.11560868, y:3737290.901802895},
        {mc: "测试视频9", x: 13353888.11560868, y:3737490.901802895},
        {mc: "测试视频10", x: 13353428.11560868, y:3737390.901802895},
        {mc: "测试视频11", x: 13353418.11560868, y:3737690.901802895},
        {mc: "测试视频112", x: 13353288.11560868, y:3737890.901802895}
    ];


    function onClickKjcxTree(event, treeId, treeNode, clickFlag){
        _numberPointVL.getSource().clear();
        var style = new ol.style.Style({
            image: new ol.style.Icon({
                src: '../static/images/jw/p.png',
                anchor: [0.5, 1]
            })
        });
        for(var i=0; i<spjkdata.length; i++){
            var obj = spjkdata[i];
            if( obj.x && obj.y){
                var pf = new ol.Feature({
                    geometry: new ol.geom.Point([obj.x, obj.y])
                });

                obj.type = "spjk";
                pf.setProperties(obj);

                pf.setStyle(style);
                _numberPointVL.getSource().addFeature(pf);
            }

        }

    }



    var _drawAction;
   _kjcxHandler = function(){

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
            var coords = [];
            if(geotype == "Circle"){
                var center  = geo.getCenter();
                var radius = geo.getRadius();
                for (var i=0; i < 100; i++)
                {
                    var angle = Math.PI * 2 * i / 100;
                    var x=center[0] + radius * Math.sin(angle);
                    var y=center[1] + radius * Math.cos(angle);
                    coords.push(x + " " + y)
                }
                coords.push(coords[0])
            }else if(geotype == "Polygon"){
                var arr = geo.getCoordinates();
                arr = arr[0]
                for(var i=0; i<arr.length; i++){
                    //coords += arr[i][0] + " " + arr[i][1]
                    coords.push(arr[i][0] + " " + arr[i][1])
                }
            }
            console.log(coords)


        });
        //
    };

    $("#spjk-search-kjcx-buttonbar > button").on('click',_kjcxHandler );

    function closeSpjk(){
        _MapApp.removeLayer(_numberPointVL);
        _MapApp.removeLayer(_drawVL);
        if(_drawAction){
            _MapApp.removeInteraction(_drawAction);
        }
    }

    $("#kjcx-search-btn").click(function(){
        _numberPointVL.getSource().clear();
        var style = new ol.style.Style({
            image: new ol.style.Icon({
                src: '../static/images/jw/p.png',
                anchor: [0.5, 1]
            })
        });
        for(var i=0; i<spjkdata.length; i++){
            var obj = spjkdata[i];
            if( obj.x && obj.y){
                var pf = new ol.Feature({
                    geometry: new ol.geom.Point([obj.x, obj.y])
                });

                obj.type = "spjk";
                pf.setProperties(obj);

                pf.setStyle(style);
                _numberPointVL.getSource().addFeature(pf);
            }

        }
    });

</SCRIPT>