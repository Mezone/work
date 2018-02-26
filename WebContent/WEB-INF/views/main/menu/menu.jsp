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
	<div id="menu_left" class="accordion-group" style="width: 180px; height: 100%;float: left">
		<div class="accordion-heading">
	    	<a class="accordion-toggle"  title="">功能树</a>
	    </div>
	    <ul id="menu_left_menu_tree" class="ztree" style="padding: 10px 0 0 10px;"></ul>
	</div>
	<div id="menu_right" style="height: 100%;float: left;margin-left:20px;">
		<div id="menu_tab" class="tabbable">
	        <ul class="nav nav-tabs tabs-flat" id="myTab11">
	            <li class="active">
	                <a data-toggle="tab" href="#menu_list_panel">
	                    	功能列表
	                </a>
	            </li>
	            <li class="">
	                     <a data-toggle="tab" href="#menu_add_panel">
	                         	添加功能
	                     </a>
	             </li>
	        </ul>
	        <div class="tab-content tabs-flat">
	        	<div id="menu_list_panel" class="tab-pane active" style="overflow-y: auto;overflow-x: hidden">
	        		<table id="menu_tree_table"></table>
	        	</div>
	        	<div id="menu_add_panel" class="tab-pane">
	        		<div id="user_add_form" class="col-lg-6 col-sm-9 col-xs-12" style="overflow-y: auto;overflow-x: hidden">
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	  <label for="menu_add_name">功能名称<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="menu_add_name" class="form-control" placeholder="功能名称">
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                           <label for="menu_add_icon">功能样式</label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="menu_add_icon" class="form-control" placeholder="功能样式">
                                          </span>
                                      </div>
                                  </div>
                              </div>
                               <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	  <label for="menu_add_href">功能地址<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="menu_add_href" class="form-control" placeholder="功能地址">
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                           <label for="menu_add_sort">排序</label>
                                              <div class="spinner spinner-horizontal spinner-two-sided">
                                                    <div class="spinner-buttons	btn-group spinner-buttons-left">
                                                        <button type="button" class="btn spinner-down danger">
                                                            <i class="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input id="menu_add_sort" type="text" class="spinner-input form-control" maxlength="3">
                                                    <div class="spinner-buttons	btn-group spinner-buttons-right">
                                                        <button type="button" class="btn spinner-up blue">
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	  <label for="menu_add_isshow">是否显示</label>
                                          <span class="input-icon icon-right">
                                              <select  id="menu_add_isshow" class="form-control">
                                              	<option value="0" selected>显示</option>
                                              	<option value="1">隐藏</option>
                                              </select>
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	 <label for="menu_add_menu_panel">上级功能<span style="color: red">*</span></label>
                                      	 <div class="input-group" id="menu_add_menu_panel">
						                    <input type="text" value="" id="menu_add_p_name" class="form-control" style="border-radius: 4px 0px 0px 4px !important; cursor: allowed;"   disabled="disabled" />
						                   	 <input type="hidden" value="" id="menu_add_p_id"   class="form-control"  />
						                    <span class="input-group-btn">
						                        <button class="btn btn-default" style="border-radius: 0 4px 4px 0 !important;"><i class="fa fa-search"></i> </button>
						                    </span>
						                </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <div class="form-group">
                                      	  <label for="menu_add_remark">备注</label>
                                          <textarea id="menu_add_remark" class="form-control" rows="4" placeholder="备注"></textarea>
                                      </div>
                                  </div>
                              </div>
                              
                              <button id="menu_add_button" type="submit" class="btn btn-blue">添加</button>
                      </div>
	        	</div>
	        </div>
	    </div>
		
	</div>
</div>


