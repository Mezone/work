/**
 * 时间轴查询
 * Created by Administrator on 2017/1/18.
 */
module.sjzcx = (function(){
	
	var _f_ = {}, _params={}, _resultMap={}, _nextRowkey="";
	
	
	$("#sjzcx-search-btn").on("click", function(){
		_f_.getParam();
		if(_params.key == ''){
			var text = $("#sjzcx-type option:selected").text();
            Utils.notifyWarning("<span style='color:red'>"+"请输入" + text + "</span>");
            return;
		}
		if(_params.startTime =='' || _params.stopTime ==''){
            Utils.notifyWarning("<span style='color:red'>"+"请输入开始时间，结束时间"+"</span>");
        }
		
		 Utils.ajax(basePath + '/main/zhcx/sjzcx/gjcx', _params, function (data) {
			 _resultMap = {};
			 $(".jazz-timeline").html("");
			 var result = data.result;
//			 var nextRowkey = data.nextRowkey;
			 _params.nextRowkey = _nextRowkey = data.nextRowkey;
			 if(result.length == 0){
				 
			 }else{
				 //wifi recordtime dev_name
				 //car  JGSJ
				 for(var i=0; i<result.length; i++){
					 var obj = result[i];
					 var time = "";
					 if(obj.TYPE == "car"){
						 time = obj.JGSJ;
					 }else if(obj.TYPE == "wifi"){
						 time = obj.recordtime;
					 }
					 time = time.substring(0, 8);
					 if(_resultMap[time]){
						 
					 }else{
						 _resultMap[time] = obj.TYPE;
						 var html = [];
						html.push('<div class="timeline-post">')
			            html.push('<div class="timeline-meta for-large-icons">')
			            html.push('<div class="meta-details">'+time+'</div>')
			            html.push('</div> ')                
			            html.push('<div class="timeline-icon icon-larger iconbg-green icon-color-white">')
			            html.push('<div class="icon-placeholder">')
			            if(obj.TYPE == "car"){
				            html.push('<i class="fa  fa-video-camera"></i>')
			            }else if(obj.TYPE == "wifi"){
				            html.push('<i class="fa fa-rss"></i>')
			            }
			            html.push('</div>')
			            html.push(' <div class="timeline-bar"></div>')
			            html.push('</div>')
			            html.push('<div id="timeline-content-'+time+'" class="timeline-content">')
			            html.push('<div id="timeline-content-details-'+time+'" class="content-details">')
			            html.push('<div id="timeline-content-details-row-'+time+'" class="row">')
			            html.push('</div>')
			            html.push('</div>')
			            html.push('</div>')
			            html.push('</div>')
						$(".jazz-timeline").append(html.join(""));
					 }
				 }
				 
				 for(var i=result.length-1; i>-1; i--){
					 var obj = result[i];
					 var time = "";
					 if(obj.TYPE == "car"){
						 time = obj.JGSJ;
					 }else if(obj.TYPE == "wifi"){
						 time = obj.recordtime;
					 }
					 time = time.substring(0, 8);
					 var html = [];
					 if($("#timeline-content-details-row-" + time).children().length > 0){
						 html.push("<div class='col-md-1'  style='font-size: 60px; height: 60px; color: rgb(64, 164, 192); text-align: center; padding-top:20px;margin-top:5px;margin-bottom:5px'>→</div>");
					 }
					 html.push("<div class='col-md-2' style='height: 60px; padding-left:0px;padding-right:0px;border:1px solid #e0e0e0;text-align:center;padding-top:5px;margin-top:5px;margin-bottom:5px' >");
					 if(obj.TYPE == "car"){
						 html.push(obj.KKMC + "<br>" + Utils.formatDTString(obj.JGSJ));
		             }else if(obj.TYPE == "wifi"){
						 html.push(obj.dev_name + "<br>" + Utils.formatDTString(obj.recordtime));
		             }					 
					 html.push("</div>");
					 $("#timeline-content-details-row-" + time).append(html.join(""));
				 }
				 if(_nextRowkey != ""){
					 layui_flow.load({
						    elem: '#skrollr-body-parent', 
						    scrollElem: '#skrollr-body-parent', 
						    loadelem: '#skrollr-body-parent', 
						    isLazyimg: false,
						    done: function(page, next){ 
						    	_f_.loadMore(next);
						    	 console.log(page);
						    }
						});
				 }
				 
					
				 
			 }
		 });
	});
	
	
	_f_.loadMore = function(callback){
		 Utils.ajax(basePath + '/main/zhcx/sjzcx/gjcx', _params, function (data) {

			 var result = data.result;
//			 var nextRowkey = data.nextRowkey;
			 _params.nextRowkey = _nextRowkey = data.nextRowkey;
			 if(result.length == 0){
				 
			 }else{
				 //wifi recordtime dev_name
				 //car  JGSJ
				 for(var i=0; i<result.length; i++){
					 var obj = result[i];
					 var time = "";
					 if(obj.TYPE == "car"){
						 time = obj.JGSJ;
					 }else if(obj.TYPE == "wifi"){
						 time = obj.recordtime;
					 }
					 time = time.substring(0, 8);
					 if(_resultMap[time]){
						 
					 }else{
						 _resultMap[time] = obj.TYPE;
						 var html = [];
						html.push('<div class="timeline-post">')
			            html.push('<div class="timeline-meta for-large-icons">')
			            html.push('<div class="meta-details">'+time+'</div>')
			            html.push('</div> ')                
			            html.push('<div class="timeline-icon icon-larger iconbg-green icon-color-white">')
			            html.push('<div class="icon-placeholder">')
			            if(obj.TYPE == "car"){
				            html.push('<i class="fa  fa-video-camera"></i>')
			            }else if(obj.TYPE == "wifi"){
				            html.push('<i class="fa fa-rss"></i>')
			            }
			            html.push('</div>')
			            html.push(' <div class="timeline-bar"></div>')
			            html.push('</div>')
			            html.push('<div id="timeline-content-'+time+'" class="timeline-content">')
			            html.push('<div id="timeline-content-details-'+time+'" class="content-details">')
			            html.push('<div id="timeline-content-details-row-'+time+'" class="row">')
			            html.push('</div>')
			            html.push('</div>')
			            html.push('</div>')
			            html.push('</div>')
						$(".jazz-timeline").append(html.join(""));
					 }
				 }
				 
				 for(var i=result.length-1; i>-1; i--){
					 var obj = result[i];
					 var time = "";
					 if(obj.TYPE == "car"){
						 time = obj.JGSJ;
					 }else if(obj.TYPE == "wifi"){
						 time = obj.recordtime;
					 }
					 time = time.substring(0, 8);
					 var html = [];
					 if($("#timeline-content-details-row-" + time).children().length > 0){
						 html.push("<div class='col-md-1'  style='font-size: 60px; height: 60px; color: rgb(64, 164, 192); text-align: center; padding-top:20px;margin-top:5px;margin-bottom:5px'>→</div>");
					 }
					 html.push("<div class='col-md-2' style='height: 60px; padding-left:0px;padding-right:0px;border:1px solid #e0e0e0;text-align:center;padding-top:5px;margin-top:5px;margin-bottom:5px' >");
					 if(obj.TYPE == "car"){
						 html.push(obj.KKMC + "<br>" + Utils.formatDTString(obj.JGSJ));
		             }else if(obj.TYPE == "wifi"){
						 html.push(obj.dev_name + "<br>" + Utils.formatDTString(obj.recordtime));
		             }
					 html.push("</div>");
					 $("#timeline-content-details-row-" + time).append(html.join(""));
				 }
			 }
			 setTimeout(function(){
				 callback("", _nextRowkey == "");
				}, 500);
		 });
		
	}
	
	_f_.getParam = function(){
		var type = $("#sjzcx-type").val();
		var ctype = "";
		if(type == "0"){
			
		}else{
			ctype = "";
		}
		
		_params.type = type;
		_params.ctype = ctype;
		
		var key = $("#sjzcx-key").val();
		var startTime = Utils.formatDT2DT($("#sjzcx-startTime").val());
		var stopTime = Utils.formatDT2DT($("#sjzcx-endTime").val());
		
		_params.key = key;
		_params.startTime = startTime;
		_params.stopTime = stopTime;
		_params.nextRowkey = "";
	}
	

	$("#sjzcx-type").on("change", function(){
		var text = $("#sjzcx-type option:selected").text();
		$("#sjzcx-key").attr("placeholder", "选择输入" + text);
	});
	
	
	//点击时间文本框促发时间控制器
    $('#sjzcx-startTime,#sjzcx-endTime').on('click', function(){
        _f_.TimeClickBtn(this,'click');
    });
    
    $('#sjzcx-startTime,#sjzcx-endTime').on('blur', function(){
        _f_.TimeClickBtn(this,'blur');
    });
    
    $('#sjzcx-startTime,#sjzcx-endTime').on('keyup', function(){
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

