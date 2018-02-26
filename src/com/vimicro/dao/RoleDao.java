package com.vimicro.dao;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.User;
import com.vimicro.utils.StringUtils;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2016/9/30.
 */
@Repository("roleDao")
public class RoleDao {

	
	@Resource(name = "jdbcTemplate")
	private JdbcTemplate jdbcTemplate;
	
	private static Logger logger = Logger.getLogger(RoleDao.class);

	
	public Long countRole(String mc) {
		String sql = " select count(1) count from sys_role t ";

		return this.jdbcTemplate.queryForObject(sql, Long.class);
	}
	
	public List<JSONObject> selectRoles(String mc, int start, int end){
		String sql = "select * from ( select t.*,  rownum rn from (select * from sys_role order by create_date desc) t where rownum <= ?";
		sql += "  ) where rn > ? ";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("rn", rs.getString("rn"));
				eu.put("code", rs.getString("code"));
				eu.put("mc", rs.getString("mc"));
				eu.put("description", rs.getString("description"));
				eu.put("remarks", rs.getString("remarks"));

				return eu;
			}
		}, end, start);
	}
	
	public int delete(String code) {
		String sql = "delete from sys_role where code = ?";
		return this.jdbcTemplate.update(sql, code);
	}
	
	public int add(String mc, String description, String remark ) {
		String sql = "insert into SYS_ROLE(mc, description, remarks) values(?, ?, ?)";
		return this.jdbcTemplate.update(sql, mc, description, remark);
	}
	
	public int deleteRoleMenu(String code) {
		String sql = "delete from  SYS_R_ROLE_MENU where role_code=?";
		return this.jdbcTemplate.update(sql,code);
	}
	
	public int addRoleMenu(String code, String menuids[]) {
		 return this.jdbcTemplate.batchUpdate("insert into SYS_R_ROLE_MENU(role_code, menu_id) values(?,?)",
	                new BatchPreparedStatementSetter() {
	                    @Override
	                    public void setValues(PreparedStatement preparedStatement,
	                            int i) throws SQLException {
	                        preparedStatement.setObject(1, code);
	                        preparedStatement.setObject(2, menuids[i]);
	                    }
	 
	                    @Override
	                    public int getBatchSize() {
	                        return menuids.length;
	                    }
	                }).length;
	}
	
	public List<JSONObject> selectRoleMenus(String code){
		String sql = "select t.id, t.role_code, t.menu_id,  t1.name  from SYS_R_ROLE_MENU t  right join   sys_menu t1  on t.menu_id = t1.id where role_code= ?";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("id", rs.getString("id"));
				eu.put("role_code", rs.getString("role_code"));
				eu.put("menu_id", rs.getString("menu_id"));
				return eu;
			}
		}, code);
	}
	

}
