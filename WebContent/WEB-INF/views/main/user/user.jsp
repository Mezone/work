<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/12/12 0012
  Time: 下午 4:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>
.ztree {
    overflow: auto;
    margin: 0;
    _margin-top: 10px;
    padding: 10px 0 0 10px;
}

</style>
<div class="row-fluid">
	<div id="user_left" class="accordion-group" style="width: 180px; height: 100%;float: left">
		<div class="accordion-heading">
	    	<a class="accordion-toggle"  title="">组织机构</a>
	    </div>
	    		<ul id="user_left_org_tree" class="ztree" style="padding: 10px 0 0 10px;"></ul>
	</div>
	<div id="user_right" style="width: 160px; height: 100%;float: left;margin-left:20px">
		<div class="tabbable">
	        <ul class="nav nav-tabs tabs-flat" id="myTab11">
	            <li class="active">
	                <a data-toggle="tab" href="#user_list_panel">
	                    	用户列表
	                </a>
	            </li>
	            <li class="">
	                     <a data-toggle="tab" href="#user_add_panel">
	                         	添加用户
	                     </a>
	             </li>
	        </ul>
	        <div class="tab-content tabs-flat">
                 <div id="user_list_panel" class="tab-pane active">
                     <div style="left:0; top: 15px; right:0; background-color: #f5f5f5;border-radius: 4px;padding: 8px 5px;">
                     	<div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <span class="input-icon icon-right">
                                        <input id="user_userid" type="text" class="form-control" placeholder="登录名">
                                    </span>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <span class="input-icon icon-right">
                                        <input id="user_name" type="text" class="form-control" placeholder="姓名">
                                    </span>
                                </div>
                            </div>
                        </div>
                     	<div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <span class="input-icon icon-right">
                                        <input  id="user_phone" type="text" class="form-control" placeholder="手机号码">
                                    </span>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <span class="input-icon icon-right">
                                        <input  id="user_idcard"  type="text" class="form-control" placeholder="身份证">
                                    </span>
                                </div>
                            </div>
                             <div class="col-sm-6">
                                <input  id="user_hiddden_orgcode"  type="hidden">
                                <input  id="user_hiddden_orgjb"  type="hidden" >
                                
                             	<input id="user_query_click_button" class="btn btn-primary" type="submit" value="查询">
                             	<input id="user_query_reset_button" class="btn btn-primary" type="submit" value="重置" >
                            </div>
                        </div>
                     </div>
                     <div style="margin-top: 20px">
                        	<table class="layui-hide" id="user_list" lay-filter="user_list"></table>
                        </div>
                 </div>

                 <div id="user_add_panel" class="tab-pane">
                 	<div class="col-lg-6 col-sm-9 col-xs-12">
                      <div id="user_add_form" style="overflow-y: auto;overflow-x: hidden">
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	  <label for="user_add_name">姓名<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="user_add_name" class="form-control" placeholder="姓名">
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                           <label for="user_add_userid">用户名<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="user_add_userid" class="form-control" placeholder="用户名">
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	 <label for="user_add_password">密码<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="user_add_password" class="form-control" placeholder="密码">
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	 <label for="user_add_org_panel">单位<span style="color: red">*</span></label>
                                      	 <div class="input-group" id="user_add_org_panel">
						                    <input type="text" value="" id="user_add_orgname" class="form-control" style="border-radius: 4px 0px 0px 4px !important; cursor: allowed;"   disabled="disabled" />
						                   	 <input type="hidden" value="" id="user_add_orgcode"   class="form-control"  />
						                    <span class="input-group-btn">
						                        <button class="btn btn-default" style="border-radius: 0 4px 4px 0 !important;"><i class="fa fa-search"></i> </button>
						                    </span>
						                </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                              	<div class="col-sm-6">
                                      <div class="form-group">
                                      	 <label for="user_add_idcard">身份证</label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="user_add_idcard" class="form-control" placeholder="身份证">
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	 <label for="user_add_email">邮箱</label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="user_add_email" class="form-control" placeholder="身份证">
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	 <label for="user_add_phone">电话</label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="user_add_phone" class="form-control" placeholder="电话">
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      		<label for="user_add_mobile">手机</label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="user_add_mobile" class="form-control" placeholder="手机">
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	  <label for="user_add_usertype">类型</label>
                                          <span class="input-icon icon-right">
                                              <select  id="user_add_usertype" class="form-control">
                                              	<option value="0" selected>普通用户</option>
                                              	<option value="1">管理员</option>
                                              </select>
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      		<label for="user_add_ipdz">IP地址</label>
                                          	<span class="input-icon icon-right">
                                              	<input type="text" id="user_add_ipdz" class="form-control" placeholder="IP地址">
                                          	</span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div class="row">
                                  <div class="col-sm-12">
                                      <div class="form-group">
                                      	  <label for="user_add_remark">备注</label>
                                          <textarea id="user_add_remark" class="form-control" rows="4" placeholder="备注"></textarea>
                                      </div>
                                  </div>
                              </div>
                              <button id="user_add_button" type="submit" class="btn btn-blue">添加</button>
                      </div>
                 </div>
             </div>
         </div>
	</div>
