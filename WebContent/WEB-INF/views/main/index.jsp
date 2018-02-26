<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String wspath = request.getServerName()+":"+request.getServerPort()+path;
	
	String x =  request.getParameter("x");
	if(x == null){
		x = "";
	}
	
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
    	var lj = '<%=x %>';
    </script>
</head>
<body>
<header class="navbar navbar-static-top bs-docs-nav" style="background-color: #1D7AD9;height:44px" >
  <div style="margin-left: 0px;height:44px;text-align: center;width:100%">
    <img alt="" src="${pageContext.request.contextPath}/static/images/logo.png">
  </div>
</header>
<div  id="main" style="position: absolute; top: 44px; left: 0px; right: 0px;  bottom: 0px;  box-shadow: 0 0 1px rgba(0,0,0,0.75);overflow:hidden">
	<div  id="main-map" class="map" style="position: absolute; top: 0px; left: 0px; right: 0px;  bottom: 0px; ">
	</div>
</div>

<div class="cbp-spmenu cbp-spmenu-horizontal cbp-spmenu-bottom" id="bottom-menu" style="background-color: #e6e6e6"> 
	<table id="bkxx-table" class="layui-table" lay-filter="bkxx-table" ></table>
</div>
<script type="text/html" id="bkxx_cphm_href">
	<a  lay-event="view-clxx" style="text-decoration:underline;cursor:pointer" >{{d.hphm}}</a>
</script>
<script type="text/html" id="bkxx_list_bar">
<a class="layui-btn layui-btn-xs" lay-event="view-gj" title="近一小时该车历时轨迹">查看行驶轨迹</a>
<a class="layui-btn layui-btn-xs" lay-event="view-zp">查看过车照片</a>
<!--a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="view-ljq">查看拦截圈</a-->
</script>
		
<div id="ztzy-widget" style="position: absolute; width:400px;background-color: #fff;display:none;padding:10px">
             
                <div class="col-lg-6 col-sm-6 col-xs-6">
                             <div class="checkbox">
                                 <label>
                                     <input id="zy-spjk" type="checkbox" class="colored-blue" >
                                     <span class="text">视频监控</span>
                                 </label>
                             </div>
                         </div>
                         <div class="col-lg-6 col-sm-6 col-xs-6">
                       <div class="checkbox">
                           <label>
                               <input  id="zy-jcz" type="checkbox" class="colored-blue" >
                               <span class="text">检查站</span>
                           </label>
                       </div>
                   </div>
                   <div class="col-lg-6 col-sm-6 col-xs-6">
                       <div class="checkbox">
                           <label>
                               <input  id="zy-kk" type="checkbox" class="colored-blue" >
                               <span class="text">卡口</span>
                           </label>
                       </div>
                   </div>
                   <div class="col-lg-6 col-sm-6 col-xs-6">
                       <div class="checkbox">
                           <label>
                               <input id="zy-gps" type="checkbox" class="colored-blue" >
                               <span class="text">实时警力</span>
                           </label>
                       </div>
                   </div>
                   <hr style="height:3px;color: #555555">
                   		<div class="buttons-preview" style="text-align: center;" id="kjcx-button">
                                 <a href="javascript:void(0);" class="btn btn-primary" type="Circle">画圆</a>
                                 <a href="javascript:void(0);" class="btn btn-info"  type="Box">拉框</a>
                                 <a href="javascript:void(0);" class="btn btn-success"  type="Polygon">多边形</a>
                                 <a href="javascript:void(0);" class="btn btn-default"  type="Clear">清除</a>
                        </div>
                          <hr style="height:3px;color: #555555">
                          <div style="width:100%;">
                          	<div class="col-lg-6 col-sm-6 col-xs-6">
                        <div class="checkbox">
                            <label>
                                <input id="clyj-checkbox" type="checkbox" class="colored-blue" >
                                <span class="text">启动预警</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-6 col-xs-6">
                        <div class="checkbox">
                            <label>
                                <input id="jczzb-checkbox" type="checkbox" class="colored-blue" >
                                <span class="text">周边资源</span>
                            </label>
                        </div>
                    </div>
		   	  	</div>
	     </div>
<div style="position: absolute;top:59px;right: 140px">
 	<button id="map_plot"  class="btn" style="height:36px;line-heigt:36px;background-color: #252525;opacity: 0.7;border: none;color:#fff;font-weight: bold;" ><i class="map_plot_i"></i>地图标绘</button>		
