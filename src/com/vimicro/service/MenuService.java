package com.vimicro.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.dao.MenuDao;
import com.vimicro.dao.UserDao;

@Service("menuService")
public class MenuService {

	@Resource(name = "userDao")
	private UserDao userDao;


	@Resource(name = "menuDao")
	private MenuDao menuDao;
	
	public List<JSONObject> selectAllMenu() {
		return menuDao.selectAllMenu();
	}
	
	public int delete(String id) {
		return menuDao.delete(id);
	}
	
	public int insert(String name,String icon,String href,String pid,String sort,String isshow,String remark) {
		return menuDao.insert(name, icon, href, pid, sort, isshow, remark);
	}
	
	public int update(String id, String name,String icon,String href, String sort,String isshow,String remark) {
		return menuDao.update(id, name, icon, href, sort, isshow, remark);
	}
		

}