<div id="user_edit_form" class="col-sm-12" style="overflow-y: auto;overflow-x: hidden;display:none">
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                	  <label for="menu_edit_name">功能名称<span style="color: red">*</span></label>
                    <span class="input-icon icon-right">
                        <input type="text" id="menu_edit_name" class="form-control" placeholder="功能名称">
                        <input type="hidden" id="menu_edit_id" class="form-control">
                        
                    </span>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                     <label for="menu_edit_icon">功能样式</label>
                    <span class="input-icon icon-right">
                        <input type="text" id="menu_edit_icon" class="form-control" placeholder="功能样式">
                    </span>
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                	  <label for="menu_edit_href">功能地址<span style="color: red">*</span></label>
                    <span class="input-icon icon-right">
                        <input type="text" id="menu_edit_href" class="form-control" placeholder="功能地址">
                    </span>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                     <label for="menu_edit_sort">排序</label>
                        <div class="spinner spinner-horizontal spinner-two-sided">
                              <div class="spinner-buttons	btn-group spinner-buttons-left">
                                  <button type="button" class="btn spinner-down danger">
                                      <i class="fa fa-minus"></i>
                                  </button>
                              </div>
                              <input id="menu_edit_sort" type="text" class="spinner-input form-control" maxlength="3">
                              <div class="spinner-buttons	btn-group spinner-buttons-right">
                                  <button type="button" class="btn spinner-up blue">
                                      <i class="fa fa-plus"></i>
                                  </button>
                              </div>
                          </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                	  <label for="menu_edit_isshow">是否显示</label>
                    <span class="input-icon icon-right">
                        <select  id="menu_edit_isshow" class="form-control">
                        	<option value="0" selected>显示</option>
                        	<option value="1">隐藏</option>
                        </select>
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                	  <label for="menu_edit_remark">备注</label>
                    <textarea id="menu_edit_remark" class="form-control" rows="4" placeholder="备注"></textarea>
                </div>
            </div>
        </div>
         <div class="row" style="text-align:center">
         	<button id="menu_edit_button" type="submit" class="btn btn-blue" style="margin-bottom:5px">更新</button>
         </div>
</div>


