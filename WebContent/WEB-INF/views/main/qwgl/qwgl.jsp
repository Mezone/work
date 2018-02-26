<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/12/12 0012
  Time: 下午 4:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>
    .task-container .tasks-list{list-style:none;padding:0}.task-container .tasks-list .task-item{position:relative;height:150px;border-bottom:1px solid #e5e5e5}.task-container .tasks-list .task-item:last-child{border-bottom:0}.task-container .tasks-list .task-item:hover{background-color:#f5f5f5}.task-container .tasks-list .task-item .task-check{position:absolute;top:20px;left:15px;margin-right:5px}.task-container .tasks-list .task-item .task-state{position:absolute;top:19px;left:45px}.task-container .tasks-list .task-item .task-state .label{padding:6px;text-transform:uppercase;letter-spacing:1px}.task-container .tasks-list .task-item .task-time{position:absolute;top:20px;right:20px;font-size:11px;color:#999}.task-container .tasks-list .task-item .task-body{position:absolute;top:60px;left:45px;padding-right:25px;height:40px;overflow:hidden;line-height:22px}.task-container .tasks-list .task-item .task-creator{position:absolute;top:115px;left:45px}.task-container .tasks-list .task-item .task-creator a{font-size:13px;color:#11a9cc}.task-container .tasks-list .task-item .task-creator a:hover{text-decoration:none}.task-container .tasks-list .task-item .task-assignedto{position:absolute;top:115px;right:20px;font-size:13px;color:#999}
    .label-palegreen, .badge-palegreen {
        background-color: #a0d468;
        background-image: none!important;
    }

    .label-yellow, .badge-yellow {
        background-color: #ffce55;
        background-image: none!important;
    }

    .label-orange, .badge-orange {
        background-color: #fb6e52;
        background-image: none!important;
    }
    .item-booker a {
        color: #11a9cc;
    }

</style>
<div class="task-container">
    <ul class="tasks-list">
        <li class="task-item">
            <div class="task-check">
                <label>
                    <input type="checkbox"  index="0">
                    <span class="text"></span>
                </label>
            </div>
            <div class="task-state">
                <span class="label label-yellow">
                    8月31日任务
                </span>
            </div>
            <div class="task-body">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left">
                        <div class="item-booker"><a href="javascript:void(0)" style="cursor: pointer" index="0" cindex="0">路线1</a></div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right">
                        <div class="item-price">
                            <span class="price">08:00</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left">
                        <div class="item-booker"><a href="javascript:void(0)" style="cursor: pointer"  index="0" cindex="1">活动2</a></div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right">
                        <div class="item-price">
                            <span class="price">09:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li class="task-item">
            <div class="task-check">
                <label>
                    <input type="checkbox"   index="1">
                    <span class="text"></span>
                </label>
            </div>
            <div class="task-state">
                <span class="label label-orange">
                     5月15日任务
                </span>
            </div>
            <div class="task-body">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left">
                        <div class="item-booker"><a href="javascript:void(0)" style="cursor: pointer" index="1" cindex="0">路线1</a></div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right">
                        <div class="item-price">
                            <span class="price">08:00</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left">
                        <div class="item-booker"><a href="javascript:void(0)" style="cursor: pointer" index="1" cindex="1">活动2</a></div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right">
                        <div class="item-price">
                            <span class="price">08:00</span>
                        </div>
                    </div>
                </div>

            </div>
        </li>
        <li class="task-item">
            <div class="task-check">
                <label>
                    <input type="checkbox"  index="2">
                    <span class="text"></span>
                </label>
            </div>
            <div class="task-state">
                <span class="label label-palegreen">
                   3月20号任务
                </span>
            </div>
            <div class="task-body">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left">
                        <div class="item-booker"><a  href="javascript:void(0)" style="cursor: pointer" index="2" cindex="0">路线1</a></div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right">
                        <div class="item-price">
                            <span class="price">08:00</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 item-left">
                        <div class="item-booker"><a  href="javascript:void(0)" style="cursor: pointer" index="2" cindex="1">活动2</a></div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 item-right">
                        <div class="item-price">
                            <span class="price">08:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>

<script>

    var _gjVL = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    _MapApp.addLayer(_gjVL);

    var lineData = [
        [{
            id: "1",
            mc: "路线1",
            zhz: "刘能",
            lxdh: "88888888",
            dthh: "888",
            abjl: "450",
            zrdw: "特警支队,交警支队",
            line: "13350319.376975242,3745357.0582024227,13353109.32850765,3743790.0991225764,13355669.968955204,3743102.16586801,13358498.139001755,3741611.643816449,13360753.031336168,3739968.247708318"
        },
        {
            id: "2",
            mc: "路线2",
            zhz: "刘能",
            lxdh: "88888888",
            dthh: "888",
            abjl: "450",
            zrdw: "特警支队,交警支队",
            line: "13349564.561320927,3740359.9874782795,13348551.770696148,3737608.254460013,13347653.635613797,3736576.354578163,13346688.618131695,3734617.655728355,13346325.542247344,3732305.435622729"
        }],

            [{
                id: "3",
            mc: "路线1",
            zhz: "刘能",
            lxdh: "88888888",
            dthh: "888",
            abjl: "450",
            zrdw: "特警支队,交警支队",
            line: "13350319.376975242,3745357.0582024227,13353109.32850765,3743790.0991225764,13355669.968955204,3743102.16586801,13358498.139001755,3741611.643816449,13360753.031336168,3739968.247708318"
        },
            {
                mc: "路线2",
                id: "4",
                zhz: "刘能",
                lxdh: "88888888",
                dthh: "888",
                abjl: "450",
                zrdw: "特警支队,交警支队",
                line: "13349564.561320927,3740359.9874782795,13348551.770696148,3737608.254460013,13347653.635613797,3736576.354578163,13346688.618131695,3734617.655728355,13346325.542247344,3732305.435622729"
            }],
            [{
                id: "5",
                mc: "路线1",
                zhz: "刘能",
                lxdh: "88888888",
                dthh: "888",
                abjl: "450",
                zrdw: "特警支队,交警支队",
                line: "13350319.376975242,3745357.0582024227,13353109.32850765,3743790.0991225764,13355669.968955204,3743102.16586801,13358498.139001755,3741611.643816449,13360753.031336168,3739968.247708318"
        },
            {
                id: "6",
                mc: "路线2",
                zhz: "刘能",
                lxdh: "88888888",
                dthh: "888",
                abjl: "450",
                zrdw: "特警支队,交警支队",
                line: "13349564.561320927,3740359.9874782795,13348551.770696148,3737608.254460013,13347653.635613797,3736576.354578163,13346688.618131695,3734617.655728355,13346325.542247344,3732305.435622729"
            }]
    ];


    $(".task-check input").on("change", function(){
        var flag = $(this).is(":checked");
        console.log(flag);
        var index =  $(this).attr("index");
        if(flag){
            var data = lineData[index];
            for(var i=0; i<data.length; i++){
                var obj = data[i];
                //console.log(obj);
                var linestr = [];
                var line = obj.line.split(",");
                for(var k=0; k<line.length-1; k=k+2){
                    linestr.push([parseFloat(line[k]), parseFloat(line[k+1])]);
                }
                var fl = new ol.Feature({
                    geometry: new ol.geom.LineString(linestr)
                });
                fl.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width: 4,
                        color: '#0001ff'
                    })
                }));
                obj.type="qwgl-line";
                fl.setProperties(obj);
                fl.setId("line-" + index + "-" + i);
                _gjVL.getSource().addFeature(fl);
            }
        }else{
            var features = _gjVL.getSource().getFeatures();
            for(var i=0; i<features.length; i++){
                var feature = features[i];
                var id = feature.getId();
                if(id.indexOf("line-" + index + "-") > -1){
                    _gjVL.getSource().removeFeature(feature);
                }
            }
        }
    })


    function   closeQwgl(){
        _MapApp.removeLayer(_gjVL);
    }

</script>