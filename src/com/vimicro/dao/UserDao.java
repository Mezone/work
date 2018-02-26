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
@Repository("userDao")
public class UserDao {

	
	@Resource(name = "jdbcTemplate")
	private JdbcTemplate jdbcTemplate;
	
	private static Logger logger = Logger.getLogger(UserDao.class);

	
	public int validateUser(String userid){
		String sql = "select count(1) from sys_user where userid=?";
		return this.jdbcTemplate.queryForObject(sql, new String[]{userid}, Integer.class);
	}
	
	public int validateUser(String userid, String password){
		String sql = "select count(1) from sys_user where userid=? and password=?";
		return this.jdbcTemplate.queryForObject(sql, new String[]{userid, password}, Integer.class);
	}
	
	public User getUserInfo(String userid){
		String sql = "select t1.userid, t1.username, t1.password, t1.phone, (select orgcode from ez_r_org_user where userid=t1.userid ) orgcode, (select ZZJGQC from ez_org where code=((select orgcode from ez_r_org_user where userid=t1.userid ))) orgname, (select himage from T_IM_USER_INFO where userid=t1.userid) himage  from  sys_user t1 where userid=?";
		return (User) this.jdbcTemplate.queryForObject(sql,  new  RowMapper(){
			@Override
			public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				User eu = new User();
				//eu.setPassword(rs.getString("password"));
				eu.setPhone(rs.getString("phone"));
				eu.setOrgId(rs.getString("orgcode"));
				eu.setOrgName(rs.getString("orgname"));
				eu.setId(rs.getString("userid"));
				eu.setName(rs.getString("username"));
				return eu;
			}
		}, userid);
	}
	
	
	public int validateUserInfo(String userid){
		String sql = "select count(1) from T_IM_USER_INFO where userid=?";
		return this.jdbcTemplate.queryForObject(sql, new String[]{userid}, Integer.class);
	}
	
	
	public Long countUsers(String orgcode, String userid, String name, String phone, String idcard) {
		String sql = " select count(1) count from sys_user t where userid in ( select userid from SYS_R_USER_ORG where orgcode in ( select code from sys_org start with code = ? connect by prior code = pcode) ";
		sql += " ) and del_flag='0' ";

		if(!userid.equals("")) {
			sql += " and userid like '%"+userid+"%'";
		}
		if(!name.equals("")) {
			sql += " and name like '%"+name+"%'";
		}
		if(!phone.equals("")) {
			sql += " and phone like '%"+phone+"%'";
		}
		if(!idcard.equals("")) {
			sql += " and idcard like '%"+idcard+"%'";
		}
		
		return this.jdbcTemplate.queryForObject(sql, Long.class, orgcode);
	}
	
	public List<JSONObject> selectUsers(String orgcode, String userid, String name, String phone, String idcard, int start, int end){
		String sql = "select * from ( select t.*, (select mc from sys_org where code = (select orgcode from SYS_R_USER_ORG where userid=t.userid)) orgname, rownum rn from sys_user t where userid in ( select userid from SYS_R_USER_ORG where orgcode in ( select code from sys_org start with code = ? connect by prior code = pcode) ";
		sql +=  " ) and del_flag='0' and rownum <= ? ";
		
		if(!userid.equals("")) {
			sql += " and userid like '%"+userid+"%'";
		}
		if(!name.equals("")) {
			sql += " and name like '%"+name+"%'";
		}
		if(!phone.equals("")) {
			sql += " and phone like '%"+phone+"%'";
		}
		if(!idcard.equals("")) {
			sql += " and idcard like '%"+idcard+"%'";
		}
		sql += "  ) where rn > ? ";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("id", rs.getString("id"));
				eu.put("rn", rs.getString("rn"));
				eu.put("userid", rs.getString("userid"));
				eu.put("password", rs.getString("password"));
				eu.put("idcard", StringUtils.doEmpty(rs.getString("idcard")));
				eu.put("name", rs.getString("name"));
				eu.put("email", StringUtils.doEmpty(rs.getString("email")));
				eu.put("phone", StringUtils.doEmpty(rs.getString("phone")));
				eu.put("mobile", StringUtils.doEmpty(rs.getString("mobile")));
				eu.put("user_type", rs.getString("user_type"));
				eu.put("photo", StringUtils.doEmpty(rs.getString("photo")));
				eu.put("orgname", rs.getString("orgname"));

				return eu;
			}
		}, orgcode, end, start);
	}
	
	public int delUser(String id) {
		String sql = " update sys_user t set del_flag= '1' where id=?";

		return this.jdbcTemplate.update(sql, id);
	}
	
	public List<JSONObject> queryAllZzjg(){
		String sql = "select * from ez_org";
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("code", rs.getString("code"));
				eu.put("name", rs.getString("name"));
				eu.put("pyjs", rs.getString("pyjs"));
				return eu;
			}
		});
	}
	
	public int insert(String name, String userid, String password, String orgcode, String idcard, String email, String phone, String mobile, String usertype, String ipdz, String remarks, String createby) {
		String sql = " insert into SYS_USER(userid, password, idcard, name, email, phone, mobile, user_type, create_by, remarks) values(?,?,?,?,?,?,?,?,?,?)";
		return this.jdbcTemplate.update(sql, userid, password, idcard, name, email, phone, mobile, usertype, createby, remarks);
	}
	
	
	
	public int insertUserOrg(String userid, String orgcode) {
		String sql = "insert into SYS_R_USER_ORG(userid, orgcode) values(?, ?)";
		return this.jdbcTemplate.update(sql, userid, orgcode);
	}
	

}
