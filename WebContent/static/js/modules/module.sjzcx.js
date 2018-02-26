/**
 * 时间轴查询
 * Created by Administrator on 2017/1/18.
 */
module.sjzcx = (function(){
	
	var _f_ = {}, _params={};
	
	
	$("#sjzcx-search-btn").on("click", function(){
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
		if(_params.key == ''){
			var text = $("#sjzcx-type option:selected").text();
            Utils.notifyWarning("<span style='color:red'>"+"请输入" + text + "</span>");
            return;
		}
		if(_params.startTime =='' || _params.stopTime ==''){
            Utils.notifyWarning("<span style='color:red'>"+"请输入开始时间，结束时间"+"</span>");
        }
		
		 Utils.ajax(basePath + '/main/zhcx/sjzcx/gjcx', _params, function (data) {
			 console.log(data);
		 });
	});
	
	
	function test(){
		for(var i=0; i< 20; i++){
			var html = [];
				html.push('<div class="timeline-post">')
             html.push('<div class="timeline-meta for-large-icons">')
            	 html.push('<div class="meta-details">Pierre Morgul</div>')
             html.push('</div> ')                
             html.push('<div class="timeline-icon icon-larger iconbg-green icon-color-white">')
            	 html.push('<div class="icon-placeholder">Feb <span>14</span></div>')
                html.push(' <div class="timeline-bar"></div>')
             html.push('</div>')
             html.push('<div class="timeline-content">')
			html.push('<h2 class="content-title"> V   Day </h2>')
                 html.push('<div class="content-details">')
                     html.push('<p>ssssssssssssssssssss</p>')
                 html.push('</div>')
             html.push('</div>')
         html.push('</div>')
			$(".jazz-timeline").append(html.join(""));
			
			console.log(html.join(""));
		 }
		 
		// s.refresh()
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

