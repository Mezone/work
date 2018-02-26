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
	<div id="org_left" class="accordion-group" style="width: 180px; height: 100%;float: left">
		<div class="accordion-heading">
	    	<a class="accordion-toggle"  title="">组织机构</a>
	    </div>
	    <ul id="org_left_org_tree" class="ztree" style="padding: 10px 0 0 10px;"></ul>
	</div>
	<div id="org_right" style="height: 100%;float: left;margin-left:20px;">
		<div id="org_tab" class="tabbable">
	        <ul class="nav nav-tabs tabs-flat" id="myTab11">
	            <li class="active">
	                <a data-toggle="tab" href="#org_list_panel">
	                    	机构列表
	                </a>
	            </li>
	            <li class="">
	                     <a data-toggle="tab" href="#org_add_panel">
	                         	添加机构
	                     </a>
	             </li>
	        </ul>
	        <div class="tab-content tabs-flat">
	        	<div id="org_list_panel" class="tab-pane active" style="overflow-y: auto;overflow-x: hidden">
	        		<table id="org_tree_table"></table>
	        	</div>
	        	<div id="org_add_panel" class="tab-pane">
	        		<div id="user_add_form" class="col-lg-6 col-sm-9 col-xs-12" style="overflow-y: auto;overflow-x: hidden">
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	  <label for="org_add_mc">机构名称<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="org_add_mc" class="form-control" placeholder="机构名称">
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                           <label for="org_add_code">机构代码<span style="color: red">*</span></label>
                                          <span class="input-icon icon-right">
                                              <input type="text" id="org_add_code" class="form-control" placeholder="机构代码">
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	  <label for="org_add_usertype">类型</label>
                                          <span class="input-icon icon-right">
                                              <select  id="org_add_type" class="form-control">
                                              	<option value="0" selected>部门</option>
                                              	<option value="1">机构</option>
                                              </select>
                                          </span>
                                      </div>
                                  </div>
                                  <div class="col-sm-6">
                                      <div class="form-group">
                                      	 <label for="org_add_org_panel">上级单位<span style="color: red">*</span></label>
                                      	 <div class="input-group" id="org_add_org_panel">
						                    <input type="text" value="" id="org_add_p_orgname" class="form-control" style="border-radius: 4px 0px 0px 4px !important; cursor: allowed;"   disabled="disabled" />
						                   	 <input type="hidden" value="" id="org_add_p_orgcode"   class="form-control"  />
						                   	 <input type="hidden" value="" id="org_add_p_orgjb"   class="form-control"  />
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
                                      		 <label for="org_add_sfyx">是否有效</label>
                                          <span class="input-icon icon-right">
                                              <select  id="org_add_sfyx" class="form-control">
                                              	<option value="0" selected>有效</option>
                                              	<option value="1">无效</option>
                                              </select>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              
                              <button id="org_add_button" type="submit" class="btn btn-blue">添加</button>
                      </div>
	        	</div>
	        </div>
	    </div>
		
	</div>
</div>


