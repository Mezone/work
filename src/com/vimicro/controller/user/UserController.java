package com.vimicro.controller.user;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.vimicro.model.ResponseData;
import com.vimicro.model.User;
import com.vimicro.service.UserService;
import com.vimicro.utils.StringUtils;

/**
 * Created by Administrator on 2016/9/29.
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {

	@Resource(name = "userService")
	private UserService userService;

	@RequestMapping(value = "/user")
	public String user() {
		return "main/user/user";
	}

	@RequestMapping(value = "/zzjg")
	public String zzjg() {
		return "main/user/zzjg";
	}

	@RequestMapping(value = "/selectAllOrg")
	@ResponseBody
	public ResponseData selectAllOrg(HttpServletRequest request) {
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("orgList", userService.selectAllOrg());
		return responseData;
	}

	@RequestMapping(value = "/selectUsers")
	@ResponseBody
	public ResponseData selectUsers(HttpServletRequest request, int page, int limit, String orgcode, String orgjb,
			String name, String userid, String phone, String idcard) {
		name = StringUtils.doEmpty(name);
		userid = StringUtils.doEmpty(userid);
		phone = StringUtils.doEmpty(phone);
		idcard = StringUtils.doEmpty(idcard);
		orgcode = StringUtils.doEmpty(orgcode);

		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("code", "0");
		responseData.putDataValue("msg", " ");
		responseData.putDataValue("count", userService.countUsers(orgcode, userid, name, phone, idcard));
		responseData.putDataValue("data", userService.selectUsers(orgcode, userid, name, phone, idcard, page, limit));

		return responseData;
	}

	@RequestMapping(value = "/delUser")
	@ResponseBody
	public ResponseData delUser(String id) {
		ResponseData responseData = ResponseData.ok();
		int n = userService.delUser(id);
		if (n != 1) {
			responseData = ResponseData.customerError();
		}
		return responseData;
	}

	@RequestMapping(value = "/insert")
	@ResponseBody
	public ResponseData insert(HttpServletRequest request, String name, String userid, String password, String orgcode,
			String idcard, String email, String phone, String mobile, String usertype, String ipdz, String remarks) {
		name = StringUtils.doEmpty(name);
		userid = StringUtils.doEmpty(userid);
		password = StringUtils.doEmpty(password);
		orgcode = StringUtils.doEmpty(orgcode);
		idcard = StringUtils.doEmpty(idcard);
		email = StringUtils.doEmpty(email);
		phone = StringUtils.doEmpty(phone);
		mobile = StringUtils.doEmpty(mobile);
		usertype = StringUtils.doEmpty(usertype);
		ipdz = StringUtils.doEmpty(ipdz);
		remarks = StringUtils.doEmpty(remarks);

		// 需要从session获取
		String createby = "";
		ResponseData responseData = ResponseData.ok();
		if (userService.validateUser(userid) == 1) {
			responseData = ResponseData.customerError();
			responseData.putDataValue("errors", "用户名已存在，请重新输入");
		} else {
			int n = userService.insert(name, userid, password, orgcode, idcard, email, phone, mobile, usertype, ipdz,
					remarks, createby);
			if (n != 1) {
				responseData = ResponseData.customerError();
			}
		}

		return responseData;

	}

}
