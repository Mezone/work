package com.vimicro.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.vimicro.dao.AppDao;
import com.vimicro.dao.GpsDao;
import com.vimicro.web.webSocket.hndler.GpsSessionManager;
import com.vimicro.web.webSocket.hndler.SystemSessionManager;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.Polygon;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;

@Service("appService")
public class AppService {
	
	@Resource(name = "appDao")
	private AppDao appDao;
	

	public List<JSONObject> selectAllVideo(){
		return appDao.selectAllVideo();
	}
	
	public List<JSONObject> selectAllJcz(){
		return appDao.selectAllJcz();
	}

	public List<JSONObject> selectAllKk(){
		return appDao.selectAllKk();
	}
	
	
	public List<JSONObject> selectAllVideo(String coords){
		String coordArray[] = coords.split(",");
		String maxX=null,  minX=null,  maxY=null,  minY=null;
		String polygonString = "";
		for(int i = 0;i < coordArray.length;i++){
			if(i % 2 == 0){
				polygonString += coordArray[i]+ " ";
				if(maxX == null){
					maxX = coordArray[i];
				} else {
					if(maxX.compareTo(coordArray[i]) < 0){
						maxX = coordArray[i];
					} 
				}
				if(minX == null){
					minX = coordArray[i];
				} else {
					if(minX.compareTo(coordArray[i]) > 0){
						minX = coordArray[i];
					} 
				}
			}else{
				polygonString += coordArray[i]+ ",";
				if(maxY == null){
					maxY = coordArray[i];
				} else {
					if(maxY.compareTo(coordArray[i]) < 0){
						maxY = coordArray[i];
					} 
				}
				if(minY == null){
					minY = coordArray[i];
				} else {
					if(minY.compareTo(coordArray[i]) > 0){
						minY = coordArray[i];
					} 
				}
			}
		}
		polygonString = polygonString.substring(0, polygonString.length()-1);
		
		System.out.println(polygonString);
		
		List<JSONObject>  returnList = new ArrayList();

		WKTReader wrdr = new WKTReader();
		try {
			List<JSONObject> list = appDao.selectAllVideo(maxX, minX, maxY, minY);
			Polygon geo = (Polygon) wrdr.read("POLYGON ((" + polygonString + "))");
			if(list != null){
				for (JSONObject vk : list) {
					Geometry point=  wrdr.read("POINT (" + vk.getString("zbx") + " " + vk.getString("zby") + ")");
					if(geo.contains(point)){
						returnList.add(vk);
					}
				}
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return returnList;
	}
	
	public List<JSONObject> selectAllJcz(String coords){
		String coordArray[] = coords.split(",");
		String maxX=null,  minX=null,  maxY=null,  minY=null;
		String polygonString = "";
		for(int i = 0;i < coordArray.length;i++){
			if(i % 2 == 0){
				polygonString += coordArray[i]+ " ";
				if(maxX == null){
					maxX = coordArray[i];
				} else {
					if(maxX.compareTo(coordArray[i]) < 0){
						maxX = coordArray[i];
					} 
				}
				if(minX == null){
					minX = coordArray[i];
				} else {
					if(minX.compareTo(coordArray[i]) > 0){
						minX = coordArray[i];
					} 
				}
			}else{
				polygonString += coordArray[i]+ ",";
				if(maxY == null){
					maxY = coordArray[i];
				} else {
					if(maxY.compareTo(coordArray[i]) < 0){
						maxY = coordArray[i];
					} 
				}
				if(minY == null){
					minY = coordArray[i];
				} else {
					if(minY.compareTo(coordArray[i]) > 0){
						minY = coordArray[i];
					} 
				}
			}
		}
		polygonString = polygonString.substring(0, polygonString.length()-1);
		
		List<JSONObject>  returnList = new ArrayList();

		WKTReader wrdr = new WKTReader();
		try {
			List<JSONObject> list = appDao.selectAllJcz(maxX, minX, maxY, minY);
			Polygon geo = (Polygon) wrdr.read("POLYGON ((" + polygonString + "))");
			if(list != null){
				for (JSONObject vk : list) {
					Geometry point=  wrdr.read("POINT (" + vk.getString("zbx") + " " + vk.getString("zby") + ")");
					if(geo.contains(point)){
						returnList.add(vk);
					}
				}
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return returnList;
	}
	
	public List<JSONObject> selectAllKk(String coords){
		String coordArray[] = coords.split(",");
		String maxX=null,  minX=null,  maxY=null,  minY=null;
		String polygonString = "";
		for(int i = 0;i < coordArray.length;i++){
			if(i % 2 == 0){
				polygonString += coordArray[i]+ " ";
				if(maxX == null){
					maxX = coordArray[i];
				} else {
					if(maxX.compareTo(coordArray[i]) < 0){
						maxX = coordArray[i];
					} 
				}
				if(minX == null){
					minX = coordArray[i];
				} else {
					if(minX.compareTo(coordArray[i]) > 0){
						minX = coordArray[i];
					} 
				}
			}else{
				polygonString += coordArray[i]+ ",";
				if(maxY == null){
					maxY = coordArray[i];
				} else {
					if(maxY.compareTo(coordArray[i]) < 0){
						maxY = coordArray[i];
					} 
				}
				if(minY == null){
					minY = coordArray[i];
				} else {
					if(minY.compareTo(coordArray[i]) > 0){
						minY = coordArray[i];
					} 
				}
			}
		}
		polygonString = polygonString.substring(0, polygonString.length()-1);
		
		List<JSONObject>  returnList = new ArrayList();

		WKTReader wrdr = new WKTReader();
		try {
			List<JSONObject> list = appDao.selectAllKk(maxX, minX, maxY, minY);
			Polygon geo = (Polygon) wrdr.read("POLYGON ((" + polygonString + "))");
			if(list != null){
				for (JSONObject vk : list) {
					Geometry point=  wrdr.read("POINT (" + vk.getString("zbx") + " " + vk.getString("zby") + ")");
					if(geo.contains(point)){
						returnList.add(vk);
					}
				}
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return returnList;
	}
	
	
	public List<JSONObject> selectBkclLsgj(String hphm){
		return appDao.selectBkclLsgj(hphm);

	}
	
	public List<JSONObject> selectClxx(String hphm){
		return appDao.selectClxx(hphm);
	}
	
	public List<JSONObject> selectJczGlJk(String jczid, String type){
		return appDao.selectJczGlJk(jczid,  type);

	}

	
	public JSONObject selectZbcs(){
		String sql = " select * from T_ZBCS t ";
		List<JSONObject> list = appDao.selectZbcs();
		JSONObject jsonObject = new JSONObject();
		
		for(int i=0; i<list.size(); i++){
			JSONObject obj = list.get(i);
			String key = obj.getString("jb");
			if(jsonObject.containsKey(key)){
				JSONArray arr = jsonObject.getJSONArray(key);
				arr.add(obj);
				jsonObject.put(key, arr);
			}else{
				JSONArray arr = new JSONArray();
				arr.add(obj);
				jsonObject.put(key, arr);
			}
			
		}
		return jsonObject;
	}
	
	
	public List<JSONObject> selectJczZbry(String jczbh){
		return appDao.selectJczZbry(jczbh);
	}
	
	
	public JSONObject selectJczJrgc(String jczbh){
		return appDao.selectJczJrgc(jczbh);
	}
	
	public JSONObject getJczInfo(String jczbh){
		return appDao.getJczInfo(jczbh);
	}
	
	
}
