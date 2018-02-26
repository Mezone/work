/**
 * 热点轨迹
 * Created by Administrator on 2017/1/18.
 */
module.rdgj = (function(){

    var _f_ = {}, _params = {
        startTime: '',
        stopTime: '',
        mac: '',
        pageSize: 15,
        pageNum: 1
    },_dataCache;

    _f_.findRdMesByMacdz=function(){
        $('#rdgj-list-table tbody').html('');
        $('#rdgj-pagination').hide();
        _params.mac=parseInt($('#rdgj-mac').val(),16).toString();
        _params.startTime =Utils.formatDT2DT($('#rdgj-startTime').val());
        _params.stopTime =Utils.formatDT2DT($('#rdgj-endTime').val());
        if(_params.startTime == '' || _params.stopTime == '' || _params.mac == ''){
            bootbox.alert({message: '查询参数有误！开始时间、结束时间和MAC地址不可以为空。'});
            return;
        }
        Utils.ajax(basePath + '/main/wifi/rdgj/findRdMesByMacdz',_params,function(data){
            _dataCache = data.result;
            if(_dataCache && _dataCache.length > 0){
                $.each(_dataCache, function(i, item){
                    var tr = '<tr>' +
                        '<td>' + (i+1) +'</td>' +
                        '<td>' + (item.ap_name  === '' ? '-/-' : item.ap_name) +'</td>' +
                        '<td>' + (item.dev_name  === '' ? '-/-' : item.dev_name) +'</td>' +
                        '<td>' + item.sjly +'</td>' +
                        '<td>' + Utils.formatDTString(item.recordtime) +'</td>' +
                        '<td>' + item.frequency +'</td>' +
                        '</tr>';
                    $('#rdgj-list-table tbody').append(tr);
                });
                $('#rdgj-pagination').html('<li><a style="padding: 4.5px 6px 4.5px 6px ; "><select style="border: 0px" id="rdgj-select-pageSize"><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option></select></a></li>');
                $('#rdgj-pagination').append('<li><a href="javascript:;" operate="first">首页</a></li>');
                $('#rdgj-pagination').append('<li><a href="javascript:;" operate="prev">上一页</a></li>');
                $('#rdgj-pagination').append('<li><a href="javascript:;">当前第' + _params.pageNum +'页</a></li>');
                $('#rdgj-pagination').append('<li><a href="javascript:;" operate="next">下一页</a></li>');
                $('#rdgj-pagination').show();
                $('#rdgj-select-pageSize option[value="'+_params.pageSize+'"]').attr('selected','selected');
            }else{
                $('#rdgj-pagination').hide();
                Utils.notifyWarning("没有查询到结果，请修改查询条件");
            }
            $('#rdgj-pagination a').on('click', function(){
                _f_.pageOperate($(this).attr('operate'));
            });
            //选择每页条数
            $('#rdgj-select-pageSize').on('change',function() {
                _params.pageSize = $('#rdgj-select-pageSize').val();
                _f_.findRdMesByMacdz();
            });

            //隔行变色
            var tr=document.getElementsByTagName("tr");
            for(var j=0;j<tr.length;j++){
                if(tr[j].rowIndex !=0){
                    tr[j].style.background=tr[j].rowIndex %2 ==0?"#f5f5f5":"white";
                }
            }

        });
    };

    /**
     * 分页操作
     * @param operate
     */
    _f_.pageOperate = function(operate){
        switch(operate){
            case 'next':
                _params.pageNum++;
                _f_.findRdMesByMacdz();
                break;
            case 'prev':
                if(_params.pageNum > 1){
                    _params.pageNum--;
                    _f_.findRdMesByMacdz();
                }
                break;
            case 'first':
                if(_params.pageNum > 1){
                    _params.pageNum = 1;
                    _f_.findRdMesByMacdz();
                }
                break;
            default:
                break;
        }
    };

    $('#rdgj-search-btn').on('click',function(){
        _f_.findRdMesByMacdz();
    });

    $('#rdgj-startTime, #rdgj-endTime').on('click', function(){
        laydate({
            istime: true,
            format: 'YYYY/MM/DD hh:mm:ss'
        });
    });

    $('#rdgj-startTime').on('blur', function(){
        if($('#rdgj-startTime').val() !=''){
            $('#rdgj-startTime').val(Utils.formatDTString($('#rdgj-startTime').val()));
        }
    });

    $('#rdgj-endTime').on('blur', function(){
        if($('#rdgj-endTime').val() !=''){
            $('#rdgj-endTime').val(Utils.formatDTString($('#rdgj-endTime').val()));
        }
    });

    return {
        find: function(mac,startTime,stopTime){
            $('#rdgj-mac').val(mac);
            $('#rdgj-startTime').val(Utils.formatDTString(startTime));
            $('#rdgj-endTime').val(Utils.formatDTString(stopTime));
            //执行查询
            _f_.findRdMesByMacdz();
        }
    }

})();