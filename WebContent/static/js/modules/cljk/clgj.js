
module.clgj = (function(){
    var _f_ = {},drawSource,draw,vehicleSource,_dataCache,kakou_total,kakou_totalPage,selectedID=[],selectedName=[],/*total,totalpage,*/ 
    		kakou_params={
    			kkName:'',
    			sjlyStr:'',
    			pageSize:10,
    			pageNum:1
    		},
    		_params={
	            startTime:'',
	            stopTime: '',
	            pageSize: 15,
	            pageNum: 1,
	            cphm:'',
	            hpzl:'',
	            kkbh:''
        	};
    
    //点击选择车辆类型文本框
    var m=0;
    $('#clgj-cllx-select-btn').on('click', function(){
    	if(m==0){
    		//初始化加载
    		_f_.showVehicleType();
    		m++;
    	}       
    });
    
    /**
     * 查询车牌类型
     */
    _f_.showVehicleType=function(){
    	$('#clgj-cplx-select-table').html('');
    	Utils.ajax(basePath + '/main/cljk/clgj/showVehicleType',{},function(data){
    		if(data != null){
    			$.each(data,function(i,item){
    				var tr='<tr>'+'<td><input type="checkbox" dic_code="'+item.dic_code+'" dic_name='+item.dic_name+'></td><td>&nbsp;&nbsp;'+item.dic_name+'</td></tr>';
    				$('#clgj-cplx-select-table').append (tr);
    			});
    			
    		    //选择车牌类型
    			var selectType='';
    		    $('#clgj-cplx-select-table :checkbox').on('click', function () {     		    	
    		        if($(this).prop('checked') == true){   		        	
    		        	selectType+=$(this).attr('dic_name')+';';
    		        	_params.hpzl+=$(this).attr('dic_code')+';';
    		            $('#clgj-cllx-select-btn').val(selectType.substring(0,selectType.length-1));
    		        } else{    		        	
    		            var currentType=$(this).attr('dic_name')+';'
    		            selectType=selectType.replace(currentType,'');
    		            _params.hpzl=_params.hpzl.replace($(this).attr('dic_code')+';','');
    		            $('#clgj-cllx-select-btn').val(selectType.substring(0,selectType.length-1));
    		        }
    		    });
    		}
    	});
    };   
    
    //点击选择卡口文本框
    $('#clgj-kakou-select-btn').on('click', function(){
        _f_.onKakouSelectBtnClick();
    });
    
    /**
     * 点击选择卡口文本框，弹出模态框,加载卡口信息
     */
    var n=0;
    _f_.onKakouSelectBtnClick =function(){
        $('#clgj-kakou-select-modal').modal('show');
        //n=0时，加载模态框数据（n>1时不再重载，只控制隐藏与显示）
        if(n==0){
        	_f_.countKakou();
        	_f_.showDicDate();
            _f_.showKakouListByParams();
            _f_.showKakouPagination(kakou_params.pageSize,kakou_params.pageNum);          
            n++;
        }
    };

    //选择设备的模态框里，地区选择的确定button
    $('#clgj-kakou-ssqh-ensure-btn').on('click',function(){
        kakou_params.sjlyStr=$('#clgj-ssqh-select-text').val();
        _f_.showKakouListByParams('',kakou_params.sjlyStr);
    });
    
    //点击模态框里的搜索按钮
    $('#clgj-kakou-search-btn').on('click',function(){
    	kakou_params.kkName=$('#clgj-search-keyword').val();
    	kakou_params.sjlyStr=$('#clgj-ssqh-select-text').val();
       _f_.showKakouListByParams(kakou_params.kkName,kakou_params.sjlyStr);
    });
    
    /**
     * 查找显示区划name
     */
    _f_.showDicDate =function(){ 
    	$('#clgj-ssqh-list-table').html('');
    	Utils.ajax(basePath + '/main/cljk/clgj/showDicDate',{},function(data){
    		if(data != null){
    			$.each(data,function(i,item){
    				var tr='<tr>'+'<td><input type="checkbox" dic_name='+item.dic_name+'></td><td>&nbsp;&nbsp;&nbsp;&nbsp;'+item.dic_name+'</td></tr>';
    				$('#clgj-ssqh-list-table').append (tr);
    			});
    		    //选择设备的模态框里，点击地区筛选的文本框 
    			var selectDqText='';
    		    $('#clgj-ssqh-list-table :checkbox').on('click', function () {    		    	
    		        if($(this).prop('checked') == true){
    		            selectDqText+=$(this).attr('dic_name')+';';
    		            $('#clgj-ssqh-select-text').val(selectDqText.substring(0,selectDqText.length-1));
    		        } else{
    		            var currentDic=$(this).attr('dic_name')+';'
    		            selectDqText=selectDqText.replace(currentDic,'');
    		            $('#clgj-ssqh-select-text').val(selectDqText.substring(0,selectDqText.length-1));
    		        }
    		    });
    		}
    	})
    };
    
    /**
     * 查询显示卡口信息
     */
    _f_.showKakouListByParams=function(){ 
        $('#clgj-kakou-select-table tbody').html('');
        $('#clgj-kakou-select-table thead input[type="checkbox"]').prop('checked',false);
        //$('#clgj-kakou-scroll-sign').html('');
        $('#clgj-kakou-select-table tbody').html('<tr><td colspan="10"><div style="text-align: center; padding: 20px;">加载卡口列表中，请稍候...</div></td></tr>');
        Utils.ajax(basePath + '/main/cljk/clgj/findKakouByParams',kakou_params, function (data) {
        	$('#clgj-kakou-select-table tbody').html('');
        	if (data!= null) {
                $.each(data, function (i, item) {
                    var tr = '<tr>' +
                        '<td><input type="checkbox" len="'+data.length+'"  dwbh="'+item.dwbh+'" sjly="'+item.sjly+'" dwmc="'+item.dwmc+'"index="'+i+'"></td>' +
                        '<td>' + (parseInt(i)+1) + '</td>' +
                        '<td>' + (item.dwmc === undefined ? "未知点位" : item.dwmc.replace(kakou_params.kkName,'<span style="color: red">'+kakou_params.kkName+'</span>')) + '</td>' +                        
                        '<td>' + (item.dwwz === undefined ? '未知点位' : item.dwwz) + '</td>' +
                        '<td>' + (item.sjly === undefined ? '未知点位' : item.sjly) + '</td>' +
                        '</tr>';
                    $('#clgj-kakou-select-table tbody').append (tr);

                    if(selectedID.length !=0){
                    	for(var j=0;j<selectedID.length;j++){
                    		if(selectedID[j] == item.dwbh){
                                $('#clgj-kakou-select-table tbody input[type=\'checkbox\'][dwbh="'+selectedID[j]+'"]').prop('checked',true);
                                $('#clgj-kakou-select-table tbody input[type=\'checkbox\'][dwbh="'+selectedID[j]+'"]').attr('ischecked','1');
                    		}
                    	}
                    }
                });             
                
        		$('#clgj-kakou-select-table tbody input[type="checkbox"]').on('click', function () {
                    //取到点位的no，赋给添加的div id,绑定click事件
                    //var curDeviceId = $(this).attr('dwbh');
                    //计算选中复选框后，在后面div打上标记的高度top：（px）(420是滚动条的高度，单位px)
                    //var index= (Math.floor($(this).attr('index')/10)) * (420/($(this).attr('len')/10+1)) + 60;//420px是滚动条高度
                    if($(this).prop('checked') ==true){
                        //添加属性，便于后续取到已选中的checkbox，1表示已选中，0表示未选中
                        $(this).attr('ischecked',"1");
                        selectedID.push($(this).attr('dwbh'));
                        selectedName.push($(this).attr('dwmc'));
                        //滚动条右侧的快速定位，滚动条相应位置添加标记
                        //var signHtml='<div class="sign" index='+$(this).attr('index')+' id=sign'+curDeviceId+' style="top:'+index+'px;position: absolute;height: 2px;width: 12px;background-color:#702929;cursor: pointer"></div>';
                        //$('#clgj-kakou-scroll-sign').append(signHtml);
                        //全选
                        if($('#clgj-kakou-select-table tbody input[type=\'checkbox\'][ischecked="1"]').length==$(this).attr('len')){
                            $('#clgj-kakou-select-table thead input[type=\'checkbox\']').prop('checked',true);
                        }
                    } else{
                        $(this).attr('ischecked',"0");                      
                        //selectedID.remove(selectedID.indexOf($(this).attr('dwbh')));
                        selectedID.splice(selectedID.indexOf($(this).attr('dwbh')),1);                      
                        selectedID.splice(selectedID.indexOf($(this).attr('dwmc')),1); 
                        $('#clgj-kakou-select-table thead input[type=\'checkbox\']').prop('checked',false);
                        //取消选中，标记remove
                        //$('#sign'+curDeviceId).remove();
                    }
                    //添加的标记绑定click事件
                    //$('#sign'+curDeviceId).on('click',function(){
                    //    document.getElementById('clgj-kakou-select-div').scrollTop = 389 * (Math.floor($(this).attr('index')/10));
                    //});
                });   
                
                //隔行变色
                var tr=document.getElementsByTagName("tr");
                for(var j=0;j<tr.length;j++){
                    if(tr[j].rowIndex !=0){
                        tr[j].style.background=tr[j].rowIndex %2 ==0?"#f5f5f5":"white";
                    }
                }
            }else{
            	$('#clgj-kakou-select-table tbody').html('');
                Utils.notifyWarning("<span style='color:red'>"+"查询结果为空"+"</span>");
            }
        });        
    };
  
    /**
     * 查询卡口总条数
     */
    _f_.countKakou=function(){
        $.ajax({
            type:"POST",
            url:basePath + '/main/cljk/clgj/countKakou',
            async:false,
            success:function(data){
                var obj=eval('('+data+')');
                if(obj.result != ''){               	
                    kakou_total=parseInt(obj.data);
                    if(kakou_params.pageSize<kakou_total){
                    	_f_.showKakouPagination(kakou_params.pageSize,kakou_params.pageNum);
                    }
                }
            }
        });
    };
    
    /**
     * 显示卡口列表分页导航
     */
    _f_.showKakouPagination=function(pageSize,pageNum){
        if(pageSize < kakou_total){       	
            if(kakou_total % pageSize == 0){
            	kakou_totalPage = kakou_total / pageSize;
            }else{
            	kakou_totalPage = Math.floor(kakou_total / pageSize) + 1;
            }
            $('#clgj-kakou-pagination').html('');
            $('#clgj-kakou-pagination').append('<li><a href="javascript:;" operate="kakou_first"><i class="fa fa-step-backward"></i></a></li>');
            $('#clgj-kakou-pagination').append('<li><a href="javascript:;" operate="kakou_prev"><i class="fa fa-angle-left"></i></a></li>');
            $('#clgj-kakou-pagination').append('<li><a href="javascript:;" style="color: red">' + parseInt(pageNum) + '</a></li>');
            //显示5个页码
            for(var i=1;i<=4;i++){
                if((parseInt(pageNum)+i) <= kakou_totalPage){
                    $('#clgj-kakou-pagination').append('<li><a href="javascript:;" operate="kakou_jump" pagenum="'+(parseInt(pageNum)+i)+'">' + (parseInt(pageNum)+i) + '</a></li>');
                }
            }            
            $('#clgj-kakou-pagination').append('<li><a href="javascript:;" operate="kakou_next"><i class="fa fa-angle-right"></i></a></li>');
            $('#clgj-kakou-pagination').append('<li><a href="javascript:;" operate="kakou_last"><i class="fa fa-step-forward"></i></a></li>');
            $('#clgj-kakou-pagination').append('<li><a style="padding: 4.5px 6px 5px 6px ; ">跳至<input type="text" id="clgj-kakou-input-pageNum" style="text-align:center;width: 40px;border: 0;border-bottom: 1px solid #337ab7;padding-bottom: 0px">页</a></li>');
            $('#clgj-kakou-pagination').show();
            //点击分页导航，分页操作
            $('#clgj-kakou-pagination a').on('click', function(){
                _f_.pageOperate($(this).attr('operate'),$(this).attr('pagenum'));
            });
        }
        //跳转指定页
        $('#clgj-kakou-input-pageNum').on('keyup', function(event){
        	kakou_params.pageNum=$('#clgj-kakou-input-pageNum').val();
            if(kakou_params.pageNum <= kakou_totalPage){
                if(event.keyCode == 13){
                    _f_.showKakouListByParams();
                }
            }else{
            	kakou_params.pageNum=kakou_totalPage;
                Utils.notifyWarning("<span style='color:red'>"+"超过总页数，请重新输入"+"</span>");
            }
        });
        $('#clgj-kakou-pagination').show();
    };
    
    //卡口列表选择点击全选checkbox
    $('#clgj-kakou-select-table thead input[type=\'checkbox\']').on('click', function () {
    	selectedID=[];
    	selectedName=[];
        //$('#clgj-kakou-scroll-sign').html('');
        if($(this).prop('checked') ==true){
            $('#clgj-kakou-select-table tbody input[type=\'checkbox\']').each(function(){
                $(this).prop('checked',true);
                $(this).attr('ischecked',"1");
                selectedID.push($(this).attr('dwbh'));
                selectedName.push($(this).attr('dwmc'));        
            });
        }else{
            $('#clgj-kakou-select-table tbody input[type=\'checkbox\']').each(function(){
                $(this).prop('checked',false);
                $(this).attr('ischecked',"0");
                selectedID.splice(selectedID.indexOf($(this).attr('dwbh')),1);
                selectedName.splice(selectedID.indexOf($(this).attr('dwmc')),1);
            });
        }
    });
    
    //选择卡口，点击确定按钮，在文本框显示部分卡口名称
    $('#clgj-kakou-select-ensure-btn').on('click',function(){
        $('#clgj-kakou-select-btn').val('');
        var strKakou='';
        _params.kkbh='';
        
        if($("#clgj-kakou-list-select-btn").attr("class") == "active"){
        	if(selectedID.length == 0){
                Utils.notifyWarning("没有选中卡口信息");
                $('#clgj-kakou-select-modal').modal('hide');
                $('#clgj-kakou-select-btn').val('请选择卡口');
        	}else{
        		$('#clgj-kakou-select-modal').modal('hide');
        		for(var i=0;i<selectedID.length;i++){
        			_params.kkbh+=selectedID[i]+';';
        			strKakou+='，'+selectedName[i];
        		}
                _params.kkbh=_params.kkbh.substring(0,_params.kkbh.length-1);
                strKakou=strKakou.substring(1,strKakou.length);
                $('#clgj-kakou-select-btn').val(strKakou);
        	}
        }
        
        if($("#clgj-kakou-map-select-btn").attr("class") == "active"){
        	strKakou='';
        	_params.kkbh='';
        	$('#clgj-kakou-select-btn').val('');
        	var features = vehicleSource.getFeatures();
        	if(features.length == 0){
        		 Utils.notifyWarning("没有选中卡口信息");
                 $('#clgj-kakou-select-modal').modal('hide');
                 $('#clgj-kakou-select-btn').val('请选择卡口');
        	}else{
        		 $('#clgj-kakou-select-modal').modal('hide');
        		 for(var i=0;i<features.length;i++){
        			 strKakou+='，'+_f_.getText(features[i],0);
        			 _params.kkbh+=_f_.getDevId(features[i],0)+';';
        		 }
        		 _params.kkbh=_params.kkbh.substring(0,_params.kkbh.length-1);
        		 strKakou=strKakou.substring(1,strKakou.length);
        		 $('#clgj-kakou-select-btn').val(strKakou);
        	}
        }   
    });   
    
    //点击时间文本框促发时间控制器
    $('#clgj-startTime,#clgj-endTime').on('click', function(){
    	laydate({istime: true, elem: this, format: 'YYYY/MM/DD hh:mm:ss'});
    });
    
    $('#clgj-startTime').on('blur', function(){
    	var reg=/^(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/;
        if($('#clgj-startTime').val() !='' && !reg.test($('#clgj-startTime').val())){
        	 $('#clgj-startTime').focus();
            Utils.notifyWarning("<span style='color:red'>"+"请检查输入格式，需精确到时分秒"+"</span>");
        };
    });
    
    $('#clgj-endTime').on('blur', function(){
    	var reg=/^(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/;
        if($('#clgj-endTime').val() !='' && !reg.test($('#clgj-endTime').val())){
        	 $('#clgj-endTime').focus();
            Utils.notifyWarning("<span style='color:red'>"+"请检查输入格式，需精确到时分秒"+"</span>");
        };
    });   

    //选择设备的模态框里，点击搜索按钮
    $('#jkcx-device-search-btn').on('click',function(){
         var devName=$('#jkcx-search-keyword').val();
         var sjlyStr=$('#jkcx-jkdq-select-text').val();
        _f_.showDeviceListByParams(devName,sjlyStr);
    });
    
    //选择设备模态框里，列表和地图选择Tab切换
    $('#clgj-kakou-select-modal .link-tabs a').on('click', function(e) {
        if (!$(this).hasClass('active')) {
            var active = $('#clgj-kakou-select-modal .link-tabs a.active');
            var activeId = active.attr('tab');
            active.removeClass('active');
            $('#' + activeId).hide();
            $(this).addClass('active');
            $('#' + $(this).attr('tab')).show();
        }
    });
    
    //选择设备模态框里，点击地图选择加载地图
    $('#clgj-kakou-map-select-btn').on('click', function(){
        if($(this).attr('map-init') == 'false'){
            $(this).attr('map-init', 'true');
            _MapApp = MapUtils.initMap(document.getElementById('clgj-kakou-map-select'));
            drawSource = new ol.source.Vector({wrapX: false});
			var vector = new ol.layer.Vector({
				source: drawSource
			});
			_MapApp.addLayer(vector);
			
			vehicleSource = new ol.source.Vector();

			var vehicleVector = new ol.layer.Vector(
			{	
				source: vehicleSource,
				style:  _f_.getVehicleFeatureStyle
			});
			_MapApp.addLayer(vehicleVector);			
        }
    });
    
    //设备列表map范围查询设备按钮事件
    $("#clgj-kakou-map-select-buttonbar > button").on('click', function(){
    	if(draw){
    		_MapApp.removeInteraction(draw);
    	}
    	drawSource.clear();
    	vehicleSource.clear();
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
    		setTimeout(function(){    			
        		var features = drawSource.getFeatures();
        		if(features != null && features.length > 0){
        			for(var i=0; i<features.length; i++){
        				var feature = features[i];
        				var geo = feature.getGeometry();
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
        		        Utils.ajax(basePath + '/main/cljk/clgj/findKakouByMap', param, function (data) {
        		        	for(var i=0; i<data.length; i++){
        		        		var obj = data[i];
        		        		var feature = new ol.Feature({
        		    				geometry: new ol.geom.Point([obj.dwjd, obj.dwwd]),
        		    				name: obj.dwmc,
        		    				id: obj.dwbh,
        		    				sjly: obj.sjly
        		    			});	
        		        		vehicleSource.addFeature(feature);
        		        	}
        		        });
        			}
        		}
        		_MapApp.removeInteraction(draw);
    		}, 200);
    		
    	});
    });
       
    _f_.getVehicleFeatureStyle = function(feature, resolution){
    	var st= [];
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
							glyph: "fa-video-camera",//car[Math.floor(Math.random()*car.length)], 
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
    
    //页面点击查询按钮
    $('#clgj-search-btn').on('click',function(){
        $('#clgj-pagination').hide();
        _params.pageSize=15;
        _params.pageNum=1;
        _params.startTime=Utils.formatDT2DT($('#clgj-startTime').val());
        _params.stopTime= Utils.formatDT2DT($('#clgj-endTime').val());
        _params.cphm=$('#clgj-cphm-input').val();
        if(_params.startTime !='' && _params.stopTime !=''){
            //_f_.countClgjMes();
            _f_.findClgjMesByParams();
            _f_.showPagination(_params.pageSize,_params.pageNum);
        }else{
            Utils.notifyWarning("<span style='color:red'>"+"请输入开始时间，结束时间"+"</span>");
        }
    });    
    
    /**
     * 查询车辆轨迹信息总条数
     */
/*    _f_.countClgjMes=function(){
        $.ajax({
            type:"POST",
            url:basePath + '/main/cljk/clgj/countClgjMes',
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
     * 查询车辆轨迹信息
     */
    _f_.findClgjMesByParams=function(){
        $('#clgj-table tbody').html('<tr><td colspan="10"><div style="text-align: center; padding: 20px;">正在查询数据，请稍等...</div></td></tr>');
        Utils.ajax(basePath + '/main/cljk/clgj/findClgjMesByParams', _params, function(data){
            $('#clgj-table tbody').html('');
            _dataCache=data.result;
            if(_dataCache.length !=0){
                $.each(_dataCache,function(i,item){
                    var tr = '<tr>' +
                        '<td>' + (i+1) + '</td>' +
                        '<td>' + item.HPHM.replace(/\$/g,'') + '</td>' +
                        '<td>' + Utils.formatDTString(item.JGSJ) + '</td>' +
                        '<td>' + _f_.findKkmcByKkbh(item.KKBH) + '</td>' +
                        '<td>' + _f_.showDic(item.XSFX,'2002') + '</td>' +
                        '<td>' + '<a style="color:blue" href="javascript:;" relation="details" title="查看详细信息" index="' + i +
                        	'" cwkc="'+ item.CWKC +'" cdbh="'+ item.CDBH+'" clsd="'+ item.CLSD +'" csys="'+ item.CSYS +'" cthptzzp="'+ item.CTHPTZZP +
                        	'" hphm="'+ item.HPHM +'" hpys="'+ item.HPYS +'" hpzl="'+ item.HPZL +'" jgsj="'+ item.JGSJ +'" jksbbh="'+ item.JKSBBH +
                        	'" kkbh="'+ item.KKBH +'" ly="'+ item.LY +'" qjzp="'+ item.QJZP +'" xsfx="'+ item.XSFX + '" yssq="'+ item.YSSQ + '" zpsl="'+ item.ZPSL + '">' + '详细' +'</a>' + 
                        	'&nbsp;|&nbsp;' + '<a style="color:blue" type="relation" href="javascript:;" title="查看时间轴" operate="" index="' + i + '">' + '<i class="menu-icon fa fa-line-chart"></i>' +'</a>' +
                        	'&nbsp;|&nbsp;' + '<a style="color:blue" type="relation" href="javascript:;" title="地图展示" operate="" index="' + i + '">' + '<i class="menu-icon fa fa-map-marker"></i>' +'</a>' +
                        '</td>' +                
                        '</tr>';
                    $('#clgj-table tbody').append (tr);
                });
                
                $('#clgj-table tbody a[relation="details"]').on('click', function(){
                	$('#clgj-details-modal').modal('show');
                	$('#clgj-details-table tbody').html('');
                	var html =
                		'<tr>'+'<td>号牌号码</td><td>' + $(this).attr('hphm').replace(/\$/g,'') + '</td></tr>' +
                		'<tr>'+'<td>号牌种类</td><td>' + _f_.showDic($(this).attr('hpzl'),'2001') + '</td></tr>' +
                		'<tr>'+'<td>号牌颜色</td><td>' + _f_.showDic($(this).attr('hpys'),'2003') + '</td></tr>' +
                		'<tr>'+'<td>颜色深浅</td><td>' + ($(this).attr('yssq')==='0'?'浅色':'深色') + '</td>' +
                		'<tr>'+'<td>经过时间</td><td>' + Utils.formatDTString($(this).attr('jgsj')) + '</td></tr>' +
                		'<tr>'+'<td>经过卡口</td><td>' + _f_.findKkmcByKkbh($(this).attr('kkbh')) + '</td></tr>' +
                		'<tr>'+'<td>行驶方向</td><td>' + _f_.showDic($(this).attr('xsfx'),'2002') + '</td>' +
                		'<tr>'+'<td>车外廓长</td><td>' + $(this).attr('cwkc')+ '(厘米)' + '</td></tr>' +		                	
	                	'<tr>'+'<td>车辆速度</td><td>' + $(this).attr('clsd') + '</td></tr>' +
	                	'<tr>'+'<td>车道编号</td><td>' + $(this).attr('cdbh') + '</td></tr>' +
	                	'<tr>'+'<td>来源</td><td>' + $(this).attr('ly') + '</td></tr>' +
	                	'<tr>'+'<td>照片数量</td><td>' + ($(this).attr('zpsl')===''?'无照片':$(this).attr('zpsl')) + '</td></tr>' +
	                	'<tr>'+'<td>全景照片</td><td>' + $(this).attr('qjzp') + '</td></tr>';
	                	//'<tr>'+'<td>车身颜色</td><td>' + $(this).attr('csys') + '</td></tr>' +
	                	//'<tr>'+'<td>车头号牌特征照片</td><td>' + $(this).attr('cthptzzp') + '</td></tr>' +
	                	//'<tr>'+'<td>监控设备编号</td><td>' + $(this).attr('jksbbh') + '</td></tr>' +
                	$('#clgj-details-table tbody').append (html);
                });
                
                $('#clgj-table tbody a[type="relation"]').on('click', function(){
                    _f_.clickHandler($(this).attr('index'), $(this).attr('operate'));
                });
            }else{
               // $('#clgj-pagination').hide();
                $('#clgj-table tbody').html('');
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
     * 卡口编号查询卡口名称
     */
    _f_.findKkmcByKkbh=function(kkbh){
    	var rt='';
        $.ajax({
            type:'post',
            url:basePath + '/main/cljk/clgj/findKkmcByKkbh',
            data: {
            	kkbh:kkbh
            },
            async:false,
            success:function(data) {
                var obj=JSON.parse(data);
                if(obj.data != null){
                	rt = (obj.data.dwmc === undefined?'未知卡口':obj.data.dwmc);                  
                }
            }
        });
        return rt;
    };
    
    /**
     * 查询车辆字典表
     * @params type 查询字段类型
     * {'1001':'行政区划','2001':'号牌种类','2002':'行驶方向','2003':'号牌颜色'}
     */
    _f_.showDic=function(code,type){
    	var rt='';
        $.ajax({
            type:'post',
            url:basePath + '/main/cljk/clgj/showDic',
            data:{code:code,type:type},
            async:false,
            success:function(data) {
                var obj=JSON.parse(data);
                if(obj.data != null){
                    rt = obj.data.dic_name;
                }
            }
        });
        return rt;
    };
    
    /**
     * 显示分页导航
     */
    _f_.showPagination=function(pageSize,pageNum){
       // if(pageSize < total){
       //     if(total % pageSize == 0){
       //         totalpage = total / pageSize;
       //     }else{
       //         totalpage = Math.floor(total / pageSize) + 1;
       //     }
            $('#clgj-pagination').html('<li><a style="padding: 4.5px 6px 4.5px 6px ; "><select style="border: 0px" id="clgj-select-pageSize"><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option></select></a></li>');
            $('#clgj-pagination').append('<li><a href="javascript:;" operate="first">首页</a></li>');
            $('#clgj-pagination').append('<li><a href="javascript:;" operate="prev"><i class="fa fa-angle-left"></i></a></li>');
            $('#clgj-pagination').append('<li><a href="javascript:;" style="color: red">第' + parseInt(pageNum) + '页</a></li>');
            //显示5个页码
       //     for(var i=1;i<=4;i++){
       //         if((parseInt(pageNum)+i)<=totalpage){
       //             $('#clgj-pagination').append('<li><a href="javascript:;" operate="jump" pagenum="'+(parseInt(pageNum)+i)+'">' + (parseInt(pageNum)+i) + '</a></li>');
       //         }
       //     }
            $('#clgj-pagination').append('<li><a href="javascript:;" operate="next"><i class="fa fa-angle-right"></i></a></li>');
       //     $('#clgj-pagination').append('<li><a href="javascript:;" operate="last"><i class="fa fa-step-forward"></i></a></li>');
            $('#clgj-pagination').append('<li><a style="padding: 4.5px 6px 5px 6px ; ">跳至<input type="text" id="clgj-input-pageNum" style="text-align:center;width: 40px;border: 0;border-bottom: 1px solid #337ab7;padding-bottom: 0px">页</a></li>');
            $('#clgj-pagination').show();
            $('#clgj-select-pageSize option[value="'+pageSize+'"]').attr('selected','selected');
            //点击分页导航，分页操作
            $('#clgj-pagination a').on('click', function(){
                _f_.pageOperate($(this).attr('operate'),$(this).attr('pagenum'));
            });
       // }
        //选择每页条数
        $('#clgj-select-pageSize').on('change',function() {
            _params.pageSize = $('#clgj-select-pageSize').val();
            _f_.findClgjMesByParams();
            _f_.showPagination(_params.pageSize,_params.pageNum);
        });
        //跳转指定页
        $('#clgj-input-pageNum').on('keyup', function(event){
            _params.pageNum=$('#clgj-input-pageNum').val();
           // if(_params.pageNum<=totalpage){
                if(event.keyCode == 13){
                    _f_.findClgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                }
           // }else{
           //     _params.pageNum=totalpage;
           //     Utils.notifyWarning("<span style='color:red'>"+"超过总页数，请重新输入"+"</span>");
           // }
        });
        $('#clgj-pagination').show();
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
                    _f_.findClgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                //}
                break;
            case 'prev':
                if(_params.pageNum > 1){
                    _params.pageNum--;
                    _f_.findClgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                }
                break;
            case 'first':
                if(_params.pageNum > 1){
                    _params.pageNum = 1;
                    _f_.findClgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                }
                break;
/*            case 'last':
                if(_params.pageNum < totalpage){
                    _params.pageNum = totalpage;
                    _f_.findClgjMesByParams();
                    _f_.showPagination(_params.pageSize,_params.pageNum);
                }
                break;*/
            case 'jump':
                _params.pageNum = pageNum;
                _f_.findClgjMesByParams();
                _f_.showPagination(_params.pageSize,_params.pageNum);
                break;
            case 'kakou_next':
                if(kakou_params.pageNum * kakou_params.pageSize < kakou_total){
                	kakou_params.pageNum++;
                	_f_.showKakouListByParams();
                	_f_.showKakouPagination(kakou_params.pageSize,kakou_params.pageNum);
                }
                break;
            case 'kakou_prev':
                if(kakou_params.pageNum > 1){
                	kakou_params.pageNum--;
                	_f_.showKakouListByParams();
                	_f_.showKakouPagination(kakou_params.pageSize,kakou_params.pageNum);
                }
                break;
            case 'kakou_first':
                if(kakou_params.pageNum > 1){
                	kakou_params.pageNum = 1;
                	_f_.showKakouListByParams();
                	_f_.showKakouPagination(kakou_params.pageSize,kakou_params.pageNum);
                }
                break;
            case 'kakou_last':
                if(kakou_params.pageNum < kakou_totalPage){
                	kakou_params.pageNum = kakou_totalPage;
                	_f_.showKakouListByParams();
                	_f_.showKakouPagination(kakou_params.pageSize,kakou_params.pageNum);
                }
                break;
            case 'kakou_jump':
            	kakou_params.pageNum = pageNum;
            	_f_.showKakouListByParams();
            	_f_.showKakouPagination(kakou_params.pageSize,kakou_params.pageNum);
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
        switch(operate){
            case "":
                module.control.call("",'', function(){ 
                	
                });
                break;
            default:
                break;
        }
    };
    
    
    return {

    }

})();