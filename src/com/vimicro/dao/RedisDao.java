package com.vimicro.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.GpsInfo;
import com.vimicro.model.GpsTerminal;

@Repository("redisDao")
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class RedisDao {
	
	@Resource(name = "redisTemplate")
	private RedisTemplate<String, ?> redisTemplate;
	
	
	
	/**
	 * 新增  缓存 键值 定时过期
	 * ------------------------------<br>
	 * @param Map  key 键  value值  time 过期时间（秒）
	 * @return
	 */
	public boolean addCacheExpire(final String key, final String value, final Long time) {
		boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				connection.set(serializer.serialize("rzgis:cache:" + key), serializer.serialize(value));
				connection.expire(serializer.serialize("rzgis:cache:" + key), time);
				return true;
			}
		});
		return result;
	}

	
	/**
	 * 
	 * 根据ID获取cache
	 * 通过key获取 <br>
	 * ------------------------------<br>
	 * 
	 * @param keyId
	 * @return
	 */
	public String getCache(final String id) {
		String result = redisTemplate.execute(new RedisCallback<String>() {
			public String doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] keySearch = serializer.serialize("rzgis:cache:" + id);
				byte[] curUserInfoSer = connection.get(keySearch);
				return serializer.deserialize(curUserInfoSer);
			}
		});
		return result;
	}
	
	
	/**
	 * 根据id  判断是否存在cache
	 * @param keyId
	 * @return
	 */
	public boolean checkExistsCache(String id){
		boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				byte[] keySearch = serializer.serialize("rzgis:cache:" + id);
				return connection.exists(keySearch);
			}
		});
		return result;
	}
	
	
	/**
	 * 新增  GPS设备信息
	 * ------------------------------<br>
	 * @param Map 
	 * @return
	 */
	public boolean addGpsInfo( final List<GpsInfo> list) {
		boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				connection.openPipeline();
				for(GpsInfo gpsInfo : list){
					connection.set(serializer.serialize("rzgis:gps:" + gpsInfo.getGpsid()), serializer.serialize(JSON.toJSONString(gpsInfo)));
				}
				connection.closePipeline();
				return true;
			}
		});
		return result;
	}
	
	/**
	 * 
	 * 根据ID获取gpsInfo
	 * 通过key获取 <br>
	 * ------------------------------<br>
	 * 
	 * @param keyId
	 * @return
	 */
	public GpsInfo getGpsInfo(final String id) {
		try{
			String result = redisTemplate.execute(new RedisCallback<String>() {
				public String doInRedis(RedisConnection connection) throws DataAccessException {
					RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
					byte[] keySearch = serializer.serialize("rzgis:gps:" + id);
					byte[] cur = connection.get(keySearch);
					return serializer.deserialize(cur);
				}
			});
			if(result != null){
				return JSON.parseObject(result, GpsInfo.class);
			}else{
				return null;
			}
		}catch(Exception e ){
			return null;
		}
		
	}
	
	/**
	 * 根据GPSID  判断是否存在GpsInfo
	 */
	public boolean checkExistsGps(String id){
		try{
			boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
				public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
					RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
					byte[] keySearch = serializer.serialize("rzgis:gps:" + id);
					return connection.exists(keySearch);
				}
			});
			return result;
		}catch(Exception e){
			return false;
		}
	}
	
	
	
	/**
	 * 新增  GPS 在线信息
	 * ------------------------------<br>
	 * @param Map 
	 * @return
	 */
	public boolean addGpsTerminal( final GpsTerminal gt) {
		boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				connection.openPipeline();
				connection.set(serializer.serialize("rzgis:gpsonline:" + gt.getGpsId()), serializer.serialize(JSON.toJSONString(gt)));
				connection.closePipeline();
				return true;
			}
		});
		return result;
	}
	
	/**
	 * 
	 * 根据ID获取GpsTerminal
	 * 通过key获取 <br>
	 * ------------------------------<br>
	 * 
	 * @param keyId
	 * @return
	 */
	public GpsTerminal getGpsTerminal(final String id) {
		try{
			String result = redisTemplate.execute(new RedisCallback<String>() {
				public String doInRedis(RedisConnection connection) throws DataAccessException {
					RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
					byte[] keySearch = serializer.serialize("rzgis:gpsonline:" + id);
					byte[] cur = connection.get(keySearch);
					return serializer.deserialize(cur);
				}
			});
			if(result != null){
				return JSON.parseObject(result, GpsTerminal.class);
			}else{
				return null;
			}
		}catch(Exception e ){
			return null;
		}
	}
	
	
	/**
	 * 根据GPSID  判断是否存在GpsTerminal
	 */
	public boolean checkExistsGpsTerminal(String id){
		try{
			boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
				public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
					RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
					byte[] keySearch = serializer.serialize("rzgis:gpsonline:" + id);
					return connection.exists(keySearch);
				}
			});
			return result;
		}catch(Exception e){
			return false;
		}
	}
	
	
	/**
	 * 新增  布控信息列表
	 * ------------------------------<br>
	 * @param Map 
	 * @return
	 */
	public boolean addBkxx( final List<JSONObject> gt) {
		boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
			public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
				RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
				connection.openPipeline();
				connection.set(serializer.serialize("rzgis:bkxx:70297029402"), serializer.serialize(JSON.toJSONString(gt)));
				connection.closePipeline();
				return true;
			}
		});
		return result;
	}
	
	/**
	 * 
	 * 获取布控信息
	 * 通过key获取 <br>
	 * ------------------------------<br>
	 * 
	 * @param keyId
	 * @return
	 */
	public List<JSONObject> getBkxx() {
		try{
			String result = redisTemplate.execute(new RedisCallback<String>() {
				public String doInRedis(RedisConnection connection) throws DataAccessException {
					RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
					byte[] keySearch = serializer.serialize("rzgis:bkxx:70297029402");
					byte[] cur = connection.get(keySearch);
					return serializer.deserialize(cur);
				}
			});
			if(result != null){
				return JSON.parseArray(result, JSONObject.class);
			}else{
				return null;
			}
		}catch(Exception e ){
			return null;
		}
	}
	
	/**
	 */
	public boolean checkExistsBkxx(){
		try{
			boolean result = redisTemplate.execute(new RedisCallback<Boolean>() {
				public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
					RedisSerializer<String> serializer = redisTemplate.getStringSerializer();
					byte[] keySearch = serializer.serialize("rzgis:bkxx:70297029402");
					return connection.exists(keySearch);
				}
			});
			return result;
		}catch(Exception e){
			return false;
		}
	}
	
	
	
}
