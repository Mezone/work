
module.jkcx = (function(){

    var _f_ = {},_MapApp,drawSource,draw,wifiSource,_dataCache,n= 0,/*total,totalpage,*/_params={
        startTime:'',
        stopTime: '',
        pageSize: 15,
        pageNum: 1,
        site_no:'',
        macdz:''
    };

    /**
     * 查找显示区划name
     */
    _f_.showDicDate =function(){ 
    	$('#jkcx-jkdq-list-table').html('');
    	Utils.ajax(basePath + '/main/wifi/jkcx/showDicDate',{},function(data){
    		if(data != null){
    			$.each(data,function(i,item){
    				var tr='<tr>'+'<td><input type="checkbox" dic_name='+item.dic_name+'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;'+item.dic_name+'</td></tr>';
    				$('#jkcx-jkdq-list-table').append (tr);
    			});
    		    //选择设备的模态框里，点击地区筛选的文本框 
    			var selectDqText='';
    		    $('#jkcx-jkdq-list-table :checkbox').on('click', function () {    		    	
    		        if($(this).prop('checked') == true){
    		            selectDqText+=$(this).attr('dic_name')+';';
    		            $('#jkcx-jkdq-select-text').val(selectDqText.substring(0,selectDqText.length-1));
    		        } else{
    		            var currentDic=$(this).attr('dic_name')+';'
    		            selectDqText=selectDqText.replace(currentDic,'');
    		            $('#jkcx-jkdq-select-text').val(selectDqText.substring(0,selectDqText.length-1));
    		        }
    		    });
    		}
    	})
    };  
    
    /**
     * 点击选择设备文本框，弹出模态框
     */
    _f_.onDeviceSelectBtnClick =function(){
        $('#jkcx-device-select-modal').modal('show');
        //n=0时，加载模态框数据（n>1时不再重载，只控制隐藏与显示）
        if(n==0){
        	_f_.showDicDate();
            _f_.showDeviceListByParams('','');
            n++;
        }
    };

    /**
     * 按照条件查询点位信息
     */
    _f_.showDeviceListByParams=function(devName,sjlyStr){
        $('#jkcx-device-select-table tbody').html('');
        $('#jkcx-device-select-table thead input[type="checkbox"]').prop('checked',false);
        $('#jkcx-device-scroll-sign').html('');

        Utils.ajax(basePath + '/main/wifi/jkcx/findDeviceByParams', {devName:devName,sjlyStr:sjlyStr}, function (data) {
            if (data!= null) {
                $.each(data, function (i, item) {
                    var tr = '<tr>' +
                        '<td><input type="checkbox" len="'+data.length+'" site_no="'+item.site_no+'" sjly="'+item.sjly+'"devname="'+item.dev_name+'"index="'+i+'"></td>' +
                        '<td>' + (parseInt(i)+1) + '</td>' +
                        '<td>' + (item.dev_name === undefined ? "未知点位" : item.dev_name.replace(devName,'<span style="color: red">'+devName+'</span>')) + '</td>' +                        
                        '<td>' + (item.dev_location === undefined ? '未知点位' : item.dev_location) + '</td>' +
                        '<td>' + (item.sjly === undefined ? '未知点位' : item.sjly) + '</td>' +
                        '</tr>';
                    $('#jkcx-device-select-table tbody').append (tr);
                });
                $('#jkcx-device-select-table tbody input[type="checkbox"]').on('click', function () {
                    //取到点位的no，赋给添加的div id,绑定click事件
                    var curDeviceId = $(this).attr('site_no');
                    //计算选中复选框后，在后面div打上标记的高度top：（px）(420是滚动条的高度，单位px)
                    var index= (Math.floor($(this).attr('index')/10)) * (420/($(this).attr('len')/10+1)) + 60;//420px是滚动条高度
                    if($(this).prop('checked') ==true){
                        //添加属性，便于后续取到已选中的checkbox，1表示已选中，0表示未选中
                        $(this).attr('ischecked',"1");
                        //滚动条右侧的快速定位，滚动条相应位置添加标记
                        var signHtml='<div class="sign" index='+$(this).attr('index')+' id=sign'+curDeviceId+' style="top:'+index+'px;position: absolute;height: 2px;width: 12px;background-color:#702929;cursor: pointer"></div>';
                        $('#jkcx-device-scroll-sign').append(signHtml);
                        if($('#jkcx-device-select-table tbody input[type=\'checkbox\'][ischecked="1"]').length==$(this).attr('len')){
                            $('#jkcx-device-select-table thead input[type=\'checkbox\']').prop('checked',true);
                        }
                    } else{
                        $(this).attr('ischecked',"0");
                        $('#jkcx-device-select-table thead input[type=\'checkbox\']').prop('checked',false);
                        //取消选中，标记remove
                        $('#sign'+curDeviceId).remove();
                    }
                    //添加的标记绑定click事件
                    $('#sign'+curDeviceId).on('click',function(){
                        document.getElementById('jkcx-device-select-div').scrollTop = 389 * (Math.floor($(this).attr('index')/10));
                    });
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
   
    /**
     * 查询轨迹信息
     */
    _f_.findMacgjMesByParams=function(){
        $('#jkcx-table tbody').html('<tr><td colspan="10"><div style="text-align: center; padding: 20px;">正在查询数据，请稍等...</div></td></tr>');
        Utils.ajax(basePath + '/main/wifi/jkcx/findMacgjMesByParams', _params, function(data){
            $('#jkcx-table tbody').html('');
            _dataCache=data.result;
            //total=data.total;
            if(_dataCache.length !=0){
                $.each(_dataCache,function(i,item){
                    var tr = '<tr>' +
                        '<td>' + (i+1) + '</td>' +
                        '<td>' + _f_.macIsFalse(item.usr_mac) +'</a>' + '</td>' +
                        '<td>' + (_f_.showMacOrgOrBrand(item.usr_mac,item.agent) === ''? '-' : _f_.showMacOrgOrBrand(item.usr_mac,item.agent)) + '</td>' +
                        '<td>' + (item.agent === ''? '-' : _f_.formatAgentToSysAndBrand(item.agent,1)) + '</td>' +
                        '<td>' + Utils.formatDTString(item.recordtime) + '</td>' +
                        '<td>' + (item.duration === ''? '-' : _f_.formatToTime(item.duration)) + '</td>' +
                        '<td>' + item.times + '</td>' +
                        '<td>' + item.dev_name + '</td>' +
                        '<td>' + _f_.formatSingalPic(item.signal) + '</td>' +
                        '<td>' + '<a style="color:blue" href="javascript:;" title="查询连接热点信息" operate="rdgj" index="' + i + '">' + '<i class="menu-icon fa fa-wifi"></i>' +'</a>' + 
                        	 '&nbsp;|&nbsp;' + '<a style="color:blue" href="javascript:;" title="时间轴展示" operate="" index="' + i + '">' + '<i class="menu-icon fa fa-line-chart"></i>' +'</a>'+
                        	 '&nbsp;|&nbsp;' + '<a style="color:blue" href="javascript:;" title="地图展示" operate="" index="' + i + '">' + '<i class="menu-icon fa fa-map-marker"></i>' +'</a>'+'</td>' +
                        '</tr>';
                    $('#jkcx-table tbody').append (tr);
                });
                $('#jkcx-table tbody a').on('click', function(){
                    _f_.clickHandler($(this).attr('index'), $(this).attr('operate'));
                });
            }else{
                //$('#jkcx-pagination').hide();
                Utils.notifyWarning("<span style='color:red'>"+"查询结果为空"+"</span>");
            }
            //隔行变色
            var tr=document.getElementsByTagName("tr");
            for(var j=0;j<tr.length;j++){
                if(tr[j].rowIndex !=0){
                    tr[j].style.background=tr[j].rowIndex %2 ==0?"#f5f5f5":"white";
                }
            }
        })
    };

    /**
     * 查询轨迹信息总条数
     */
/*    _f_.countMacgjMes=function(){
        $.ajax({
            type:"POST",
            url:basePath + '/main/wifi/jkcx/countMacgjMes',
            data:_params,
           // async:false,
            success:function(data){
                var obj=eval('('+data+')');
                if(obj.result != ''){
                    total=parseInt(obj.result);
                    if(_params.pageSize<total){
                    	_f_.showPagination(_params.pageSize,_params.pageNum);
                    }
                }
            }
        });
    };*/
    
    /**
     * 显示分页导航
     */
    _f_.showPagination=function(pageSize,pageNum){
        //if(pageSize < total){
        //    if(total % pageSize == 0){
        //        totalpage = total / pageSize;
        //    }else{
        //        totalpage = Math.floor(total / pageSize) + 1;
        //    }
            $('#jkcx-pagination').html('<li><a style="padding: 4.5px 6px 4.5px 6px ; "><select style="border: 0px" id="jkcx-select-pageSize"><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option></select></a></li>');
        //    $('#jkcx-pagination').append('<li><a href="javascript:;" operate="first"><i class="fa fa-step-backward"></i></a></li>');
            $('#jkcx-pagination').append('<li><a href="javascript:;" operate="first">首页</a></li>');
            $('#jkcx-pagination').append('<li><a href="javascript:;" operate="prev"><i class="fa fa-angle-left"></i></a></li>');
            $('#jkcx-pagination').append('<li><a href="javascript:;" style="color: red">第' + pageNum + '页</a></li>');
            //显示5个页码
        //    for(var i=1;i<=4;i++){
        //        if((parseInt(pageNum)+i)<=totalpage){
        //            $('#jkcx-pagination').append('<li><a href="javascript:;" operate="jump" pagenum="'+(parseInt(pageNum)+i)+'">' + (parseInt(pageNum)+i) + '</a></li>');
        //        }
        //    }
            $('#jkcx-pagination').append('<li><a href="javascript:;" operate="next"><i class="fa fa-angle-right"></i></a></li>');
        //    $('#jkcx-pagination').append('<li><a href="javascript:;" operate="last"><i class="fa fa-step-forward"></i></a></li>');
            $('#jkcx-pagination').append('<li><a style="padding: 4.5px 6px 5px 6px ; ">跳至<input type="text" id="jkcx-input-pageNum" style="text-align:center;width: 60px;border: 0;border-bottom: 1px solid #337ab7;padding-bottom: 0px">页</a></li>');
            $('#jkcx-pagination').show();
            $('#jkcx-select-pageSize option[value="'+pageSize+'"]').attr('selected','selected');
            //点击分页导航，分页操作
            $('#jkcx-pagination a').on('click', function(){
                _f_.pageOperate($(this).attr('operate'),$(this).attr('pagenum'));
            });
        //}
        //选择每页条数
        $('#jkcx-select-pageSize').on('change',function() {
            _params.pageSize = $('#jkcx-select-pageSize').val();
            _f_.findMacgjMesByParams();
            _f_.showPagination(_params.pageSize,_params.pageNum);
        });
        //跳转指定页
        $('#jkcx-input-pageNum').on('keyup', function(event){
            _params.pageNum=$('#jkcx-input-pageNum').val();
        //    if(_params.pageNum<=totalpage){
                if(event.keyCode == 13){
                    _f_.findMacgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                }
        //    }else{
        //        _params.pageNum=totalpage;
        //        Utils.notifyWarning("<span style='color:red'>"+"超过总页数，请重新输入"+"</span>");
        //    }
        });
        $('#jkcx-pagination').show();
    };
    
    /**
     * 分页操作
     * @param operate
     */
    _f_.pageOperate = function(operate,pageNum){
        switch(operate){
            case 'next':
                //if(_params.pageNum * _params.pageSize < total){
                    _params.pageNum++;
                    _f_.findMacgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                //}
                break;
            case 'prev':
                if(_params.pageNum > 1){
                    _params.pageNum--;
                    _f_.findMacgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                }
                break;
            case 'first':
                if(_params.pageNum > 1){
                    _params.pageNum = 1;
                    _f_.findMacgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                }
                break;
           // case 'last':
           //     if(_params.pageNum < totalpage){
           //         _params.pageNum = totalpage;
           //         _f_.findMacgjMesByParams();
           //         _f_.showPagination(_params.pageSize,_params.pageNum);
           //     }
           //     break;
            case 'jump':
                _params.pageNum = pageNum;
                _f_.findMacgjMesByParams();
                _f_.showPagination(_params.pageSize,_params.pageNum);
                break;
            default:
                break;
        }
    };

    /**
     * 关联跳转页面
     * @param index
     * @param operate
     */
    _f_.clickHandler = function(index, operate){
        var item = _dataCache[index];
        switch(operate){
            case "rdgj":
                module.control.call("rdgj",'wificx', function(){
                    module.rdgj.find(_f_.macIsFalse(item.usr_mac),_params.startTime,_params.stopTime);
                });
                break;
/*            case "jkgj":
                module.control.call("jkgj",'wificx', function(){
                    module.jkgj.find(_f_.macIsFalse(_f_.macConvert(item.usr_mac)),_params.startTime,_params.stopTime);
                });
                break;*/
            default:
                break;
        }
    };

    /**
     * 伪mac地址判断
     * @param mac
     */
    _f_.macIsFalse=function(mac){
        var falseMac=mac.substring(1,2);
        if(falseMac == '1' || falseMac == '3' || falseMac == '5' || falseMac == '7' || falseMac == '9' || falseMac == 'b' || falseMac == 'd' || falseMac == 'f'){
            var macHtml="<span style='color: red' data-toggle='tooltip' data-placement='top' title='伪mac地址'>"+macResult+"</span>";
            return macHtml;
        }else{
            return mac;
        }
    }

    /**
     * 时长转换成时分秒
     * @param dur
     */
    _f_.formatToTime=function(dur){
        var arr=dur.split(":");
        var time="";
        if(parseInt(arr[0])!=0){
            time+=parseInt(arr[0])+"小时";
        }
        if(parseInt(arr[1])!=0){
            time+=parseInt(arr[1])+"分";
        }
        if(parseInt(arr[2])!=0){
            time+=parseInt(arr[2])+"秒";
        }
        if(parseInt(arr[0])==0 && parseInt(arr[1])==0 && parseInt(arr[2])==0){
            time+="0秒";
        }
        return time;
    }

    /**
     * 信号转换成图片
     * @param signal
     */
    _f_.formatSingalPic=function(signal){
        var signalHtml="";
        if(signal !=null || signal !=""){
            if(parseInt(signal)<=(-105)){
                signalHtml="<img src='"+basePath+"/static/images/xinhao_3g_0.png' width='25'/>";
            }else if(parseInt(signal)>-105 && parseInt(signal)<=-95){
                signalHtml="<img src='"+basePath+"/static/images/xinhao_3g_1.png' width='25'/>";
            }else if(parseInt(signal)>-95 && parseInt(signal)<=-85){
                signalHtml="<img src='"+basePath+"/static/images/xinhao_3g_2.png' width='25'/>";
            }else if(parseInt(signal)>-85 && parseInt(signal)<=-75){
                signalHtml="<img src='"+basePath+"/static/images/xinhao_3g_3.png' width='25'/>";
            }else if(parseInt(signal)>-75){
                signalHtml="<img src='"+basePath+"/static/images/xinhao_3g_4.png' width='25'/>";
            }
            return signalHtml;
        }else{
            return "-";
        }
    }

    /**
     * 将agent解析成手机操作系统和手机品牌，arr[0]是手机品牌，arr[1]是手机系统
     * @param agent
     * @param a
     */
    _f_.formatAgentToSysAndBrand=function(agent,n){
        var arr=new Array(2);
        if(agent =='' || agent==null){
            arr[n]='';
        }else{
            arr=agent.split(";");
        }
        return arr[n];
    }

    /**
     * 显示mac厂商或品牌
     * @param mac
     * @param agent
     */
    _f_.showMacOrgOrBrand=function(mac,agent){
        var org="";
        if(_f_.formatAgentToSysAndBrand(agent,0) ==''){
            var macModel=mac.substring(0,6).toUpperCase();
            $.ajax({
                type:"POST",
                url:basePath+"/main/wifi/jkcx/findMacOrgByMacdz",
                data: {
                    macModel:macModel
                },
                async:false,
                success:function(data) {
                    var obj=JSON.parse(data);
                    if(obj.data.result !=""){
                        org=obj.data.result[0].Organization;
                    }
                }
            });
        }else{
            org=_f_.formatAgentToSysAndBrand(agent,0);
        }
        return org;
    };

    //页面点击选择设备文本框，弹出模态框，并加载点位信息
    $('#jkcx-device-select-btn').on('click', function(){
        _f_.onDeviceSelectBtnClick();
    });

    //选择设备的模态框里，地区筛选的确定button
    $('#jkcx-device-jkdq-ensure-btn').on('click',function(){
        var sjlyStr=$('#jkcx-jkdq-select-text').val();
        _f_.showDeviceListByParams('',sjlyStr);
    });

    //选择设备模态框里，列表和地图选择Tab切换
    $('#jkcx-device-select-modal .link-tabs a').on('click', function(e) {
        if (!$(this).hasClass('active')) {
            var active = $('#jkcx-device-select-modal .link-tabs a.active');
            var activeId = active.attr('tab');
            active.removeClass('active');
            $('#' + activeId).hide();
            $(this).addClass('active');
            $('#' + $(this).attr('tab')).show();
        }
    });

    //选择设备模态框里，点击地图选择加载地图
    $('#jkcx-device-map-select-btn').on('click', function(){
        if($(this).attr('map-init') == 'false'){
            $(this).attr('map-init', 'true');
            _MapApp = MapUtils.initMap(document.getElementById('jkcx-device-map-select'));
            drawSource = new ol.source.Vector({wrapX: false});
			var vector = new ol.layer.Vector({
				source: drawSource
			});
			_MapApp.addLayer(vector);
			
			wifiSource = new ol.source.Vector();

			var wifiVector = new ol.layer.Vector(
			{	
				source: wifiSource,
				style:  _f_.getWifiFeatureStyle
			});
			_MapApp.addLayer(wifiVector);

			
        }
    }); 
    
    //点击时间文本框促发时间控制器
    $('#jkcx-startTime,#jkcx-endTime').on('click', function(){
    	laydate({istime: true, elem: this, format: 'YYYY/MM/DD hh:mm:ss'});
    });
    
    $('#jkcx-startTime').on('blur', function(){
    	var reg=/^(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/;
        if($('#jkcx-startTime').val() !='' && !reg.test($('#jkcx-startTime').val())){
        	 $('#jkcx-startTime').focus();
            Utils.notifyWarning("<span style='color:red'>"+"请检查输入格式，需精确到时分秒"+"</span>");
        };
    });
    
    $('#jkcx-endTime').on('blur', function(){
    	var reg=/^(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/;
        if($('#jkcx-endTime').val() !='' && !reg.test($('#jkcx-endTime').val())){
        	 $('#jkcx-endTime').focus();
            Utils.notifyWarning("<span style='color:red'>"+"请检查输入格式，需精确到时分秒"+"</span>");
        };
    });

    //选择设备的模态框里，点击搜索按钮
    $('#jkcx-device-search-btn').on('click',function(){
         var devName=$('#jkcx-search-keyword').val();
         var sjlyStr=$('#jkcx-jkdq-select-text').val();
        _f_.showDeviceListByParams(devName,sjlyStr);
    });
    
    //点击全选checkbox
    $('#jkcx-device-select-table thead input[type=\'checkbox\']').on('click', function () {
        $('#jkcx-device-scroll-sign').html('');
        if($(this).prop('checked') ==true){
            $('#jkcx-device-select-table tbody input[type=\'checkbox\']').each(function(){
                $(this).prop('checked',true);
                $(this).attr('ischecked',"1"); 	 	
                var curDeviceId = $(this).attr('site_no');
                //计算选中复选框后，在后面div打上标记的高度top：（px）(420是滚动条的高度，单位px)
                var index= (Math.floor($(this).attr('index')/10)) * (420/($(this).attr('len')/10+1)) + 60;//420px是滚动条高度
                var signHtml='<div class="sign" index='+$(this).attr('index')+' id=sign'+curDeviceId+' style="top:'+index+'px;position: absolute;height: 2px;width: 12px;background-color:#702929;cursor: pointer"></div>';
                $('#jkcx-device-scroll-sign').append(signHtml);
                //点击标记滚动条跳到指定位置
                $('#sign'+curDeviceId).on('click',function(){
                    document.getElementById('jkcx-device-select-div').scrollTop = 389 * (Math.floor($(this).attr('index')/10));
                });
            });
        }else{
            $('#jkcx-device-select-table tbody input[type=\'checkbox\']').each(function(){
                var curDeviceId = $(this).attr('site_no');
                $('#sign'+curDeviceId).remove();
                $(this).prop('checked',false);
                $(this).attr('ischecked',"0");
            });
        }

    });

    //选择采集设备的模态框里，点击确定，页面显示所选项的devName
    $('#jkcx-device-select-ensure-btn').on('click',function(){
        $('#jkcx-device-select-btn').val('');
        var devName='';
        
        if($("#jkcx-device-list-select-btn").attr("class") == "active"){
        	devName='';
        	_params.site_no='';
        	if($('#jkcx-device-select-table tbody input[type="checkbox"][ischecked="1"]').length==0){
                Utils.notifyWarning("没有选中设备信息");
                $('#jkcx-device-select-modal').modal('hide');
                $('#jkcx-device-select-btn').val('请选择采集设备');
            }else{
                $('#jkcx-device-select-modal').modal('hide');
                //var n=0;
                $('#jkcx-device-select-table tbody input[type="checkbox"][ischecked="1"]').each(function(){
                    //n++;
                    _params.site_no+=$(this).attr('site_no')+';';
                    devName+='，'+$(this).attr('devname');
                    //if(n==2 && $('#jkcx-device-select-table tbody input[type="checkbox"][ischecked="1"]').length>2){
                    //    devName+='……';
                    //    return false;
                    //}
                });
                _params.site_no=_params.site_no.substring(0,_params.site_no.length-1);
                devName=devName.substring(1,devName.length);
                $('#jkcx-device-select-btn').val(devName);
            }
        }
        
        if($("#jkcx-device-map-select-btn").attr("class") == "active"){
        	devName='';
        	_params.site_no='';
        	$('#jkcx-device-select-btn').val('');
        	var features = wifiSource.getFeatures();
        	if(features.length == 0){
        		 Utils.notifyWarning("没有选中设备信息");
                 $('#jkcx-device-select-modal').modal('hide');
                 $('#jkcx-device-select-btn').val('请选择采集设备');
        	}else{
        		 $('#jkcx-device-select-modal').modal('hide');
        		 for(var i=0;i<features.length;i++){
        			//if(i==2){
        			//	 devName+='……';
        			//	 break;
        			// }
        			 devName+='，'+_f_.getText(features[i],0);
        			 _params.site_no+=_f_.getDevId(features[i],0)+';';
        		 }
        		 _params.site_no=_params.site_no.substring(0,_params.site_no.length-1);
        		 devName=devName.substring(1,devName.length);
        		 $('#jkcx-device-select-btn').val(devName);
        	}
        }
        
    });

    //页面点击查询按钮
    $('#jkcx-search-btn').on('click',function(){
        $('#jkcx-pagination').hide();
        _params.pageSize=15;
        _params.pageNum=1;
        _params.startTime=Utils.formatDT2DT($('#jkcx-startTime').val());
        _params.stopTime= Utils.formatDT2DT($('#jkcx-endTime').val());
        _params.macdz=$('#jkcx-macdz-input').val().toUpperCase();
        if(_params.startTime !='' && _params.stopTime !=''){
            //_f_.countMacgjMes();
            _f_.findMacgjMesByParams();
            _f_.showPagination(_params.pageSize,_params.pageNum);
        }else{
            Utils.notifyWarning("<span style='color:red'>"+"请输入开始时间，结束时间"+"</span>");
        }
    });
    
    //设备列表map范围查询设备按钮事件
    $("#jkcx-device-map-select-buttonbar > button").on('click', function(){
    	if(draw){
    		_MapApp.removeInteraction(draw);
    	}
    	drawSource.clear();
    	wifiSource.clear();
    	if($(this).attr('type') =='Circle'){
    		 //_MapApp.
    		 draw = new ol.interaction.Draw({
    			 source: drawSource,
    			 type: "Circle"
    		 });
    	 }else if($(this).attr('type') =='Box'){
    		 draw = new ol.interaction.Draw({
    			 source: drawSource,
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
    		 draw = new ol.interaction.Draw({
    			 source: drawSource,
    			 type: "Polygon"
    		 });
    	 }
    	
    	_MapApp.addInteraction(draw);
    	
    	draw.on("drawend", function(feature){
    		//console.log(feature)
    		//console.log(feature.feature.getGeometry().getCoordinates())
    		//console.log("over");
    		setTimeout(function(){
    			
        		var features = drawSource.getFeatures();
        		//console.log(features);
        		if(features != null && features.length > 0){
        			for(var i=0; i<features.length; i++){
        				var feature = features[i];
        				var geo = feature.getGeometry();
        				//console.log(geo.getCoordinates());
        				var geotype = geo.getType();
        				var coords = "";
        				if(geotype == "Circle"){
        					coords = geo.getCenter() + "," + geo.getRadius();
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
        				
        				var param = {geotype: geotype, coords: coords};
        				console.log(param);
        				
        				
        		        Utils.ajax(basePath + '/main/wifi/jkcx/findDeviceByMap', param, function (data) {
        		        	//console.log(data);
        		        	//var stye = _f_.getWifiFeatureStyle;
        		        	for(var i=0; i<data.length; i++){
        		        		var obj = data[i];
        		        		//console.log(obj);
        		        		var feature = new ol.Feature({
        		    				geometry: new ol.geom.Point([obj.longitude, obj.latitude]),
        		    				name: obj.dev_name,
        		    				id: obj.site_no,
        		    				sjly: obj.sjly
        		    			});
        		        		//feature.setStyle(stye);
        		        		console.log(feature);
        		        		
        		        		wifiSource.addFeature(feature);
        		        	}
        		        });
        			}
        		}
        		_MapApp.removeInteraction(draw);
    		}, 200);
    		
    	});
    });
    
    
    _f_.getWifiFeatureStyle = function(feature, resolution){
    	var st= [];
		// Shadow style
		if (true){
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
							glyph: "fa-wifi",//car[Math.floor(Math.random()*car.length)], 
							fontSize: .8,
							radius: 15, 
							//offsetX: -15,
							rotation: 0*Math.PI/180,
							rotateWithView: false,
							offsetY: -15,
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
							text: _f_.getText(feature, resolution),
							fill: new ol.style.Fill({color: "blue"}),
							stroke: new ol.style.Stroke({color: "#ffffff", width: 2}),
							font: "bold 12px",
							offsetX: 20,
							offsetY: -12,
							rotation: 0
						})
					}));
			return st;
    }
    
    
    _f_.getText = function(feature, resolution){
    	if( resolution > 0.00034332275390625){
    		return "";
    	}else{
        	return feature.get("name");
    	}
    }
    
    _f_.getDevId = function(feature, resolution){
    	if( resolution > 0.00034332275390625){
    		return "";
    	}else{
        	return feature.get("id");
    	}
    }

    return {

    }

})();