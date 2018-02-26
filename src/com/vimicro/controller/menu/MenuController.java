package com.vimicro.controller.menu;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.ResponseData;
import com.vimicro.service.MenuService;
import com.vimicro.service.OrgService;

@Controller
@RequestMapping(value = "/menu")
public class MenuController {

	@Resource(name = "menuService")
	private MenuService menuService;

	@RequestMapping(value = "/menu")
	public String user() {
		return "main/menu/menu";
	}

	@RequestMapping(value = "/selectAllMenu")
	@ResponseBody
	public ResponseData selectAllMenu(HttpServletRequest request) {
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("menuList", menuService.selectAllMenu());
		return responseData;
	}

	@RequestMapping(value = "/selectAllMenuTreeView")
	@ResponseBody
	public ResponseData selectAllMenuTreeView(HttpServletRequest request) {
		ResponseData responseData = ResponseData.ok();
		List<JSONObject> l = menuService.selectAllMenu();
		for (int i = 0; i < l.size(); i++) {
			JSONObject obj = l.get(i);
			if (obj.getString("pid") == null) {
				obj.put("parentId", null);
			} else {
				obj.put("parentId", obj.getString("pid"));
			}
			l.set(i, obj);

		}
		responseData.putDataValue("rows", l);
		responseData.putDataValue("total", l.size());
		return responseData;
	}

	@RequestMapping(value = "/delete")
	@ResponseBody
	public ResponseData delete(HttpServletRequest request, String id) {
		ResponseData responseData = ResponseData.ok();
		int n = menuService.delete(id);
		return responseData;
	}

	@RequestMapping(value = "/add")
	@ResponseBody
	public ResponseData add(HttpServletRequest request, String name, String icon, String href, String pid, String sort,
			String isshow, String remark) {

		// 需要从session获取

		ResponseData responseData = ResponseData.ok();
		int n = menuService.insert(name, icon, href, pid, sort, isshow, remark);
		if (n != 1) {
			responseData = ResponseData.customerError();
			responseData.putDataValue("errors", "添加失败，请稍后再试");
		}
		return responseData;

	}
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public ResponseData update(HttpServletRequest request, String id,  String name, String icon, String href,  String sort,
			String isshow, String remark) {

		// 需要从session获取

		ResponseData responseData = ResponseData.ok();
		int n = menuService.update(id, name, icon, href, sort, isshow, remark);
		if (n != 1) {
			responseData = ResponseData.customerError();
			responseData.putDataValue("errors", "更新失败，请稍后再试");
		}
		return responseData;

	}

}
