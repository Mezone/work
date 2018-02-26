<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>登录 -- 南通市公安局时空间综查和分析系统</title>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/static/images/favicon.png" >
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/beyond.css"/>
    <script type="text/javascript">
        var basePath = "${pageContext.request.contextPath}";
        if (!(window.navigator.userAgent.toLowerCase().match(/chrome/) != null)) {
            location.href = basePath + '/static/html/browersuggest.html';
        }
    </script>
    <style type="text/css">
        html, body{
            width: 100%;
            height: 100%;
            font-size: 14px;
            color: #333;
            overflow-y: auto;
            margin: 0;
            padding: 0;
        }

        .wrapper{
            width: 1150px;
            margin: 0 auto;
        }

        .login-form{
            position: absolute;
            right: 40px;
            top: 80px;
            width:350px;
            padding: 20px;
            border-radius: 2px;
            background-color: #fff;
        }

        .login-form .login-box{
            padding: 8px 0;
        }

        .login-links{
            text-align: right;
        }

        .login-links a{
            font-size: 14px;
            color: #5c5c5c;
        }

        .footer {
            padding: 10px;
            color: #333;
            text-align: center;
        }

        .footer .split{
            margin: 0 10px;
        }

        .footer a{
            text-decoration: none;
        }

    </style>
</head>
<body onload="init();">

<div class="wrapper header">
    <img src="${pageContext.request.contextPath}/static/images/login_logo.png"/>
</div>

<div class="form-container" style="background-color: #2b84ea; padding: 30px 0">
    <div class="wrapper" style="position: relative;">
        <div>
            <img src="${pageContext.request.contextPath}/static/images/login_index_1.png" width="580" height="580"/>
        </div>
        <form onsubmit="login();return false;" class="login-form">
            <div class="login-box">
                <div style="font-size: 30px; font-weight: bold; text-align: center;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
            </div>
            <div class="login-box">
                <input type="text" class="form-control" id="username" placeholder="用户名" value=""/>
            </div>
            <div class="login-box">
                <input type="password" class="form-control" id="password" placeholder="密码" value=""/>
            </div>
            <div class="login-box">
                <button type="submit" class="btn btn-primary btn-block" style="background-color: #2b84ea;">登&nbsp;&nbsp;录</button>
            </div>
            <div class="login-box login-links" >
                <a href="${pageContext.request.contextPath}/static/html/contactus.html" target="_blank">联系我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="${pageContext.request.contextPath}/static/html/softdownload.html" target="_blank">软件下载</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="${pageContext.request.contextPath}/static/html/help.html" target="_blank">操作手册</a>
            </div>
            <div id="login-info"></div>
        </form>
    </div>
</div>

<div class="footer">
    版权所有：江苏省南通市公安局信息中心<span class="split">|</span>技术支持：方正国际软件（北京）有限公司<span class="split">|</span>为了提升用户体验,请使用&nbsp;<a href="#">Chrome浏览器</a>
</div>

<div class="loading">
    <div class="loading-mask"></div>
    <div class="loading-info">
        <span>操作正在进行，请稍等...</span>
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/md5.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/app.utils.js"></script>

<script type="text/javascript">
    var back = '${back}';
    function login() {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username == "" || password == "") {
            $('#login-info').html('<span style="color: red;">用户名和密码不可为空</span>');
            return;
        }
        $.ajax({
            type: 'post',
            url: basePath + '/passport/login',
            dataType: 'json',
            data: {
                username: username,
                password: password,
                rt: 'json',
                time: new Date().getTime()
            },
            success: function (result) {
                if (result.code == 0) {
                    //登陆成功，跳转到index页面
                    if(back != ""){
                        location.href = back;
                    }else{
                        location.href = basePath;
                    }
                } else {
                    //登陆失败、
                    $('#login-info').html('<span style="color: red;">' + result.data + '</span>');
                }
            },
            error: function () {
                $('#login-info').html('<span style="color: red;">网络异常</span>');
            }
        });
    }

    function init() {
        $("#username").focus();
    }
</script>
</body>
</html>
