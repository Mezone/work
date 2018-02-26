package com.vimicro.controller.org;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.ResponseData;
import com.vimicro.service.OrgService;
import com.vimicro.service.UserService;
import com.vimicro.utils.StringUtils;

/**
 * Created by Administrator on 2016/9/29.
 */
@Controller
@RequestMapping(value = "/org")
public class OrgController {

	@Resource(name = "orgService")
	private OrgService orgService;

	@RequestMapping(value = "/org")
	public String user() {
		return "main/org/org";
	}
	
	@RequestMapping(value = "/selectAllOrg")
	@ResponseBody
	public ResponseData selectAllOrg(HttpServletRequest request) {
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("orgList", orgService.selectAllOrg());
		
		return responseData;
	}
	
	@RequestMapping(value = "/selectAllOrgTreeView")
	@ResponseBody
	public ResponseData selectAllOrgTreeView(HttpServletRequest request) {
		ResponseData responseData = ResponseData.ok();
		List<JSONObject> l = orgService.selectAllOrg();
		int tem = 0;
		for(int i=0; i<l.size(); i++) {
			JSONObject obj = l.get(i);
			if(i==0) {
				tem = obj.getIntValue("jb") ;
			}
			if(obj.getString("pcode") == null) {
				obj.put("parentId", null);
			}else {
				obj.put("parentId", obj.getString("pcode"));
			}
			obj.put("id", obj.getString("code"));
			obj.put("level", obj.getIntValue("jb") - tem + 1);
			l.set(i, obj);
			
		}
		responseData.putDataValue("rows", l);
		responseData.putDataValue("total", l.size());
		return responseData;
	}
	
	@RequestMapping(value = "/delete")
	@ResponseBody
	public ResponseData delete(HttpServletRequest request, String code) {
		ResponseData responseData = ResponseData.ok();
		int n = orgService.delete(code);
		return responseData;
	}
	
	@RequestMapping(value = "/add")
	@ResponseBody
	public ResponseData add(HttpServletRequest request, String code, String mc, String type, String pcode, int pjb, String sfyx) {
		int jb = pjb + 1;
		

		// 需要从session获取
		
		ResponseData responseData = ResponseData.ok();
		if (orgService.validateByCode(code) == 1) {
			responseData = ResponseData.customerError();
			responseData.putDataValue("errors", "机构代码已存在，请重新输入");
		} else {
			int n = orgService.insert(code, mc, pcode, jb, sfyx, type);
			if (n != 1) {
				responseData = ResponseData.customerError();
				responseData.putDataValue("errors", "添加失败，请稍后再试");
			}
		}
		return responseData;
		
	}
	

}
