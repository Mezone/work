package com.vimicro;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;

import java.io.*;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

/**
 * Created by Administrator on 2017/1/13.
 */
public class AppConfig {

    private static final Logger LOG = Logger.getLogger(AppConfig.class);

    private static JSONObject config = null;

    static {
        config = loadConfig("config.properties");
    }
    
    
    private static JSONObject loadConfig(String conf) {
    	
    	
        InputStream is = null;
        BufferedReader br = null;
        Properties properties = new Properties();
        try {
        	is =  getInputStream(conf);
        	properties.load(is);
        	Iterator it = properties.entrySet().iterator();
        	Map map = new HashMap();
        	while(it.hasNext()){
        		Entry entry = (Entry) it.next();
        		map.put(entry.getKey(), entry.getValue());
        	}
        	 return (JSONObject) JSON.toJSON(map);
        } catch (IOException e) {
            LOG.error("Exception happend in loadConfig " + conf, e);
        } finally {
            if (null != br) {
                try {
                    br.close();
                } catch (IOException e) {
                    LOG.error("Exception happened in loadConfig() " + conf, e);
                }
            }
            if(null != is){
                try {
                    is.close();
                } catch (IOException e) {
                    LOG.error("Exception happened in loadConfig() " + conf, e);
                }
            }
        }
        return new JSONObject();
    }

    private static InputStream getInputStream(String path) throws FileNotFoundException {
        InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(path);
        if (null == is) {
            throw new FileNotFoundException(path + " cannot be opened because it does not exist");
        }
        return is;
    }

    public static JSONObject getConfig() {
        return config;
    }

    public static String getString(String key){
        return config.getString(key);
    }

}