<SCRIPT type="text/javascript">
	$(window).resize(function() {
		//$("#right").css({width: $("#row-fluid").width() -180});
		$("#org_left_org_tree").css({height: $("#right").height() -  41});
		$("#org_right").css({width: $("#right").width() - 200})
		$("#org_list_panel").css({height: $("#right").height() -  60});;

	});
	$("#org_left_org_tree").css({height: $("#right").height() -  41});
	$("#org_right").css({width: $("#right").width() - 200})
	$("#org_list_panel").css({height: $("#right").height() -  60});;
	
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
	        }
	    };
	
	$(document).ready(function(){
		
		 $('#org_tree_table').bootstrapTable({
			 	classes: 'layui-table',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                sidePagination: 'server',
                leafIcon: "",
                pagination: false,
                treeView: true,
                treeId: "id",
                treeField: "mc",
                columns: [{
                    field: 'mc',
                    title: '组织机构名称',
                },
                {
                    field: 'code',
                    title: '组织机构代码',
                },
                {
                    field: 'code',
                    title: '操作',
                    width: 180,
                    formatter: function(value, row, index){
                    	var code = row.code;
                    	var jb = row.jb;
                    	var mc = row.mc;
                    	return '<a class="layui-btn layui-btn-xs" event="addChild" code="'+code+'" jb="'+jb+'" mc="'+mc+'" >添加下级机构</a>  <a class="layui-btn layui-btn-danger layui-btn-xs"  code="'+code+'" jb="'+jb+'"  event="del">删除</a>';
                    }
                },
                ],
                onPostBody: function(){
                	$("#org_tree_table a").click(function(){
                		var type = $(this).attr("event");
                		var code =  $(this).attr("code");
                		var jb =  $(this).attr("jb");
                		switch(type){
                			case "addChild":
                				var mc =  $(this).attr("mc");
                				$('#org_tab a[href="#org_add_panel"]').tab('show');
                				$("#org_add_p_orgname").val(mc);
                				$("#org_add_p_orgcode").val(code);
                				$("#org_add_p_orgjb").val(jb);

                				
                				break;
                			case "del":
                				layer.confirm('确认是否删除该单位，删除该单位将同时删除该单位下子级单位', function(index){
                			        layer.close(index);
                			        Utils.ajax (basePath + "/org/delete", {code: code}, function(data){
                			        	layer.msg("删除成功");
                			        	initOrgData();
                			        });
                			      });
                				break;
                		}
                	});
                }
           });
		 
		 initOrgData();
			
    	});
		
		function initOrgData(){
			Utils.ajax (basePath + "/org/selectAllOrg", {}, function(data){
				data = data.orgList;
				loadOrgDataView(data);
			});
		}
		function loadOrgDataView(data){
			var treeObj = $.fn.zTree.init($("#org_left_org_tree"), setting, data);
			var node = treeObj.getNodesByFilter(function (node) { return node.level == 0 }, true); 
			treeObj.expandNode(node);
			$("#org_add_p_orgname").val(node.mc);
			$("#org_add_p_orgcode").val(node.code);
			$("#org_add_p_orgjb").val(node.jb);
			$('#org_tree_table').bootstrapTable('refresh', {url: basePath + "/org/selectAllOrgTreeView",});
		}
		
		$("#org_add_button").click(function(){
			var code = $("#org_add_code").val();
			var mc =  $("#org_add_mc").val();
			var type = $("#org_add_type").val();
			var pcode = $("#org_add_p_orgcode").val();
			var pjb = $("#org_add_p_orgjb").val();
			var sfyx = $("#org_add_sfyx").val();
			
			 if($.trim(code) == ""){
				  Utils.notifyError("组织机构代码不能为空", "错误");
				  return;
			  }
			 if($.trim(mc) == ""){
				  Utils.notifyError("组织机构名称不能为空", "错误");
				  return;
			  }
			 
			var param = {code, mc, type, pcode, pjb, sfyx};
			console.log(param);
			Utils.ajax (basePath + "/org/add", param, function(data){
				layer.msg("添加成功");
				$('#org_tab a[href="#org_list_panel"]').tab('show');
				initOrgData();
				resetAddForm();
			});
		});
		
		function resetAddForm(){
			$("#org_add_code").val("");
			$("#org_add_mc").val("");
		}
		
		
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
	  
	  $("#org_add_org_panel").click(function(){
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
			  ,content: '<ul id="org_add_org_tree" class="ztree" style="padding: 10px 0 0 10px;height:300px"></ul>'
			  ,success: function(layero){
				  Utils.ajax (basePath + "/org/selectAllOrg", {}, function(data){
						console.log(data);
						data = data.orgList;
						if(data.length > 0){
							data[0].open = true;
							$.fn.zTree.init($("#org_add_org_tree"), add_setting, data);
						}
						
			    	});
			  }
		  	  ,yes: function(index, layero){
			    //按钮【按钮一】的回调
		  		var treeObj = $.fn.zTree.getZTreeObj("org_add_org_tree");
		  		var nodes = treeObj.getSelectedNodes();
				if(nodes.length > 0){
					var node = nodes[0];
					$("#org_add_p_orgname").val(node.mc);
					$("#org_add_p_orgcode").val(node.code);
					$("#org_add_p_orgjb").val(node.jb);
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