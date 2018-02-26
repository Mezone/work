/**
 * GPS历史轨迹查询
 * Created by Administrator on 2017/1/18.
 */
module.gpslsgj = (function(){

    var _f_ = {}, _MapApp, _gjVL, _gjStartStyle, _gjEndStyle, _dataCache;

    _MapApp = MapUtils.initMap(document.getElementById("gpslsgj-map"));

    _gjVL = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0000ff',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 4,
                fill: new ol.style.Fill({
                    color: '#ff0000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffffff',
                    width: 1
                }),
                anchor: [0.5, 1]
            })
        })
    });
    _MapApp.addLayer(_gjVL);

    _gjStartStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: basePath + '/static/images/start.png',
            anchor: [0.5, 1]
        })
    });

    _gjEndStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: basePath + '/static/images/end.png',
            anchor: [0.5, 1]
        })
    });


    _f_.onSearchHandler = function(){
        var modType=$('#gpslsgj-modType').val();
        var startTime = $('#gpslsgj-startTime').val();
        var stopTime = $('#gpslsgj-endTime').val();
        var modLicense = $('#gpslsgj-modLicense').val();
        if(modLicense !=''){
            var licenStr1=modLicense.substring(0,1);
            var licenStr2=modLicense.substring(1,modLicense.length);
            licenStr1+=';';
            modLicense=licenStr1+licenStr2;
        }
        if(startTime == '' || stopTime == '' || modLicense == ''){
            bootbox.alert({message: '查询参数有误！开始时间、结束时间和车牌号不可以为空。'});
            return;
        }
        Utils.ajax(basePath + '/main/gps/gpslsgj/findGpsLsgjMesByCph', {
            modType:modType,
            startTime: Utils.formatDT2DT(startTime),
            endTime: Utils.formatDT2DT(stopTime),
            modLicense: modLicense
        },function(data){
            _dataCache = data.result;
            if(_dataCache && _dataCache.length > 0){
                var pp = [];
                $.each(_dataCache, function(i, item){
                    var point = [parseFloat(item.X), parseFloat(item.Y)];
                    pp.push(point);
                    var pf = new ol.Feature(new ol.geom.Point(point));
                    pf.set('index', i);
                    if(i == 0){
                        pf.setStyle(_gjStartStyle);
                    }else if(i == _dataCache.length - 1){
                        pf.setStyle(_gjEndStyle);
                    }
                    _gjVL.getSource().addFeature(pf);
                    _dataCache.push(pf);
                });
                if(pp.length > 0){
                    //轨迹线
                    var lf = new ol.Feature(new ol.geom.LineString(pp));
                    _gjVL.getSource().addFeature(lf);
                    _MapApp.getView().fit(lf.getGeometry(), _MapApp.getSize());
                }
            }else{
                Utils.notifyWarning("没有查询到结果，请修改查询条件");
            }
        }, true);

    };

/*    $('#jkgj-mac').on('keyup', function(event){
        if(event.keyCode == 13){
            _f_.onSearchHandler();
        }
    });*/

    $('#gpslsgj-search-btn').on('click', function(){
        _f_.onSearchHandler();
    });

    $('#gpslsgj-startTime, #gpslsgj-endTime').on('click', function(){
        laydate({istime: true, elem: this, format: 'YYYY/MM/DD hh:mm:ss'});
    });

    return {

    }

})();