</div>

<script type="text/html" id="user_list_bar">
  <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

<SCRIPT type="text/javascript">
	$(window).resize(function() {
		//$("#right").css({width: $("#row-fluid").width() -180});
		$("#user_left_org_tree").css({height: $("#right").height() -  41});
		$("#user_right").css({width: $("#right").width() - 200})
		$("#user_add_form").css({height: $("#right").height() -  41});;

	});
	$("#user_left_org_tree").css({height: $("#right").height() -  41});
	$("#user_right").css({width: $("#right").width() - 200})
	$("#user_add_form").css({height: $("#right").height() -  41});;
	
	var setting = {
	        data: {
	            simpleData: {
	                enable: true,
	                idKey: "code",
	                pIdKey: "pcode"
	            },
	            key: {
	            	name: "mc"
	            }
	        },
	        check: {
	            enable: false
	        },
	        callback: {
	        	onClick: treeClick
	        }
	    };
	
	$(document).ready(function(){
		Utils.ajax (basePath + "/user/selectAllOrg", {}, function(data){
			console.log(data);
			data = data.orgList;
			if(data.length > 0){
				var treeObj = $.fn.zTree.init($("#user_left_org_tree"), setting, data);
				var node = treeObj.getNodesByFilter(function (node) { return node.level == 0 }, true); 
				console.log(node);
				$("#user_hiddden_orgcode").val(node.code);
				$("#user_add_orgname").val(node.mc);
				$("#user_add_orgcode").val(node.code);
				initTable()
			}
			
    	});
	});
  //  $.fn.zTree.init($("#kjcx_tree"), setting, zNodes);
  function initTable(){
	  table.render({
		    elem: '#user_list'
		    ,url: basePath + '/user/selectUsers'
		    ,height: "full-300"
		    ,id: "user_list_table"
		    ,where: {orgcode: $("#user_hiddden_orgcode").val()} //如果无需传递额外参数，可不加该参数
		    ,method: 'post' //如果无需自定义HTTP类型，可不加该参数
		    ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
		      layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
		      //,curr: 5 //设定初始在第 5 页
		      ,groups: 1 //只显示 1 个连续页码
		      ,first: false //不显示首页
		      ,last: false //不显示尾页
		      
		    }
		    ,cols: [[
		      {field:'rn', width:80, title: '序号', sort: true}
		      ,{field:'userid', title: '用户名', }
		      ,{field:'name',  title: '姓名'}
		      ,{field:'orgname',  title: '组织机构'}
		      ,{field:'phone',  title: '手机号码'}
		      ,{field:'idcard',  title: '证件号码'}
		      ,{fixed: 'right', width:150, align:'center', toolbar: '#user_list_bar'}
		    ]]
		  });
		  table.on('tool(user_list)', function(obj){
			    var data = obj.data;
			    if(obj.event === 'del'){
			      layer.confirm('确认是否删除行', function(index){
			        layer.close(index);
			        Utils.ajax (basePath + "/user/delUser", {id: data.id}, function(data){
			        	layer.msg("删除成功")
			        	obj.del();
			        });
			        //
			      });
			    } else if(obj.event === 'edit'){
			      layer.alert('编辑行：<br>'+ JSON.stringify(data))
			    }
			  });
  }
  
  
  function treeClick(event, treeId, treeNode, clickFlag){
	  console.log(treeNode);
	  $("#user_hiddden_orgcode").val(treeNode.code);
	//执行重载
      table.reload('user_list_table', {
        page: {
          curr: 1 //重新从第 1 页开始
        }
      ,where: {orgcode: treeNode.code} //如果无需传递额外参数，可不加该参数

      });
  }
  
  $("#user_query_click_button").click(function(){
	  var userid = $("#user_userid").val();
		 var name = $("#user_name").val();
		 var phone = $("#user_phone").val();
		 var idcard = $("#user_idcard").val();
		 var orgcode = $("#user_hiddden_orgcode").val();
		//执行重载
	      table.reload('user_list_table', {
	        page: {
	          curr: 1 //重新从第 1 页开始
	        }
	        ,where: {
	        	userid: userid, name: name, phone: phone, idcard: idcard, orgcode: orgcode
	        }
	      });
  });
  
	var add_setting = {
	        data: {
	            simpleData: {
	                enable: true,
	                idKey: "code",
	                pIdKey: "pcode"
	            },
	            key: {
	            	name: "mc"
	            }
	        },
	        check: {
	            enable: false
	        },
	        callback: {
	        }
	    };
  
  $("#user_add_org_panel").click(function(){
	 // console.log(123123);
	  layer.open({
		  type: 1
		  ,title: false //不显示标题栏
		  ,closeBtn: false
		  ,area: '300px;'
		  ,shade: 0.8
		  ,resize: false
		  ,btn: ['确认', '取消']
		  ,btnAlign: 'c'
		  ,moveType: 1 //拖拽模式，0或者1
		  ,content: '<ul id="user_add_org_tree" class="ztree" style="padding: 10px 0 0 10px;height:300px"></ul>'
		  ,success: function(layero){
			  Utils.ajax (basePath + "/user/selectAllOrg", {}, function(data){
					console.log(data);
					data = data.orgList;
					if(data.length > 0){
						data[0].open = true;
						$.fn.zTree.init($("#user_add_org_tree"), add_setting, data);
					}
					
		    	});
		  }
	  	  ,yes: function(index, layero){
		    //按钮【按钮一】的回调
	  		var treeObj = $.fn.zTree.getZTreeObj("user_add_org_tree");
	  		var nodes = treeObj.getSelectedNodes();
			if(nodes.length > 0){
				var node = nodes[0];
				$("#user_add_orgname").val(node.mc);
				$("#user_add_orgcode").val(node.code);
				layer.close(index);
			}
			
	  		

		  }
		  ,btn2: function(index, layero){
		    //按钮【按钮二】的回调
		    //return false 开启该代码可禁止点击该按钮关闭
		  }
		});
  });
  
  $("#user_add_button").click(function(){
	  var name = $("#user_add_name").val();
	  var userid =  $("#user_add_userid").val();
	  var password = $("#user_add_password").val();
	  var orgcode = $("#user_add_orgcode").val();
	  var idcard = $("#user_add_idcard").val();
	  var email = $("#user_add_email").val();
	  var phone = $("#user_add_phone").val();
	  var mobile = $("#user_add_mobile").val();
	  var usertype = $("#user_add_usertype").val();
	  var ipdz = $("#user_add_ipdz").val();
	  var remarks = $("#user_add_remark").val();
	  
	  if($.trim(name) == ""){
		  Utils.notifyError("姓名不能为空", "错误");
		  return;
	  }
	  if($.trim(userid) == ""){
		  Utils.notifyError("用户名不能为空", "错误");
		  return;
	  }
	  if($.trim(password) == ""){
		  Utils.notifyError("密码不能为空", "错误");
		  return;
	  }
	  
	  var param = {name, userid, password, orgcode, idcard, email, phone, mobile, usertype, ipdz, remarks};
	  //console.log(param);
	  Utils.ajax (basePath + "/user/insert", param, function(data){
		  layer.msg("添加成功");
		  resetAddForm()
	   	});
  });
  
  function resetAddForm(){
	  $("#user_add_name").val("");
	  $("#user_add_userid").val("");
	  $("#user_add_password").val("");
	  
	  $("#user_add_idcard").val("");
	  $("#user_add_email").val("");
	  $("#user_add_phone").val("");
	  $("#user_add_mobile").val("");
	  $("#user_add_usertype").val("");
	  $("#user_add_ipdz").val("");
	  $("#user_add_remark").val("");
	  
	  var treeObj = $.fn.zTree.getZTreeObj("user_left_org_tree");  
	    //返回一个根节点  
	   var node = treeObj.getNodesByFilter(function (node) { return node.level == 0 }, true);  
	    
	  $("#user_add_orgname").val(node.mc);
		$("#user_add_orgcode").val(node.code);
  }
  

	//selectAllOrg
	//$("#user_left").css({height: });
</SCRIPT>