</div>
<div id="polt_form" style="width:100%;display:none" class="form-horizontal">
      <div class="form-group col-sm-6 no-padding-right padding-left-5" >
          <label for="polt_colorpicker" class="col-sm-6 control-label no-padding-right padding-left-5">边框颜色</label>
          <div class="col-sm-6 no-padding-right padding-left-5">
               <input type="text" id="polt_stroke_colorpicker" class="form-control colorpicker" data-defaultvalue="#ff0000">
          </div>
      </div>
      <div class="form-group col-sm-6 no-padding-right padding-left-5" >
          <label for="polt_colorpicker" class="col-sm-6 control-label no-padding-right padding-left-5">宽度</label>
          <div class="col-sm-6 no-padding-right padding-left-5">
          		<select class="form-control" id="polt_stroke_width">
          			<option value="1" selected>1px</option>
          			<option value="2">2px</option>
          			<option value="3">3px</option>
          			<option value="4">4px</option>
          			<option value="5">5px</option>
          			<option value="6">6px</option>
          			<option value="7">7px</option>
          			<option value="8">8px</option>
          			<option value="9">9px</option>
          			<option value="10">10px</option>
          		</select>
          </div>
      </div>
      <div class="form-group col-sm-6 no-padding-right padding-left-5" >
          <label for="polt_colorpicker" class="col-sm-6 control-label no-padding-right padding-left-5">填充颜色</label>
          <div class="col-sm-6 no-padding-right padding-left-5">
               <input type="text" id="polt_fill_colorpicker" class="form-control colorpicker" data-defaultvalue="#ff00ff">
          </div>
      </div>
      <div class="form-group col-sm-6 no-padding-right padding-left-5" >
          <label for="polt_colorpicker" class="col-sm-6 control-label no-padding-right padding-left-5">透明度</label>
          <div class="col-sm-6 no-padding-right padding-left-5">
          		<select class="form-control" id="polt_fill_opacity">
          			<option value=".1" >10%</option>
          			<option value=".2">20%</option>
          			<option value=".3">30%</option>
          			<option value=".4" selected>40%</option>
          			<option value=".5">50%</option>
          			<option value=".6">60%</option>
          			<option value=".7">70%</option>
          			<option value=".8">80%</option>
       			    <option value=".9">90%</option>
       			    <option value="1">100%</option>
          			
          		</select>
          </div>
      </div>
      <div class="form-group col-sm-12 no-padding-right padding-left-5" >
          <label for="polt_colorpicker" class="col-sm-3 control-label no-padding-right padding-left-5">文字内容</label>
          <div class="col-sm-8 no-padding-right padding-left-5">
               <input type="text" id="polt_text" class="form-control" data-defaultvalue="#ff00ff">
          </div>
      </div>
      <div class="form-group col-sm-6 no-padding-right padding-left-5"  >
          <label for="polt_colorpicker" class="col-sm-6 control-label no-padding-right padding-left-5">文字大小</label>
          <div class="col-sm-6 no-padding-right padding-left-5">
               <select class="form-control" id="polt_text_size">
          			<option value="10" >10</option>
          			<option value="12">12</option>
          			<option value="14">14</option>
          			<option value="16" selected>16</option>
          			<option value="18">18</option>
          			<option value="20">20</option>
          			<option value="22">22</option>
          			<option value="24">24</option>
       			    <option value="26">26</option>
       			    <option value="28">28</option>
          		</select>
          </div>
      </div>
      <div class="form-group col-sm-6 no-padding-right padding-left-5" >
          <label for="polt_colorpicker" class="col-sm-6 control-label no-padding-right padding-left-5">文字颜色</label>
          <div class="col-sm-6 no-padding-right padding-left-5">
          	<input type="text" id="polt_text_color" class="form-control colorpicker" data-defaultvalue="#0000ff">
          </div>
      </div>
      <div class="form-group col-sm-12" style="text-align:center" id="polt_drawtype">
      		<img id="collArrow" src="static/images/toolbarimg/icon_1arrow02.png" type="squadcombat" height="20" style="cursor:pointer" title="单箭头">
		 	<img id="collDoubleArrow" src="static/images/toolbarimg/icon_2arrow02.png" type="doublearrow"  height="20"  style="cursor:pointer;margin-left:4px"  title="双箭头">
		 	<img id="collCurveline" src="static/images/toolbarimg/icon_arc02.png" type="arc"  height="20"   style="cursor:pointer;margin-left:4px" title="弧线">
		 	<img id="collRallying" src="static/images/toolbarimg/icon_jujidi02.png" type="gatheringplace"   style="cursor:pointer;margin-left:4px" height="20"  title="聚集地">
			<img id="addpoint" src="static/images/toolbarimg/icon_dot02.png" type="marker" height="20"  style="cursor:pointer;margin-left:4px" title="标注点">
		 	<img id="addline" src="static/images/toolbarimg/icon_line02.png" type="polyline" height="20"  style="cursor:pointer;margin-left:4px" title="画线">
		 	<img id="addploy" src="static/images/toolbarimg/icon_reg02.png" type="polygon"  height="20"  style="cursor:pointer;margin-left:4px" title="多边形">
		 	<img id="addText" src="static/images/toolbarimg/icon_text02.png" type="text" height="20"  style="cursor:pointer;margin-left:4px" title="文本">
		 	<img id="clearImg" src="static/images/toolbarimg/clear.jpg"  type="clear" height="20"  style="cursor:pointer;margin-left:4px" title="清除">
      </div>
</div>
<!-- Basic Scripts -->
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/beyond.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/ol3-plot/p-ol3.debug.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol.plugins.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/fontsymbol.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/fontawesome.def.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/fontmaki.def.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/iconfont.def.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/style/shadowstyle.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/overlay/popupoverlay.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/featureanimation/featureanimation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/ol-plugins/featureanimation/zoomanimation.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/beyond.js"></script>
<script src="${pageContext.request.contextPath}/static/plugins/bootstraptable/bootstrap-table.js"></script>
<script src="${pageContext.request.contextPath}/static/plugins/bootstraptable/bootstraptable-treeview.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/layui/layui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/zTree/js/jquery.ztree.all.min.js"></script>
<script src="${pageContext.request.contextPath}/static/plugins/spinner/fuelux.spinner.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/classie.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/turf/turf.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/plugins/colorpicker/jquery.minicolors.js"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/app.utils.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/map.utils.js"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/index.js"></script>


</body>
</html>
