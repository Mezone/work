<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/12/12 0012
  Time: 下午 4:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>


    .orders-container .orders-header {
        position: relative;
        height: 43px;
        padding: 14px 10px;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fbfbfb
    }

    .orders-container .orders-header h6 {
        margin: 0
    }

    .orders-container .orders-list {
        list-style: none;
        padding: 0;
        margin: 0
    }

    .orders-container .orders-list .order-item {
        position: relative;
        padding: 7px 10px;
        vertical-align: top;
        border-bottom: 1px solid #e5e5e5
    }

    .orders-container .orders-list .order-item:before {
        display: none;
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: -4px;
        width: 4px;
        max-width: 4px;
        overflow: hidden;
        background-color: #2dc3e8
    }

    .orders-container .orders-list .order-item:hover {
        background-color: #fbfbfb
    }

    .orders-container .orders-list .order-item:hover:before {
        display: block
    }

    .orders-container .orders-list .order-item.top:hover:before {
        background-color: #fb6e52
    }

    .orders-container .orders-list .order-item.top .item-more {
        color: #fb6e52
    }

    .orders-container .orders-list .order-item .item-left {
        padding-right: 0
    }

    .orders-container .orders-list .order-item .item-left .item-booker {
        margin: 6px 0;
        color: #666
    }

    .orders-container .orders-list .order-item .item-left .item-time {
        font-size: 11px;
        margin-bottom: 2px;
        color: #999
    }

    .orders-container .orders-list .order-item .item-right {
        padding-left: 0;
        text-align: center
    }

    .orders-container .orders-list .order-item .item-right .item-price {
        font-size: 13px;
        margin: 17px auto;
        color: #666
    }

    .orders-container .orders-list .order-item .item-more {
        position: absolute;
        right: 4px;
        -lh-property: 0;
        top: -webkit-calc(50% - 13px);
        top: -moz-calc(50% - 13px);
        top: calc(50% - 13px);
        width: 25px;
        height: 25px;
        font-size: 14px;
        text-align: center;
        border-radius: 50%;
        background-color: #fff;
        border: 3px solid #fff;
        vertical-align: middle;
        color: #2dc3e8;

    }

    .orders-container .orders-list .order-item .item-more i {
        font-size: 17px;
        display: inline-block;
        font-family: 'FontAwesome';
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        -webkit-font-smoothing: antialiased
    }

    .orders-container .orders-list .order-item .item-more i:before {
        content: ""
    }

    .orders-container .orders-footer {
        position: relative;
        background-color: #fff;
        height: 34px;
        padding: 7px;
        text-align: center;
        background-color: #fbfbfb
    }

    .orders-container .orders-footer a {
        margin: 0 auto;
        font-size: 11px;
        color: #999;
        font-weight: 500
    }


</style>
<div class="orders-container">
    <ul class="orders-list">
        <li class="order-item">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item-left">
                    <div class="item-booker">警力部署1</div>
                    <div class="item-time">
                        <i class="fa fa-calendar"></i>
                        <span>10 minutes ago</span>
                    </div>
                </div>

            </div>

        </li>
        <li class="order-item top">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item-left">
                    <div class="item-booker">Steve Lewis</div>
                    <div class="item-time">
                        <i class="fa fa-calendar"></i>
                        <span>2 hours ago</span>
                    </div>
                </div>

            </div>

        </li>
        <li class="order-item">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item-left">
                    <div class="item-booker">John Ford</div>
                    <div class="item-time">
                        <i class="fa fa-calendar"></i>
                        <span>Today 8th July</span>
                    </div>
                </div>

            </div>

        </li>
        <li class="order-item">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item-left">
                    <div class="item-booker">Kim Basinger</div>
                    <div class="item-time">
                        <i class="fa fa-calendar"></i>
                        <span>Yesterday 7th July</span>
                    </div>
                </div>

            </div>

        </li>
        <li class="order-item">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 item-left">
                    <div class="item-booker">Steve Lewis</div>
                    <div class="item-time">
                        <i class="fa fa-calendar"></i>
                        <span>5th July</span>
                    </div>
                </div>

            </div>

        </li>
    </ul>
</div>

<script>

    var _zbjlVL = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    _MapApp.addLayer(_zbjlVL);

    var lineZbspData = [
        {
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
        },

            {
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
            },
            {
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
            }
    ];

    var style = new ol.style.Style({
        image: new ol.style.Icon({
            src: '../static/images/qwgl/police.png',
            anchor: [0.5, 1]
        })
    });
    function loadQwglZbjl(id){
        for(var i=0; i<lineZbspData.length; i++){
            var obj = lineZbspData[i];
            console.log(obj);
            if(id == obj.id){
                var line = obj.line.split(",");
                for(var k=0; k<line.length-1; k=k+2){

                    var pf = new ol.Feature({
                        geometry: new ol.geom.Point([parseFloat(line[k]), parseFloat(line[k+1])])
                    });

                    obj.type = "qwgl-zbjl";
                    pf.setProperties(obj);

                    pf.setStyle(style);
                    _zbjlVL.getSource().addFeature(pf);

                }
                break;
            }
        }
    }

    function closeQwglZbjl(){
        _MapApp.removeLayer(_zbjlVL);

    }



</script>