package com.vimicro.dao;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.User;
import com.vimicro.utils.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2016/9/30.
 */
@Repository("menuDao")
public class MenuDao {

	
	@Resource(name = "jdbcTemplate")
	private JdbcTemplate jdbcTemplate;
	
	private static Logger logger = Logger.getLogger(OrgDao.class);

	
	public List<JSONObject> selectAllMenu(){
		String sql = "select t.*, level from sys_menu t  start with pid is null connect by prior t.id =  t.pid  order by  pid nulls first,  sort";
		logger.info(" queryAllZzjg  sql   " + sql);
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("id", rs.getString("id"));
				eu.put("pid", rs.getString("pid"));
				eu.put("name", rs.getString("name"));
				eu.put("sort", rs.getString("sort"));
				eu.put("href", rs.getString("href"));
				eu.put("icon", rs.getString("icon"));
				eu.put("isshow", rs.getString("is_show"));
				eu.put("remarks", rs.getString("remarks"));
				eu.put("level", rs.getString("level"));
				System.out.println(eu.toJSONString());;
				return eu;
			}
		});
	}
	
	public int validateByCode(String code) {
		String sql = "select count(1) count from sys_org where code =?";
		return this.jdbcTemplate.queryForObject(sql, new String[]{code}, Integer.class);
	}
	
//	PID	83E0D6EBA29C4DCEBADED4B6F74702BC	父节点
//	NAME	运维3_1	名称
//	SORT	1	排序
//	HREF		菜单地址
//	ICON		图标
//	IS_SHOW	0	是否显示 0 显示  1 不显示
//	REMARKS		备注

	public int insert(String name,String icon,String href,String pid,String sort,String isshow,String remark) {
		String sql = "insert into sys_menu(pid, name, sort, href, icon, is_show, remarks) values(?,?,?,?,?,?, ?)";
		return this.jdbcTemplate.update(sql, pid, name, sort, href, icon, isshow, remark);
	}
	
	public int delete(String id) {
		String sql = "delete from sys_menu where id in ( select id from sys_menu start with id = ? connect by prior id = pid)";
		return this.jdbcTemplate.update(sql, id);
	}
	
	public int update(String id, String name,String icon,String href, String sort,String isshow,String remark) {
		String sql = "update sys_menu set name=?, sort=?, href=?, icon=?, is_show=?, remarks=? where id=?";
		return this.jdbcTemplate.update(sql,  name, sort, href, icon, isshow, remark, id);
	}
	

}
