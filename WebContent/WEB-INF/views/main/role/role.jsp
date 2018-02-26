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
	<div id="role_main" style=" height: 100%;float: left;margin-left:20px">
		<div id="role_tab"  class="tabbable">
	        <ul class="nav nav-tabs tabs-flat" id="myTab11">
	            <li class="active">
	                <a data-toggle="tab" href="#role_list_panel">
	                    	角色列表
	                </a>
	            </li>
	            <li class="">
	                     <a data-toggle="tab" href="#role_add_panel">
	                         	添加角色
	                     </a>
	             </li>
	        </ul>
	        <div class="tab-content tabs-flat">
                 <div id="role_list_panel" class="tab-pane active">
                     <div style="margin-top: 20px">
                        	<table class="layui-hide" id="role_list" lay-filter="role_list"></table>
                        </div>
                 </div>

                 <div id="role_add_panel" class="tab-pane">
                 	<div class="col-lg-6 col-sm-9 col-xs-12">
                      <div id="role_add_form" style="overflow-y: auto;overflow-x: hidden">
                              <div class="row">
                                  <div class="col-sm-12">
                                      <div class="form-group">
                                      	  <label for="role_add_mc">名称<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="role_add_mc" class="form-control" placeholder="名称">
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <div class="form-group">
                                      	  <label for="role_add_description">描述</label>
                                          <textarea id="role_add_description" class="form-control" rows="4" placeholder="描述"></textarea>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <div class="form-group">
                                      	  <label for="role_add_remark">备注</label>
                                          <textarea id="role_add_remark" class="form-control" rows="4" placeholder="备注"></textarea>
                                      </div>
                                  </div>
                              </div>
                              <button id="role_add_button" type="submit" class="btn btn-blue">添加</button>
                      </div>
                 </div>
             </div>
         </div>
	</div>
</div>

<script type="text/html" id="role_list_bar">
  <a class="layui-btn layui-btn-xs" lay-event="user">分配用户</a>
  <a class="layui-btn layui-btn-xs" lay-event="menu">分配功能</a>
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

<SCRIPT type="text/javascript">
	$(window).resize(function() {
		//$("#right").css({width: $("#row-fluid").width() -180});
		$("#role_main").css({width: $("#right").width()})
		$("#role_add_form").css({height: $("#right").height() -  41});;

	});
	$("#role_main").css({width: $("#right").width()})
	$("#role_add_form").css({height: $("#right").height() -  41});;
	
	function initTable(){
		  table.render({
			    elem: '#role_list'
			    ,url: basePath + '/role/selectRoles'
			    ,height: "470"
			    ,id: "role_list_table"
			    ,where: {mc: ""} //如果无需传递额外参数，可不加该参数
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
			      ,{field:'mc', title: '角色名称', }
			      ,{field:'description',  title: '描述'}
			      ,{fixed: 'right', width:250, align:'center', toolbar: '#role_list_bar'}
			    ]]
			  });
			  table.on('tool(role_list)', function(obj){
				    var data = obj.data;
				    
				    if(obj.event === 'menu'){
				    	menuEdit(data.code);
				    } else if(obj.event === 'edit'){
				      layer.alert('编辑行：<br>'+ JSON.stringify(data))
				    }
				  });
	  }
	initTable();

	
	
	
	$("#role_add_button").click(function(){
		var mc = $("#role_add_mc").val();
		var description = $("#role_add_description").val();
		var remark = $("#role_add_remark").val();
		
		var param = {mc, description, remark};
		Utils.ajax (basePath + "/role/add", param, function(data){
			layer.msg("添加成功");
			$('#role_tab a[href="#role_list_panel"]').tab('show');
			resetAddForm();
			table.reload('role_list_table', {
				  page: {
				    curr: 1 //重新从第 1 页开始
				  }
				});
		});
		//add
	});
	
	function resetAddForm(){
		$("#role_add_mc").val("");
		$("#role_add_description").val("");
		$("#role_add_remark").val("");
	}
	
	
	var add_setting = {
	        data: {
	            simpleData: {
	                enable: true,
	                idKey: "id",
	                pIdKey: "pid"
	            },
	            key: {
	            	name: "name"
	            }
	        },
	        check: {
	            enable: true,
	            chkboxType: { "Y" : "ps", "N" : "ps" }
	        },
	        callback: {
	        }
	    };
	function menuEdit(code){
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
			  ,content: '<ul id="role_edit_menu_tree" class="ztree" style="padding: 10px 0 0 10px;height:300px"></ul>'
			  ,success: function(layero){
				  Utils.ajax (basePath + "/menu/selectAllMenu", {}, function(data){
						data = data.menuList;
						console.log(data);
						if(data.length > 0){
							for(var i=0; i<data.length; i++){
								if(!data[i].pid){
									data[i].pid = "-"
								}
							}
							var treeobj = $.fn.zTree.init($("#role_edit_menu_tree"), add_setting, data);
							Utils.ajax (basePath + "/role/selectRoleMenus", {code: code}, function(data){
								console.log(data);
								data = data.data;
								for(var i=0; i<data.length; i++){
									var mid = data[i].menu_id;
									var node = treeobj.getNodeByParam("id", mid, null);
									treeobj.checkNode(node, true, false);
								}
								//var node = treeobj.getNodeByParam("id", 1, null);
							});
							
						}
						
			    	});
			  }
		  	  ,yes: function(index, layero){
			    //按钮【按钮一】的回调
		  		var treeObj = $.fn.zTree.getZTreeObj("role_edit_menu_tree");
		  		var nodes = treeObj.getCheckedNodes(true);
				console.log(nodes);				
		  		var menuids = [];
		  		for(var i=0; i<nodes.length; i++){
		  			var node = nodes[i]
		  			menuids.push(node.id); 
		  		}
		  		console.log(menuids);
		  		menuids = menuids.join(",")
		  		Utils.ajax (basePath + "/role/addRoleMenu", {code, menuids }, function(data){
		  			layer.msg("保存成功");
		  			layer.close(index);
		  		})
			  }
			  ,btn2: function(index, layero){
			    //按钮【按钮二】的回调
			    //return false 开启该代码可禁止点击该按钮关闭
			  }
			});
	}
	
</SCRIPT>