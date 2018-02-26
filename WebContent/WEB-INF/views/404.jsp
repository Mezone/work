<%@ page language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>错误 </title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
<style type="text/css">
    html, body {
        font-family: "Microsoft Yahei", "微软雅黑", "宋体", Tahoma, Arial;
        font-size: 14px;
        overflow: hidden;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    .main-container{
        width: 1100px;
        margin: 20px auto;
    }

    .error-header{
        border-bottom: 1px solid #DEDEDE;
    }

    .error-body{
        padding-top: 10px;
    }

    .error-body span{
        display: block;
        margin: 5px 0;
    }

</style>
</head>

<body>
<div class="main-container">
    <div class="error-content">
        <div class="error-header">
            <h1>很抱歉，您要访问的页面不存在！</h1>
        </div>
        <div class="error-body">
            <span>温馨提示：</span>
            <span>1. 请检查您访问的网址是否正确</span>
            <span>2. 返回 <a href="<%=basePath%>">首页</a> 重新操作</span>
            <span>3. 如果仍然出现当前页面，请联系管理员</span>
        </div>
    </div>
</div>
</body>
</html>
