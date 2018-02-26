package com.vimicro.controller;

import com.alibaba.fastjson.JSON;
import com.vimicro.AppConst;
import com.vimicro.model.ResponseData;
import com.vimicro.model.User;
import com.vimicro.service.UserService;
import com.vimicro.utils.JWTUtil;
import com.vimicro.utils.StringUtils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2016/9/30.
 */
@Controller
@RequestMapping(value = "/passport")
public class LoginController {

    @Resource(name = "userService")
    private UserService userService;
    
    private String superUser;

    @RequestMapping
    public String passport(String back, ModelMap modelMap){
        modelMap.put("back", back);
        return "login";
    }

    /**
     * 登录校验
     * @param username
     * @param password
     * @return
     */
    @RequestMapping(value = "/login")
    @ResponseBody
    public ResponseData login(HttpServletRequest request, String userid, String password){
    	System.out.println(superUser + "   " + userid + "," + password);
    	String u = superUser.split(",")[0];
    	String p = superUser.split(",")[1];

    	ResponseData responseData = ResponseData.ok();
    	User user = null;
    	if(userid.equals(u) && password.equals(p)) {
    		user = new User();
    		user.setName("超级管理员");
    	}else {
    		//先到数据库验证
            user = userService.findByUP(userid, password);
            if(null != user) {
                //给用户jwt加密生成token
               // String token = JWTUtil.createJWT(JSON.toJSONString(user));
                //封装成对象返回给客户端
                //responseData.putDataValue("token", token);
            	request.getSession().setAttribute("user", user);
                responseData.putDataValue("user", user);
            }
            else{
                responseData =  ResponseData.customerError().putDataValue(ResponseData.ERRORS_KEY, "用户名或密码错误");
            }   
    	}
         return responseData;
    }
    
  
    

    @RequestMapping(value = "/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().removeAttribute(AppConst.USER_SESSION);
        return "redirect:/redirect";
    }

}
