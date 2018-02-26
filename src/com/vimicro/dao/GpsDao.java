package com.vimicro.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.GpsInfo;
import com.vimicro.utils.StringUtils;

@Repository("gpsDao")
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class GpsDao {
	
	@Resource(name = "jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

	public List<GpsInfo> selectAllGps(){
		String sql = "  select t.gpsid,t.carno,t.sim,t.ssdwmc,t.ssdwlx, t.icon from t_gps_device t  where t.icon <> 'czc'";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<GpsInfo>(){
			@Override
			public GpsInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				GpsInfo eu = new GpsInfo();
				//eu.setPassword(rs.getString("password"));
				eu.setGpsid( rs.getString("gpsid"));
				eu.setCarno(rs.getString("carno"));
				eu.setIcon(rs.getString("icon"));
				eu.setSim(rs.getString("sim"));
				eu.setSsdwlx(rs.getString("ssdwlx"));
				eu.setSsdwmc(rs.getString("ssdwmc"));
				
				return eu;
			}
		});
	}
}
