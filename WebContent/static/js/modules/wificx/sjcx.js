/**
 * Created by Administrator on 2017/1/11.
 */
module.sjcx = (function(){

    var _f_ = {}, _dataCache;

    _f_.onSearchHandler = function(){
        _f_.findByParam();
    };

    _f_.findByParam = function(){
        $('#sjcx-pagination').hide();
        $('#sjcx-table tbody').html('<tr><td colspan="11"><div style="text-align: center; padding: 20px;">正在查询数据，请稍等...</div></td></tr>');
        Utils.ajax(basePath + '/main/wificx/sjcx/findByMobileNo', {
            mobileNo: $('#sjcx-search-keyword').val()
        }, function(data){
            $('#sjcx-table tbody').html('');
            _dataCache = data.result;
            if(_dataCache.length != 0){
                $.each(_dataCache, function(i, item){
                    var tr = '<tr>' +
                        '<td>' + (parseInt(i)+1) +'</td>' +
                        '<td>' + item['f:Owner'] +'</td>' +
                        '<td><a style="color:blue" href="javascript:;" title="点击查询人员信息" operate="rycx" index="' + i + '">' + item['f:IDCard'] +'</a></td>' +
                        '<td>' + (item['f:IMEI'] === null ? '-' : item['f:IMEI']) +'</td>' +
                        '<td>' + (item['f:IMSI']  === null ? '-' : item['f:IMSI']) +'</td>' +
                        '<td>' + (item['f:ICCID'] === null ? '-' : item['f:ICCID']) +'</td>' +
                        '<td><a style="color:blue" href="javascript:;" title="点击查询mac轨迹" operate="jkgj" index="' + i + '">' + (item['f:WIFI_MAC'] === null ? '-' : item['f:WIFI_MAC']) +'</a></td>' +
                        '<td>' + (item['f:BRAND'] === null ? '-' : item['f:BRAND']) +'</td>' +
                        '<td>' + (item['f:HANDSET_OS'] === null ? '-' : item['f:HANDSET_OS']) +'</td>' +
                        '<td>' + (item['f:DeviceName'] === null ? '-' : item['f:DeviceName']) +'</td>' +
                        '<td>' + _f_.resolveType(item['f:HandSet_Type']) +'</td>' +
                        '</tr>';
                    $('#sjcx-table tbody').append(tr);
                });
                $('#sjcx-table tbody a').on('click', function(){
                    _f_.clickHandler($(this).attr('index'), $(this).attr('operate'));
                });
            }else{
                Utils.notifyWarning("<span style='color:red'>"+"查询结果为空"+"</span>");
            }

            //隔行变色
            var tr=document.getElementsByTagName("tr");
            for(var j=0;j<tr.length;j++){
                if(tr[j].rowIndex !=0){
                    tr[j].style.background=tr[j].rowIndex %2 ==0?"#f5f5f5":"white";
                }
            }
        });
    };

    _f_.clickHandler = function(index, operate){
        var item = _dataCache[index];
        switch(operate){
            case "rycx":
                module.control.call("rycx","wificx", function(){
                    module.rycx.find(item['f:IDCard']);
                });
                break;
            case "jkgj":
                module.control.call("jkgj","wificx", function(){
                    module.jkgj.find(_f_.resolveMac(item['f:WIFI_MAC']));
                });
                break;
            default:
                break;
        }
    };

    /**
     * 验证输入的手机号码格式
     */
    _f_.valMobileNo=function(mobileNo){
        var reg=/^1[34578]\d{9}$/;
        if(reg.test(mobileNo)){
            return true;
        }else{
            return false;
        }
    }

    /**
     *把类型从数字解析成文字
     */
    _f_.resolveType=function(type){
        switch(type){
            case '1':
                return '违法犯罪嫌疑人手机';
                break;
            case '2':
                return '被盗抢手机';
                break;
            case '3':
                return '无助手机或其他性质手机';
                break;
            default:
                break;
        }
    };

    /**
     *处理mac地址文本格式（去掉冒号），以便后续调用查询
     */
    _f_.resolveMac=function(mac){
        var arr=mac.split(":");
        var rt="";
        for(var i=0;i<arr.length;i++){
            rt+=arr[i];
        }
        return rt;
    }

    $('#sjcx-search-keyword').on('keyup', function(event){
        if(event.keyCode == 13){
            _f_.onSearchHandler();
        }
    });
    $('#sjcx-search-btn').on('click', function(){
        if($('#sjcx-search-keyword').val() !=''){
            if(_f_.valMobileNo($('#sjcx-search-keyword').val())){
                _f_.onSearchHandler();
            }else{
                Utils.notifyWarning("<span style='color:red'>"+"请输入有效的手机号码"+"</span>");
            }
        }else{
            Utils.notifyWarning("<span style='color:red'>"+"请输入手机号码"+"</span>");
        }
    });

    return {
        find: function(mobileNo){
            $('#sjcx-search-keyword').val(mobileNo);
            //执行查询
            _f_.onSearchHandler();
        }
    }

})();