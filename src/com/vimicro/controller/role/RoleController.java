package com.vimicro.controller.role;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.ResponseData;
import com.vimicro.service.OrgService;
import com.vimicro.service.RoleService;
import com.vimicro.utils.StringUtils;

@Controller
@RequestMapping(value = "/role")
public class RoleController {

	@Resource(name = "roleService")
	private RoleService roleService;

	@RequestMapping(value = "/role")
	public String user() {
		return "main/role/role";
	}

	@RequestMapping(value = "/selectRoles")
	@ResponseBody
	public ResponseData selectRoles(HttpServletRequest request, int page, int limit, String mc) {
		mc = StringUtils.doEmpty(mc);

		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("code", "0");
		responseData.putDataValue("msg", " ");
		responseData.putDataValue("count", roleService.countRole(mc));
		responseData.putDataValue("data", roleService.selectRoles(mc, page, limit));

		return responseData;
	}

	@RequestMapping(value = "/delete")
	@ResponseBody
	public ResponseData delete(String code) {
		ResponseData responseData = ResponseData.ok();
		int n = roleService.delete(code);
		if (n != 1) {
			responseData = ResponseData.customerError();
		}
		return responseData;
	}
	
	@RequestMapping(value = "/add")
	@ResponseBody
	public ResponseData add(String mc, String description, String remark ) {
		ResponseData responseData = ResponseData.ok();
		int n = roleService.add(mc, description, remark);
		if (n != 1) {
			responseData = ResponseData.customerError();
			responseData.putDataValue("errors", "添加失败，请稍后再试");
		}
		return responseData;
	}
	
	@RequestMapping(value = "/addRoleMenu")
	@ResponseBody
	public ResponseData addRoleMenu(String code, String menuids) {
		ResponseData responseData = ResponseData.ok();
		int n = roleService.addRoleMenu(code, menuids.split(","));
		if (n < 1) {
			responseData = ResponseData.customerError();
			responseData.putDataValue("errors", "添加失败，请稍后再试");
		}
		return responseData;
	}
	
	@RequestMapping(value = "/selectRoleMenus")
	@ResponseBody
	public ResponseData selectRoleMenus(String code){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("data", roleService.selectRoleMenus(code));
		return responseData;
	}
}
