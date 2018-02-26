package com.vimicro.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.vimicro.model.ResponseData;
import com.vimicro.utils.StringUtils;

/**
 * Created by Administrator on 2016/9/29.
 */
@Controller
public class IndexController {

    @RequestMapping(value = "")
    public String domain(){
    	System.out.println("domain");

        return "redirect:/redirect";
    }

    @RequestMapping(value = "/redirect")
    public String redirect(){
    	System.out.println("redirect");
        return "redirect";
    }
    
	@RequestMapping(value = "/query")
	@ResponseBody
	public ResponseData query(HttpServletRequest request, String table, String key) {
		key = StringUtils.doEmpty(key);
		ResponseData responseData = ResponseData.ok();
		Map map = new HashMap();
		map.put("ttt", "23123123");
		map.put("222", "4444444444423123123");
		map.put("3333", "111123123123");

		responseData.putDataValue("res", map);
		System.out.println(JSON.toJSONString(responseData));
		return responseData;
	}

}
