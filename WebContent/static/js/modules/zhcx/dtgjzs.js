/**
 * 地图轨迹展示
 */
module.dtgjzs = (function(){

	var _f_ = {},_params={}, _MapApp, _playSlider, _dataResult, _showPageSize=15;
    
    _MapApp = MapUtils.initMap(document.getElementById("dtgjzs-map"));

    $('#dtgjzs-search-widget-buttons *[data-toggle="collapse"]').on("click",function(n){
		n.preventDefault();
		var t=$(this).parents(".widget").eq(0),r=t.find(".widget-body"),i=$(this).find("i"),u="fa-plus",f="fa-minus",e=300;
		t.hasClass("collapsed") ? $("#dtgjzs-search-result").css("top", "310px") : $("#dtgjzs-search-result").css("top", "75px");
		t.hasClass("collapsed")?(i&&i.addClass(f).removeClass(u),t.removeClass("collapsed"),r.slideUp(0,function(){r.slideDown(e)})):(i&&i.addClass(u).removeClass(f),r.slideUp(200,function(){t.addClass("collapsed")}))
	});
    
    
    
    $("#dtgjzs-search-btn").on("click", function(){
		_f_.getParam();
		if(_params.key == ''){
			var text = $("#dtgjzs-type option:selected").text();
            Utils.notifyWarning("<span style='color:red'>"+"请输入" + text + "</span>");
            return;
		}
		if(_params.startTime =='' || _params.stopTime ==''){
            Utils.notifyWarning("<span style='color:red'>"+"请输入开始时间，结束时间"+"</span>");
            return;
        }
		
		 Utils.ajax(basePath + '/main/zhcx/dtgjzs/gjcx', _params, function (data) {
			 console.log(data);
			 _dataResult = data.result;
			 if(_dataResult.length == 0){
		            Utils.notifySuccess("未查询到相关轨迹");
			 }else{
				 $('#dtgjzs-search-widget-buttons *[data-toggle="collapse"]').trigger("click");
				 
				 var pageCount = Math.ceil(_dataResult.length/_showPageSize);
	             layui_page({
	    			    cont: 'dtgjzs-search-page-control',
	    			    pages: pageCount,
	    			    total: _dataResult.length,
	    			    curr: 1,
	    			    groups: 3,
	    			    first: "<<",
	    			    prev: '<',
	    			    next: '>',
	    			    last: false,
	    			    skin: '#1E9FFF',
	    			    jump: function(obj){
	    			        //console.log(obj);
	    			    	_showListResult(obj);
	    			    }
	    		 });
	            	
				 //wifi recordtime dev_name
				 //car  JGSJ
				// for(var i=0; i<result.length; i++){
					 
				// }
			 }
		 });
	});
    
    _showListResult = function(obj){
//    	 <div class="zhcx-dtgjzs-result-list-item">
//	    	<div class="col-lg-3 col-sm-3 col-xs-3" style="padding-top:10px">
//	    		1
//	    	</div>
// 	    <div class="col-lg-9 col-sm-9 col-xs-9 text-align-left padding-5">
// 	    	<p  style="margin-bottom: 1px;text-overflow:ellipsis;width:150px;white-space:nowrap;overflow:hidden;word-break:keep-all;cursor:pointer">白蒲站</p>
// 	    	<label style="font-weight:normal;"><i class="fa fa-clock-o"></i>2017-03-22 10:10:10</label>
// 	    </div>
//	   </div>
    	//dtgjzs-search-result
    	var curr = obj.curr;
    	var index = (curr-1) * _showPageSize;
    	$("#dtgjzs-search-result").html("");
    	for(var i=0; i<_showPageSize; i++){
    		var obj = _dataResult[index + i];
    		var html = [];
    		html.push('<div class="zhcx-dtgjzs-result-list-item">');
    		html.push('<div class="col-lg-2 col-sm-2 col-xs-2" style="padding-top:10px">');
    		html.push(index + i + 1);
    		html.push('</div>');
    		html.push(' <div class="col-lg-10 col-sm-10 col-xs-10 text-align-left">');
    		html.push('<p  style="margin-bottom: 1px;text-overflow:ellipsis;width:150px;white-space:nowrap;overflow:hidden;word-break:keep-all;cursor:pointer">');
    		html.push(obj.KKMC);
    		html.push('</p>');
    		html.push('<label style="font-weight:normal;"><i class="fa fa-clock-o"></i>');
    		html.push(obj.JGSJ);
    		html.push('</label>');
    		html.push('</div>');
    		html.push('</div>');
    		$("#dtgjzs-search-result").append(html.join(""));
    	}
    }
	
    _f_.getParam = function(){
		var type = $("#dtgjzs-type").val();
		var ctype = "";
		if(type == "0"){
			
		}else{
			ctype = "";
		}
		
		_params.type = type;
		_params.ctype = ctype;
		
		var key = $("#dtgjzs-key").val();
		var startTime = Utils.formatDT2DT($("#dtgjzs-startTime").val());
		var stopTime = Utils.formatDT2DT($("#dtgjzs-endTime").val());
		
		_params.key = key;
		_params.startTime = startTime;
		_params.stopTime = stopTime;
		_params.nextRowkey = "";
		_params.pageSize = 1000;
	}
	
    	
    $("#dtgjzs_play_slider").ionRangeSlider({
        min: 0,
        max: 0,
        from: 0,
        grid: true
   });

    _playSlider = $("#dtgjzs_play_slider").data("ionRangeSlider");
    
    
    $("#dtgjzs-type").on("change", function(){
		var text = $("#dtgjzs-type option:selected").text();
		$("#dtgjzs-key").attr("placeholder", "选择输入" + text);
	});
    
	//点击时间文本框促发时间控制器
    $('#dtgjzs-startTime,#dtgjzs-endTime').on('click', function(){
        _f_.TimeClickBtn(this,'click');
    });
    
    $('#dtgjzs-startTime,#dtgjzs-endTime').on('blur', function(){
        _f_.TimeClickBtn(this,'blur');
    });
    
    $('#dtgjzs-startTime,#dtgjzs-endTime').on('keyup', function(){
        _f_.TimeClickBtn(this,'keyup');
    });
    
    /**
     * 加载时间控件
     */
    _f_.TimeClickBtn=function(element,event){
    	if(event == 'click'){
    		laydate({istime: true, elem: element, format: 'YYYY/MM/DD hh:mm:ss'});
    	}else if(event == 'blur'){
        	var reg=/^(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/;
            if($(element).val() !='' && !reg.test($(element).val())){
            	element.focus();
                Utils.notifyWarning("<span style='color:red'>"+"请检查输入格式，需精确到时分秒"+"</span>");
            }
    	}else if(event == 'keyup'){
            if($(element).val() !='' && $(element).val().length ==14){
            	$(element).val(Utils.formatDTString($(element).val()));
            }
    	}   	
    }    
    
    return {
    }


})();