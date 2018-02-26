<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>错误</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <style type="text/css">
        html, body{
            padding: 0;
            margin: 0;
        }

        body {
            font-family: "Microsoft Yahei", "微软雅黑", "宋体", Tahoma, Arial;
            font-size: 14px;
            overflow: auto;
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
            <h1>很抱歉，您要访问的页面发生异常！</h1>
        </div>
        <div class="error-body">
            <% Exception ex = (Exception) request.getAttribute("Exception"); %>
            <%=ex.getMessage()%>
        </div>
    </div>
</div>
</body>
</html>
