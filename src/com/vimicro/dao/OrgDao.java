package com.vimicro.dao;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2016/9/30.
 */
@Repository("orgDao")
public class OrgDao {

	
	@Resource(name = "jdbcTemplate")
	private JdbcTemplate jdbcTemplate;
	
	private static Logger logger = Logger.getLogger(OrgDao.class);

	
	public List<JSONObject> selectAllZzjg(){
		String sql = "select * from SYS_ORG  order by code, jb";
		logger.info(" queryAllZzjg  sql   " + sql);
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("code", rs.getString("code"));
				eu.put("mc", rs.getString("mc"));
				eu.put("pcode", rs.getString("pcode"));
				eu.put("jb", rs.getString("jb"));
				eu.put("sfyx", rs.getString("sfyx"));

				return eu;
			}
		});
	}
	
	public int validateByCode(String code) {
		String sql = "select count(1) count from sys_org where code =?";
		return this.jdbcTemplate.queryForObject(sql, new String[]{code}, Integer.class);
	}
	
	public int insert(String code, String mc, String pcode, int jb, String sfyx, String type) {
		String sql = "insert into sys_org(code, mc, pcode, jb, sfyx, type) values(?,?,?,?,?,?)";
		return this.jdbcTemplate.update(sql, code, mc, pcode, jb, sfyx, type);
	}
	
	public int delete(String code) {
		String sql = "delete from sys_org where code in ( select code from sys_org start with code = ? connect by prior code = pcode)";
		return this.jdbcTemplate.update(sql, code);
	}
	
	
	

}
