/**
 * Created by Administrator on 2017/1/11.
 */
module.rycx = (function(){

    var _f_ = {}, _page = {
        keyword: '',
        pageSize: 15,
        pageNum: 1,
        total: 0
    }, _dataCache;

    _f_.onSearchHanler = function(){
        _page.keyword = encodeURIComponent($('#rycx-search-keyword').val());
        _page.pageNum = 1;
        if(_page.keyword !=''){
            _f_.findByParam();
        }else{
            Utils.notifyWarning("<span style='color:red'>"+"请输入身份证号码或姓名"+"</span>");
        }
    };

    _f_.findByParam = function(){
        $('#rycx-pagination').hide();
        $('#rycx-user-table tbody').html('<tr><td colspan="7"><div style="text-align: center; padding: 20px;">正在查询数据，请稍等...</div></td></tr>');
        Utils.ajax(basePath + '/main/wificx/rycx/findByKeyword', _page, function(data){
            $('#rycx-user-table tbody').html('');
            _dataCache = data.records;
            _page.total = data.itemTotal;
            if(_dataCache.length !=0){
                $.each(_dataCache, function(i, user){
                    var tr = '<tr>' +
                        '<td>' + (parseInt(i)+1) +'</td>' +
                        '<td>' + user.XM +'</td>' +
                        '<td>' + user.SFZHM +'</td>' +
                        '<td><a style="color:blue" href="javascript:;" title="点击查询手机信息" operate="sjcx" index="' + i + '">' + user.LXDH +'</a></td>' +
                        '<td>' + (user.ZZXZ  === '' ? '-' : user.ZZXZ) +'</td>' +
                        '<td>' + (user.CJSJ  === '' ? '-' : user.CJSJ) +'</td>' +
                        '<td>' + (user.TABLENAME  === '' ? '-' : user.TABLENAME) +'</td>' +
                        '</tr>';
                    $('#rycx-user-table tbody').append(tr);
                });
                $('#rycx-user-table tbody a').on('click', function(){
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

            //分页导航显示
            if(_page.pageSize < _page.total){
            	if(_page.total>10000){
            		_page.total=10000;
            	}
                if(_page.total % _page.pageSize == 0){
                    _page.totalPage = _page.total / _page.pageSize;
                }else{
                    _page.totalPage = Math.floor(_page.total / _page.pageSize) + 1;
                }
                $('#rycx-pagination').html('<li><a style="padding: 4.5px 6px 4.5px 6px ; "><select style="border: 0px" id="rycx-select-pageSize"><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option></select></a></li>');
                $('#rycx-pagination').append('<li><a href="javascript:;" operate="first"><i class="fa fa-step-backward"></i></a></li>');
                $('#rycx-pagination').append('<li><a href="javascript:;" operate="prev"><i class="fa fa-angle-left"></i></a></li>');
                $('#rycx-pagination').append('<li><a href="javascript:;" style="color: red">' + parseInt(_page.pageNum) + '</a></li>');
                //显示5个页码
                for(var i=1;i<=4;i++){
                    if((parseInt(_page.pageNum)+i)<=parseInt(_page.totalPage)){
                        $('#rycx-pagination').append('<li><a href="javascript:;" operate="jump" pagenum="'+(parseInt(_page.pageNum)+i)+'">' + (parseInt(_page.pageNum)+i) + '</a></li>');
                    }
                }
                $('#rycx-pagination').append('<li><a href="javascript:;" operate="next"><i class="fa fa-angle-right"></i></a></li>');
                $('#rycx-pagination').append('<li><a href="javascript:;" operate="last"><i class="fa fa-step-forward"></i></a></li>');
                $('#rycx-pagination').append('<li><a style="padding: 4.5px 6px 4.5px 6px ; ">跳至<input type="text" id="rycx-input-pageNum" style="text-align:center;width: 40px;border: 0;border-bottom: 1px solid #337ab7;padding-bottom: 0px">页</a></li>');
                $('#rycx-pagination').show();
                $('#rycx-select-pageSize option[value="'+_page.pageSize+'"]').attr('selected','selected');
                //点击分页导航，分页操作
                $('#rycx-pagination a').on('click', function(){
                    _f_.pageOperate($(this).attr('operate'),$(this).attr('pagenum'));
                });
                //选择每页条数
                $('#rycx-select-pageSize').on('change',function() {
                    _page.pageSize = $('#rycx-select-pageSize').val();
                    _f_.findByParam();
                });
                //跳转指定页
                $('#rycx-input-pageNum').on('keyup', function(event){
                    _page.pageNum=$('#rycx-input-pageNum').val();
                    if(_page.pageNum<=_page.totalPage){
                        if(event.keyCode == 13){
                            _f_.findByParam();
                        }
                    }else{
                        _page.pageNum=_page.totalPage;
                        Utils.notifyWarning("<span style='color:red'>"+"超过总页数，请重新输入"+"</span>");
                    }
                });
            }
        });

    };

    /**
     * 分页操作
     * @param operate
     */
    _f_.pageOperate = function(operate,pageNum){
        switch(operate){
            case 'next':
                if(_page.pageNum * _page.pageSize < _page.total){
                    _page.pageNum++;
                    _f_.findByParam();
                }
                break;
            case 'prev':
                if(_page.pageNum > 1){
                    _page.pageNum--;
                    _f_.findByParam();
                }
                break;
            case 'first':
                if(_page.pageNum > 1){
                    _page.pageNum = 1;
                    _f_.findByParam();
                }
                break;
            case 'last':
                if(_page.pageNum < _page.totalPage){
                    _page.pageNum = _page.totalPage;
                    _f_.findByParam();
                }
                break;
            case 'jump':
                _page.pageNum = pageNum;
                _f_.findByParam();
                break;
            default:
                break;
        }
    };

    /**
     * 跳转查询手机号码相关信息
     * @param index
     * @param operate
     */
    _f_.clickHandler = function(index, operate){
        var user = _dataCache[index];
        switch(operate){
            case "sjcx":
                module.control.call("sjcx","zhcx", function(){
                    module.sjcx.find(user.LXDH);
                });
                break;
            default:
                break;
        }
    };

    $('#rycx-search-keyword').on('keyup', function(event){
        if(event.keyCode == 13){
            _f_.onSearchHanler();
        }
    });
    $('#rycx-search-btn').on('click', function(){
        _f_.onSearchHanler();
    });

    return {
        find: function(keyword){
            $('#rycx-search-keyword').val(keyword);
            _f_.onSearchHanler();
        }
    }

})();