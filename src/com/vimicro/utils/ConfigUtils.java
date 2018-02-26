package com.vimicro.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.log4j.Logger;

import java.io.*;

/**
 * Created by Administrator on 2016/9/29.
 */
public class ConfigUtils {

    private static final Logger LOG = Logger.getLogger(ConfigUtils.class);

    private JSONObject configJSONObject;

    public ConfigUtils(){
        loadConfig("config.json");
    }

    private void loadConfig(String conf){
        InputStream is = null;
        BufferedReader br = null;
        try {
            is = getInputStream(conf);
            if (null != is) {
                StringBuilder sb = new StringBuilder();
                br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                String line;
                while((line = br.readLine()) != null){
                    sb.append(line);
                    sb.append("\r\n");
                }
                configJSONObject = JSON.parseObject(sb.toString());
            }
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
    }

    private InputStream getInputStream(String path) throws FileNotFoundException {
        InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(path);
        if (null == is) {
            throw new FileNotFoundException(path + " cannot be opened because it does not exist");
        }
        return is;
    }

    public JSONObject getConfigJSONObject() {
        return configJSONObject;
    }

}
