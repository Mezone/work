package com.vimicro.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.easymap.management.api.UserManager;
import com.easymap.management.entity.Function;
import com.easymap.management.entity.Role;
import com.easymap.management.newapi.FunctionManager;
import com.easymap.management.newapi.RoleManager;
import com.vimicro.AppConfig;
import com.vimicro.dao.OrgDao;
import com.vimicro.dao.UserDao;
import com.vimicro.model.User;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("orgService")
public class OrgService{

    @Resource(name = "userDao")
    private UserDao userDao;


    @Resource(name = "orgDao")
    private OrgDao orgDao;
    
    public List<JSONObject> selectAllOrg(){
    	return orgDao.selectAllZzjg();
    }
    
	public int delete(String code) {
		return orgDao.delete(code);
	}
	
	public int insert(String code, String mc, String pcode, int jb, String sfyx, String type) {
		return orgDao.insert(code, mc, pcode, jb, sfyx, type);
	}
	
	public int validateByCode(String code) {
		return orgDao.validateByCode(code);
	}
	
		
   
}
