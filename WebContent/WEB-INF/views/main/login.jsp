<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<!--
Beyond Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3
Version: 1.0.0
Purchase: http://wrapbootstrap.com
-->

<html xmlns="http://www.w3.org/1999/xhtml">
<!--Head-->
<head>
    <meta charset="utf-8" />
    <title>Login Page</title>

    <meta name="description" content="login page" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="assets/img/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/plugins/layui/css/layui.css" media="all">

    <!--Basic Styles-->
    <link href="${pageContext.request.contextPath}/static/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/static/css/font-awesome.min.css" rel="stylesheet" />

    <!--Fonts-->

    <!--Beyond styles-->
    <link id="beyond-link" href="${pageContext.request.contextPath}/static/css/beyond.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/static/css/animate.min.css" rel="stylesheet" />
    <link id="skin-link" href="" rel="stylesheet" type="text/css" />

    <!--Skin Script: Place this script in head to load scripts for skins and rtl support-->
    <style type="text/css">
    	.loginbox {
    		height:250px
    	}
    </style>
        <script type="text/javascript">var basePath = "${pageContext.request.contextPath}";</script>
    
</head>
<!--Head Ends-->
<!--Body-->
<body>
    <div class="login-container animated fadeInDown">
        <div class="loginbox bg-white" style="height:250px">
            <div class="loginbox-title">登录</div>
            <div class="loginbox-or">
                <div class="or-line"></div>
            </div>
            <div class="loginbox-textbox">
                <input id="userid" type="text" class="form-control" placeholder="用户名" />
            </div>
            <div class="loginbox-textbox">
                <input  id="password" type="password" class="form-control" placeholder="密码" />
            </div>
            <div class="loginbox-submit">
                <input id="login" type="button" class="btn btn-primary btn-block" value="登录">
            </div>
        </div>
    </div>

    <!--Basic Scripts-->
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-2.1.3.min.js"></script>
    <script src="${pageContext.request.contextPath}/static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/app.utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/layui/layui.js"></script>

    <!--Beyond Scripts-->
    <script src="${pageContext.request.contextPath}/static/js/beyond.js"></script>

    <!--Google Analytics::Demo Only-->
    <script>
    
	    var layer, laydate, layui_page, layui_flow;
	    layui.use(['layer', 'laydate', 'laypage', 'flow'], function(){
	    	  layer = layui.layer;
	    	  laydate = layui.laydate;
	    	  layui_page = layui.laypage;
	    	  layui_flow = layui.flow;
	    });
	    
	    $("#login").click(function(){
	    	if($("#userid").val() == ""){
	    		Utils.bsErrorHtml("请输入用户名");
	    		return;
	    	}
	    	if($("#password").val() == ""){
	    		Utils.bsErrorHtml("请输入密码");
	    		return;
	    	}
	    	
	    	var param = {userid: $("#userid").val(), password: $("#password").val()};
	    	login(param)
	    });
	    
	    function login(param){
	    	Utils.ajax (basePath + "/passport/login", param, function(data){
	    		window.location = basePath + "/main/";
	    	});

	    }
	    
	    
    </script>
</body>
<!--Body Ends-->
</html>