<SCRIPT type="text/javascript">
	$(window).resize(function() {
		//$("#right").css({width: $("#row-fluid").width() -180});
		$("#menu_left_menu_tree").css({height: $("#right").height() -  41});
		$("#menu_right").css({width: $("#right").width() - 200})
		$("#menu_list_panel").css({height: $("#right").height() -  60});;

	});
	$("#menu_left_menu_tree").css({height: $("#right").height() -  41});
	$("#menu_right").css({width: $("#right").width() - 200})
	$("#menu_list_panel").css({height: $("#right").height() -  60});;
	
    $('.spinner').spinner();

    var layer_update;
    
	var setting = {
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
	            enable: false
	        },
	        callback: {
	        }
	    };
	
	$(document).ready(function(){
		
		 $('#menu_tree_table').bootstrapTable({
			 	classes: 'layui-table',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                sidePagination: 'server',
                leafIcon: "",
                pagination: false,
                treeView: true,
                treeId: "id",
                uniqueId: "id",
                treeField: "name",
                columns: [{
                    field: 'name',
                    title: '名称',
                },
                {
                    field: 'href',
                    title: '链接	',
                    
                },
                {
                    field: 'isshow',
                    title: '是否显示	',
                    formatter: function(value, row, index){
                    	if(value == 0){
                    		return "是";
                    	}else{
                    		return "否";
                    	}
                    }
                },
                {
                    field: 'sort',
                    title: '排序',
                    
                },
                {
                    field: 'code',
                    title: '操作',
                    width: 220,
                    formatter: function(value, row, index){
                    	var id = row.id;
                    	var mc = row.name;
                    	var stringRow = JSON.stringify(row)
                    	return '<a class="layui-btn layui-btn-xs" event="addChild" code="'+id+'" mc="'+mc+'" >添加下级功能</a> <a class="layui-btn layui-btn-primary layui-btn-xs" event="edit" code="'+id+'"  >修改</a>  <a class="layui-btn layui-btn-danger layui-btn-xs"  code="'+id+'"  event="del">删除</a>';
                    }
                },
                ],
                onPostBody: function(){
                	$("#menu_tree_table a").click(function(){
                		var type = $(this).attr("event");
                		var code =  $(this).attr("code");
                		switch(type){
                			case "addChild":
                				var mc =  $(this).attr("mc");
                				$('#menu_tab a[href="#menu_add_panel"]').tab('show');
                				$("#menu_add_p_name").val(mc);
                				$("#menu_add_p_id").val(code);
                				
                				break;
                			case "del":
                				layer.confirm('确认是否删除该功能，删除该功能将同时删除该功能下子级功能', function(index){
                			        layer.close(index);
                			        Utils.ajax (basePath + "/menu/delete", {id: code}, function(data){
                			        	layer.msg("删除成功");
                			        	initmenuData();
                			        });
                			      });
                				break;
                			case "edit":
                				var data = $('#menu_tree_table').bootstrapTable('getRowByUniqueId', code);
                				console.log(data);
                				layer_update = layer.open({
                					  type: 1
                					  ,title: "菜单修改" //不显示标题栏
                					  ,area: '600px;'
                					  ,shade: 0.8
                					  ,content: $("#user_edit_form")
                					  ,success: function(){
                						  	$("#menu_edit_name").val(data.name);
                						  	$("#menu_edit_id").val(data.id);
                						  	$("#menu_edit_icon").val(data.icon);
                						  	$("#menu_edit_href").val(data.href);
                						  	$("#menu_edit_sort").val(data.sort);
                						  	$("#menu_edit_isshow").val(data.isshow);
                						  	$("#menu_edit_remark").val(data.remarks);

                					  	}
                					  });
                				break;
                		}
                	});
                }
           });
		 
		 initmenuData();
			
    	});
		
		function initmenuData(){
			Utils.ajax (basePath + "/menu/selectAllMenu", {}, function(data){
				data = data.menuList;
				loadmenuDataView(data);
			});
		}
		function loadmenuDataView(data){
			var treeObj = $.fn.zTree.init($("#menu_left_menu_tree"), setting, data);
			$('#menu_tree_table').bootstrapTable('refresh', {url: basePath + "/menu/selectAllMenuTreeView",});
		}
		
		$("#menu_add_button").click(function(){
			var name =  $("#menu_add_name").val();
			var icon = $("#menu_add_icon").val();
			var href = $("#menu_add_href").val();
			var pid = $("#menu_add_p_id").val();
			var sort = $("#menu_add_sort").val();
			var isshow = $("#menu_add_isshow").val();
			var remark = $("#menu_add_remark").val();
			if(pid == "-"){
				pid = "";
			}
			if($.trim(name) == ""){
				  Utils.notifyError("功能名称不能为空", "错误");
				  return;
			  }
			 if($.trim(href) == ""){
				  Utils.notifyError("功能连接不能为空", "错误");
				  return;
			  }
			 
			var param = {name, icon, href, pid, sort, isshow, remark};
			console.log(param);
			Utils.ajax (basePath + "/menu/add", param, function(data){
				layer.msg("添加成功");
				$('#menu_tab a[href="#menu_list_panel"]').tab('show');
				initmenuData();
				resetAddForm();
			});
		});
		
		$("#menu_edit_button").click(function(){
			var name = $("#menu_edit_name").val();
		  	var id = $("#menu_edit_id").val();
		  	var icon = $("#menu_edit_icon").val();
		  	var href = $("#menu_edit_href").val();
		  	var sort = $("#menu_edit_sort").val();
		  	var isshow = $("#menu_edit_isshow").val();
		  	var remark = $("#menu_edit_remark").val();
		  	if($.trim(name) == ""){
				  Utils.notifyError("功能名称不能为空", "错误");
				  return;
			  }
			 if($.trim(href) == ""){
				  Utils.notifyError("功能连接不能为空", "错误");
				  return;
			  }
			 
		  	var param = {id, name, icon, href, sort, isshow, remark};
		  	Utils.ajax (basePath + "/menu/update", param, function(data){
		  		layer.close(layer_update);
				layer.msg("更新成功");
				$('#menu_tab a[href="#menu_list_panel"]').tab('show');
				initmenuData();
			});
		});
	
		
		function resetAddForm(){
			$("#menu_add_name").val("");
			$("#menu_add_icon").val("");
			$("#menu_add_href").val("");
			$("#menu_add_sort").val(1);
			$("#menu_add_remark").val("");
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
		            enable: false
		        },
		        callback: {
		        }
		    };
	  
	  $("#menu_add_menu_panel").click(function(){
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
			  ,content: '<ul id="menu_add_menu_tree" class="ztree" style="padding: 10px 0 0 10px;height:300px"></ul>'
			  ,success: function(layero){
				  Utils.ajax (basePath + "/menu/selectAllMenu", {}, function(data){
						data = data.menuList;
						console.log(data);
						var obj = {name: "功能列表", id: "-"};
						if(data.length > 0){
							for(var i=0; i<data.length; i++){
								if(!data[i].pid){
									data[i].pid = "-"
								}
							}
							data.splice(0, 0, obj)
							var treeobj = $.fn.zTree.init($("#menu_add_menu_tree"), add_setting, data);
							var node = treeobj.getNodesByFilter(function (node) { return node.level == 0 }, true); 
							treeobj.expandNode(node);
						}
						
			    	});
			  }
		  	  ,yes: function(index, layero){
			    //按钮【按钮一】的回调
		  		var treeObj = $.fn.zTree.getZTreeObj("menu_add_menu_tree");
		  		var nodes = treeObj.getSelectedNodes();
				if(nodes.length > 0){
					var node = nodes[0];
					$("#menu_add_p_name").val(node.name);
					$("#menu_add_p_id").val(node.id);
					layer.close(index);
				}
				
		  		

			  }
			  ,btn2: function(index, layero){
			    //按钮【按钮二】的回调
			    //return false 开启该代码可禁止点击该按钮关闭
			  }
			});
	  });
</SCRIPT>