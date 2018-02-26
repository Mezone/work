<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String wspath = request.getServerName()+":"+request.getServerPort()+path;
	
	String jlbh =  request.getParameter("jlbh");
	
%>
<!DOCTYPE HTML>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>车辆布控预警</title>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/static/images/favicon.png">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/bootstrap.min.css"/>
        <link id="beyond-link" href="${pageContext.request.contextPath}/static/css/beyond.min.css" rel="stylesheet" />
    
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/font-awesome.min.css"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/ol.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/popupoverlay.anim.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/plugins/layui/css/layui.css" media="all">
    
    <link rel="stylesheet"	 href="${pageContext.request.contextPath}/static/plugins/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
    
    
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/plugins/bootstraptable/bootstrap-table.css">
       <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/component.css">
       <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/index.css"/>
   
     <script type="text/javascript">
    	var basePath = "${pageContext.request.contextPath}";
    	var wsPath = '<%=wspath %>';
    	var jlbh = '<%=jlbh %>';
    	console.log(jlbh);
    </script>
    
    <style>
    	.bordered-linered {
    		    border-color: #ff0000 !important
    	}
    	
    	.databox-cell{
    		color: #ff0000 !important;
    		padding-top: 3px !important;
    		padding-bottom: 3px !important;
    	}
    	
    </style>
</head>
<body>
	<div class="databox" style="position: absolute; background-color:#000; height:100%; width:250px; top: 0px; left: 0px;   bottom: 0px;  box-shadow: 0 0 1px rgba(0,0,0,0.75);overflow:hidden;text-align: center;padding-top: 5px">
		<label style="color: #fff; font-size: 30px" id="jczmc">检查站名称</label>
		<div class="databox-row no-padding no-margin-top" >
		 	<div class="databox-cell cell-12 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 30px;font-weight: bold;">
               		 今日值班
            </div>
            <div class="databox-cell cell-12 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 26px;font-weight: bold;">
               		 带班领导
            </div>
            <div class="databox-cell cell-5 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;font-weight: bold;">
               		 姓名
            </div>
             <div class="databox-cell cell-7 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 22px;font-weight: bold;" id="before_dbld">
               		联系电话
            </div>
            
            <div class="databox-cell cell-12 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 26px;font-weight: bold;">
               		值班民警
            </div>
            <div class="databox-cell cell-5 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;font-weight: bold;">
               		 姓名
            </div>
             <div class="databox-cell cell-7 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 22px;font-weight: bold;" id="before_zbmj">
               		联系电话
            </div>
            <div class="databox-cell cell-12 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 30px;font-weight: bold;color:#ffce55!important;">
               		 今日过车
            </div>
            <div class="databox-cell cell-6 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;font-weight: bold;color:#ffce55!important;">
               		过车总数
            </div>
             <div class="databox-cell cell-6 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 22px;font-weight: bold;color:#ffce55!important;" id="before_jrgc">
               		今日稽查
            </div>
             <div class="databox-cell cell-12 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 30px;font-weight: bold;color:#1f9e0e!important" id="before_spck">
               		视频查看
            </div>
            
            <div class="databox-cell cell-4 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;color:#1f9e0e!important;">
               		站内
            </div>
            <div class="databox-cell cell-4 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;color:#1f9e0e!important;">
               		站外
            </div>
            <div class="databox-cell cell-4 no-padding text-align-center bordered-bottom  bordered-linered" style="font-size: 22px;color:#1f9e0e!important;">
               		周边
            </div>
        </div>
		
		
	</div>
	<div  style="position: absolute; top: 0px; left: 250px; right: 0px;  bottom: 0px;  box-shadow: 0 0 1px rgba(0,0,0,0.75);overflow:hidden">
		<iframe style="width:100%;height:100%" src="http://720yun.com/t/2bcjOremkf8" frameborder="no"> </iframe>
	</div>
<!-- Basic Scripts -->
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/beyond.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/app.utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/map.utils.js"></script>
<script type="text/javascript">
	Utils.ajax (basePath + "/app/selectSjdtLeftInfo", {jczbh: jlbh}, function(data){
		console.log(data);
		var jczinfo = data.jczinfo;
		$("#jczmc").text(jczinfo.mc);
		var zbry = data.zbry;
		var zbldHtml = [];
		var zbmjHtml = [];
		for(var i=0; i<zbry.length; i++){
			var obj = zbry[i];
			if(obj.zbrlx == 0){
				zbldHtml.push('<div class="databox-cell cell-5 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;height:40px">');
				zbldHtml.push(obj.zbrxm);
          		zbldHtml.push('</div>');
          		zbldHtml.push('<div class="databox-cell cell-7 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 24px;height:40px">');
          		zbldHtml.push(obj.zbrdh);
		        zbldHtml.push('</div>');
			}else{
				zbmjHtml.push('<div class="databox-cell cell-5 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;height:40px">');
				zbmjHtml.push(obj.zbrxm);
				zbmjHtml.push('</div>');
				zbmjHtml.push('<div class="databox-cell cell-7 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 24px;height:40px;">');
				zbmjHtml.push(obj.zbrdh);
				zbmjHtml.push('</div>');
			}
		}
		console.log(zbldHtml.join(""));
		 $(zbldHtml.join("")).insertAfter("#before_dbld");
		 $(zbmjHtml.join("")).insertAfter("#before_zbmj");
		 
		 var gclj = data.jrgc;
		 var jrgcHtml = [];
		 jrgcHtml.push('<div class="databox-cell cell-6 no-padding text-align-center bordered-bottom  bordered-right bordered-linered" style="font-size: 22px;color:#ffce55!important;">');
		 jrgcHtml.push(gclj.gczs);
   		 jrgcHtml.push('</div>');
   		 jrgcHtml.push('<div class="databox-cell cell-6 no-padding text-align-center bordered-bottom bordered-linered" style="font-size: 22px;color:#ffce55!important;" >');
   		 jrgcHtml.push(gclj.jrjc);
   		 jrgcHtml.push('</div>)');
		 $(jrgcHtml.join("")).insertAfter("#before_jrgc");

	});
</script>
</body>
</html>
