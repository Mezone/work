<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>警卫大数据实战应用平台</title>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/static/images/favicon.png">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/typicons.min.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/animate.min.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/beyond.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/plugins/layui/css/layui.css" media="all">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/iconfont.css" media="all">

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/ol.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/popupoverlay.anim.css"/>
    <link href="http://vjs.zencdn.net/5.19/video-js.min.css" rel="stylesheet">

    <link rel="stylesheet"	 href="${pageContext.request.contextPath}/static/plugins/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
    
    <script type="text/javascript">var basePath = "${pageContext.request.contextPath}";</script>
</head>
<body>
<div class="navbar navbar-fixed-top" style="height: 53px;min-height: 53px;">
    <div class="navbar-inner" style="min-height: 53px;background-color: #2b84ea">
        <div class="navbar-container">
            <!-- Navbar Barnd -->
            <div class="navbar-header pull-left"  style="height: 53px; line-height:53px;   ">
                <img src="${pageContext.request.contextPath}/static/images/jw/logo-new.png" alt="时空间综查" style="height:41px;margin-top: -15px"/>
                <font style="font-size:28px;color: #ffffff; font-weight: bold; margin-left: 1px;font-family: 'Microsoft YaHei UI', 'Microsoft YaHei'">警卫大数据实战应用平台</font>
            </div>
            <!-- /Navbar Barnd -->
            <!-- Account Area and Settings --->
            <div class="navbar-header pull-right" >
                <div class="navbar-account" >
                    <ul class="account-area" style="height: 53px;min-height: 53px;" >
                        <li>
                            <a class="dropdown-toggle" data-toggle="dropdown" title="通知" href="javascript:;">
                                <i class="icon fa fa-bell"></i>
                            </a>
                            <ul class="pull-right dropdown-menu dropdown-arrow dropdown-notifications">
                                <h5 >当前没有通知消息</h5>
                            </ul>
                        </li>
                        <li>
                            <a class="login-area dropdown-toggle" data-toggle="dropdown">
                                <div class="avatar" title="View your public profile">
                                    <img id="user-icon" src="${pageContext.request.contextPath}/static/images/default_family.jpg">
                                </div>
                                <section style="padding-top:5px;">
                                    <h2><span class="profile"><span id="user-name">系统管理员</span></span></h2>
                                </section>
                            </a>
                            <!--Login Area Dropdown-->
                            <ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                                <!--/Theme Selector Area-->
                                <li class="edit">
                                    <a href="${pageContext.request.contextPath}/main/setting" class="pull-left">设置</a>
                                    <a href="${pageContext.request.contextPath}/passport/logout" class="pull-right">退出</a>
                                </li>
                            </ul>
                            <!--/Login Area Dropdown-->
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /Account Area and Settings -->
        </div>
    </div>
</div>
<!-- /Navbar -->
<!-- Main Container -->
<div class="main-container container-fluid" style="top:53px;">
    <!-- Page Container -->
    <div class="page-container">
        <!-- Page Sidebar -->
        <div class="page-sidebar menu-compact" id="sidebar" style="top: 0px;">
            <!-- Page Sidebar Header-->
            <div id="sidebar-collapse" class="sidebar-header-wrapper">
                <i class="collapse-icon fa fa-bars"></i>
            </div>
            <!-- /Page Sidebar Header -->
            <!-- Sidebar Menu -->
            <ul class="nav sidebar-menu">
                <li>
                    <a href='javascript:;' class="menu-dropdown"  id="qwgl" >
                        <i class="menu-icon iconfont icon-qinwuguanli"></i>
                        <span class="menu-text"> 勤务管理 </span>
                    </a>

                </li>
                <li>
                    <a href='javascript:;' class="menu-dropdown"  id="spjk" >
                        <i class="menu-icon iconfont icon-shipin"></i>
                        <span class="menu-text"> 视频监控 </span>
                    </a>

                </li>
                <li>
                    <a href="javascript:;" class="module-menu menu-dropdown"  id="yjdj"  >
                        <i class="menu-icon iconfont icon-hujiao"></i>
                        <span class="menu-text"> 一键点叫 </span>
                    </a>
                </li>

                <li>
                    <a href='javascript:;' class="menu-dropdown"   id="yqts"  >
                        <i class="menu-icon iconfont icon-yuqing"></i>
                        <span class="menu-text"> 舆情态势 </span>
                    </a>

                </li>

                <li>
                    <a href='javascript:;' class="menu-dropdown"    id="kjcx" >
                        <i class="menu-icon iconfont icon-dingwei"></i>
                        <span class="menu-text"> 空间查询 </span>
                    </a>

                </li>

                <li>
                    <a href="javascript:;" class="module-menu menu-dropdown"    id="bjgl" >
                        <i class="menu-icon iconfont icon-rybjhc"></i>
                        <span class="menu-text"> 背景管理 </span>
                    </a>
                </li>

                <li>
                    <a href='javascript:;' class="menu-dropdown"   id="gps">
                        <i class="menu-icon iconfont icon-mainicongps"></i>
                        <span class="menu-text"> GPS专题</span>
                    </a>

                </li>


                <li>
                    <a href='javascript:;' class="menu-dropdown"   id="nxgl">
                        <i class="menu-icon iconfont icon-nengxiaojiance"></i>
                        <span class="menu-text"> 效能管理 </span>
                    </a>

                </li>

            </ul>
            <!-- /Sidebar Menu -->
        </div>
        <!-- /Page Sidebar -->
        <!-- Page Content -->
        <div class="page-content">
            <div class="page-body">
                <div id="main-map" style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; box-shadow: 0 0 1px rgba(0,0,0,0.75);">
                </div>
            </div>
        </div>
        <!-- /Page Content -->
    </div>
</div>
<!-- Main Container -->

<div class="loading">
    <div class="loading-mask"></div>
    <div class="loading-info">
        <span>操作正在进行，请稍等...</span>
    </div>
</div>

<!-- Basic Scripts -->
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/beyond.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol.plugins.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/fontsymbol.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/fontawesome.def.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/shadowstyle.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/overlay/popupoverlay.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/featureanimation/featureanimation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/featureanimation/zoomanimation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/baidumap.js"></script>
<script src="http://vjs.zencdn.net/5.19/video.min.js"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/map.utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/app.utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/layui/layui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/zTree/js/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/index.js"></script>


</body>
</html>
