<%@ page language="java" pageEncoding="UTF-8" isErrorPage="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
        html, body {
            font-family: "Microsoft Yahei", "微软雅黑", "宋体", Tahoma, Arial;
            font-size: 14px;
            overflow: hidden;
            padding: 0;
            height: 100%;
            width: 100%;
        }

        body{
            overflow: auto;
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
            错误：${pageContext.exception}
            <br/>
            <div style="padding: 5px 0">异常信息：</div>
            <c:forEach var="trace" items="${pageContext.exception.stackTrace}">
                <div>${trace}</div>
            </c:forEach>
        </div>
    </div>
</div>
</body>
</html>
