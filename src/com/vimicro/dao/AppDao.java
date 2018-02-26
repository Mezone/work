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
import com.vimicro.model.User;
import com.vimicro.utils.StringUtils;

@Repository("appDao")
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class AppDao {
	
	@Resource(name = "jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

	public List<JSONObject> selectAllVideo(){
		String sql = " select * from T_VIDEO t where zbx is not null and zby is not null";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));

				eu.put("mc", rs.getString("mc"));
				eu.put("username", rs.getString("username"));
				eu.put("bmbh", rs.getString("bmbh"));
				eu.put("bmmc", rs.getString("bmmc"));

				eu.put("typemc", rs.getString("type"));
				eu.put("direction", rs.getString("direction"));
				eu.put("tdmc", rs.getString("tdmc"));
				eu.put("tdbmbh", rs.getString("tdbmbh"));
				eu.put("tdbh", rs.getString("tdbh"));

				eu.put("dm", rs.getString("dm"));
				eu.put("sspcsbh", rs.getString("sspcsbh"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));
				eu.put("jlbh", rs.getString("jlbh"));

				return eu;
			}
		});
	}
	
	public List<JSONObject> selectAllJcz(){
		String sql = " select * from T_JCZ t where zbx is not null and zby is not null";

		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("mc", rs.getString("mc"));
				eu.put("dz", rs.getString("dz"));
				eu.put("tdh", rs.getString("tdh"));
				eu.put("ssdwmc", rs.getString("ssdwmc"));
				eu.put("ssdwdm", rs.getString("ssdwdm"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));

				return eu;
			}
		});
	}
	
	public List<JSONObject> selectAllKk(){
		String sql = " select * from T_KK t where zbx is not null and zby is not null";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("mc", rs.getString("mc"));
				eu.put("dz", rs.getString("dz"));
				eu.put("tdh", rs.getString("tdh"));
				eu.put("ssdwmc", rs.getString("ssdwmc"));
				eu.put("ssdwdm", rs.getString("ssdwdm"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));
				eu.put("kkbh", rs.getString("kkbh"));

				return eu;
			}
		});
	}
	
	
	
	
	public List<JSONObject> selectAllVideo(String maxx, String minx, String maxy, String miny){
		String sql = " select * from T_VIDEO t where zbx between ? and ? and zby between ? and ?";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));

				eu.put("mc", rs.getString("mc"));
				eu.put("username", rs.getString("username"));
				eu.put("bmbh", rs.getString("bmbh"));
				eu.put("bmmc", rs.getString("bmmc"));

				eu.put("typemc", rs.getString("type"));
				eu.put("direction", rs.getString("direction"));
				eu.put("tdmc", rs.getString("tdmc"));
				eu.put("tdbmbh", rs.getString("tdbmbh"));
				eu.put("tdbh", rs.getString("tdbh"));

				eu.put("dm", rs.getString("dm"));
				eu.put("sspcsbh", rs.getString("sspcsbh"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));
				eu.put("jlbh", rs.getString("jlbh"));

				return eu;
			}
		}, minx, maxx, miny, maxy);
	}
	
	
	public List<JSONObject> selectAllJcz(String maxx, String minx, String maxy, String miny){
		String sql = " select * from T_JCZ t where zbx between ? and ? and zby between ? and ?";

		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("mc", rs.getString("mc"));
				eu.put("dz", rs.getString("dz"));
				eu.put("tdh", rs.getString("tdh"));
				eu.put("ssdwmc", rs.getString("ssdwmc"));
				eu.put("ssdwdm", rs.getString("ssdwdm"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));

				return eu;
			}
		}, minx, maxx, miny, maxy);
	}
	
	public List<JSONObject> selectAllKk(String maxx, String minx, String maxy, String miny){
		String sql = " select * from T_KK t where zbx between ? and ? and zby between ? and ?";
		
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("mc", rs.getString("mc"));
				eu.put("dz", rs.getString("dz"));
				eu.put("tdh", rs.getString("tdh"));
				eu.put("ssdwmc", rs.getString("ssdwmc"));
				eu.put("ssdwdm", rs.getString("ssdwdm"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));
				eu.put("kkbh", rs.getString("kkbh"));

				return eu;
			}
		}, minx, maxx, miny, maxy);
	}
	
	
	public List<JSONObject> selectBkcl(){
		String sql = " select tt.*, rownum rn from ( select rownum rn,  a.jlbh,a.hphm,b.bkkssj,b.bkyy,c.kkbh,c.mc kkmc,c.zbx,c.zby,a.jgsj,a.xsfx, d.name xsfxmc, a.zp   from t_cl_bkyj a,t_cl_bkxx b,t_kk c,dic_xsfx d   where a.hphm = b.hphm and a.kkbh = c.kkbh and a.xsfx = d.code and  a.hphm||to_char(a.jgsj, 'yyyymmddhh24miss') in ( select  hphm || to_char(max(jgsj), 'yyyymmddhh24miss') jgsj from T_CL_BKYJ aa where  aa.jgsj>sysdate-1/24  group by hphm ) order by jgsj desc ) tt";
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				eu.put("rn", rs.getString("rn"));
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("hphm", rs.getString("hphm"));
				eu.put("bkkssj", rs.getString("bkkssj"));
				eu.put("bkyy", rs.getString("bkyy"));
				eu.put("kkbh", rs.getString("kkbh"));
				eu.put("kkmc", rs.getString("kkmc"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));
				eu.put("jgsj", rs.getString("jgsj"));
				eu.put("xsfx", rs.getString("xsfx"));
				eu.put("xsfxmc", rs.getString("xsfxmc"));
				eu.put("zp", rs.getString("zp"));
				return eu;
			}
		});
	}
	
	
	public List<JSONObject> selectBkclLsgj(String hphm){
		String sql = " select rownum rn,  a.jlbh,a.hphm,b.bkkssj,b.bkyy,c.kkbh,c.mc kkmc,c.zbx,c.zby,a.jgsj,a.xsfx, d.name xsfxmc, a.zp   from t_cl_bkyj a,t_cl_bkxx b,t_kk c,dic_xsfx d   where a.hphm = b.hphm and a.kkbh = c.kkbh and a.xsfx = d.code and a.jgsj>sysdate-1/24  and a.hphm=?  order by jgsj ";
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				eu.put("rn", rs.getString("rn"));
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("hphm", rs.getString("hphm"));
				eu.put("bkkssj", rs.getString("bkkssj"));
				eu.put("bkyy", rs.getString("bkyy"));
				eu.put("kkbh", rs.getString("kkbh"));
				eu.put("kkmc", rs.getString("kkmc"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));
				eu.put("jgsj", rs.getString("jgsj"));
				eu.put("xsfx", rs.getString("xsfx"));
				eu.put("xsfxmc", rs.getString("xsfxmc"));
				eu.put("zp", rs.getString("zp"));
				return eu;
			}
		}, hphm);
	}
	
	public List<JSONObject> selectClxx(String hphm){
		String sql = "	  select  t.xh , t.hphm , t.clpp1 , t.syr  , t.sfzmhm , t.zsxxdz , t.sjhm from t_jjxt_jdcjbxx t where '鲁'||hphm = ?";
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				eu.put("xh", rs.getString("xh"));
				eu.put("hphm", StringUtils.doEmpty(rs.getString("hphm")));
				eu.put("clpp1", StringUtils.doEmpty(rs.getString("clpp1")));
				eu.put("syr", StringUtils.doEmpty(rs.getString("syr")));
				eu.put("sfzmhm", StringUtils.doEmpty(rs.getString("sfzmhm")));
				eu.put("zsxxdz", StringUtils.doEmpty(rs.getString("zsxxdz")));
				eu.put("sjhm", StringUtils.doEmpty(rs.getString("sjhm")));
				return eu;
			}
		}, hphm);
	}
	
	
	public List<JSONObject> selectJczGlJk(String jczid, String type){
		String sql = "	select t.spjkmc,t.tdh from t_jcz_video t where t.jczbh = ? and t.lx = ? ";
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				eu.put("spjkmc", rs.getString("spjkmc"));
				eu.put("tdh", rs.getString("tdh"));
				return eu;
			}
		}, jczid, type);
	}
	

	public List<JSONObject> selectZbcs(){
		String sql = " select * from T_ZBCS t ";
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("bt", rs.getString("bt"));
				eu.put("jb", rs.getString("jb"));
				eu.put("zbz", rs.getString("zbz"));
				return eu;
			}
		});
	}
	
	
	public List<JSONObject> selectJczZbry(String jczbh){
		String sql = " select * from T_JCZ_ZBRY t  where rq=to_char(sysdate, 'yyyymmdd') and jczbh=?";
		return this.jdbcTemplate.query(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("jczbh", rs.getString("jczbh"));
				eu.put("zbrxm", rs.getString("zbrxm"));
				eu.put("zbrdh", rs.getString("zbrdh"));
				eu.put("zbrlx", rs.getString("zbrlx"));
				eu.put("rq", rs.getString("rq"));

				return eu;
			}
		}, jczbh);
	}
	
	
	public JSONObject selectJczJrgc(String jczbh){
		String sql = " select * from T_JCZ_JRGC t  where rq=to_char(sysdate, 'yyyymmdd') and jczbh=?";
		return this.jdbcTemplate.queryForObject(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("jczbh", rs.getString("jczbh"));
				eu.put("gczs", rs.getString("gczs"));
				eu.put("jrjc", rs.getString("jrjc"));
				eu.put("rq", rs.getString("rq"));
				return eu;
			}
		}, jczbh);
	}
	
	public JSONObject getJczInfo(String jczbh){
		String sql = " select * from T_JCZ t where jlbh=?";
		return  this.jdbcTemplate.queryForObject(sql,  new  RowMapper<JSONObject>(){
			@Override
			public JSONObject mapRow(ResultSet rs, int rowNum) throws SQLException {
				// TODO Auto-generated method stub
				JSONObject eu = new JSONObject();
				//eu.setPassword(rs.getString("password"));
				eu.put("jlbh", rs.getString("jlbh"));
				eu.put("mc", rs.getString("mc"));
				eu.put("dz", rs.getString("dz"));
				eu.put("tdh", rs.getString("tdh"));
				eu.put("ssdwmc", rs.getString("ssdwmc"));
				eu.put("ssdwdm", rs.getString("ssdwdm"));
				eu.put("zbx", rs.getString("zbx"));
				eu.put("zby", rs.getString("zby"));

				return eu;
			}
		}, jczbh);
	}
	
	
	

	
	 
	
}
