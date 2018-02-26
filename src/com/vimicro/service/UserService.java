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

@Service("userService")
public class UserService{

    @Resource(name = "userDao")
    private UserDao userDao;


    @Resource(name = "orgDao")
    private OrgDao orgDao;
    
    public List<JSONObject> selectAllOrg(){
    	return orgDao.selectAllZzjg();
    }
    
    public Long countUsers(String orgcode, String userid, String name, String phone, String idcard) {
    	return userDao.countUsers(orgcode, userid, name, phone, idcard);
    }
    
    public List<JSONObject> selectUsers(String orgcode, String userid, String name, String phone, String idcard, int page, int limit){
    	return userDao.selectUsers(orgcode, userid, name, phone, idcard, (page - 1) * limit, page * limit);
    }
    
    public User findByUP(String userid, String password) {
    	try{
    		int count = userDao.validateUser(userid, password);
    		if(count == 1){
    			User user =  new User();//userDao.getUserInfo(userid);
    			return user;
    		}else{
    			return null;
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    	}
        return null;
    }
    
	public int delUser(String id) {
		return userDao.delUser(id);
	}
	
	public int validateUser(String userid) {
		return userDao.validateUser(userid);
	}
	
	public int insert(String name, String userid, String password, String orgcode, String idcard, String email, String phone, String mobile, String usertype, String ipdz, String remarks, String createby) {
		
		int n = userDao.insert(name, userid, password, orgcode, idcard, email, phone, mobile, usertype, ipdz, remarks, createby);
		if(n == 1) {
			return userDao.insertUserOrg(userid, orgcode);
		}else {
			return 0;
		}
	}
		
   
}
