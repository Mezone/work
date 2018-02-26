package com.vimicro.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.dao.MenuDao;
import com.vimicro.dao.RoleDao;
import com.vimicro.dao.UserDao;

@Service("roleService")
public class RoleService {



	@Resource(name = "roleDao")
	private RoleDao roleDao;
	
	public Long countRole(String mc) {
		return roleDao.countRole(mc);
	}
	
	public List<JSONObject> selectRoles(String mc, int page, int limit){
		return roleDao.selectRoles(mc, (page - 1) * limit, page * limit);
	}
	
	public int delete(String code) {
		return roleDao.delete(code);
	}
	
	public int add(String mc, String description, String remark ) {
		return roleDao.add(mc, description, remark);
	}
	
	public int addRoleMenu(String code, String menuids[]) {
		roleDao.deleteRoleMenu(code);
		return roleDao.addRoleMenu(code, menuids);
	}
	
	public List<JSONObject> selectRoleMenus(String code){
		return roleDao.selectRoleMenus(code);
	}
}
