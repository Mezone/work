package com.vimicro.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import org.apache.log4j.Logger;

public class SystemConfigs {
	private SystemConfigs() {
		try {
			this.properties = new Properties();
			InputStream is = getClass().getResourceAsStream("/config.properties");
			this.properties.load(new InputStreamReader(is, "UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
			Logger log4j = Logger.getRootLogger();
			log4j.error(e.getMessage(), e);
		}
	}

	/***************************************************************************
	 * 同步获得系统配置信息的实例
	 * 
	 * @return
	 */
	public static synchronized SystemConfigs newInstance() {
		if (sConfigs != null) {
			return sConfigs;
		}
		sConfigs = new SystemConfigs();
		return sConfigs;
	}

	/**
	 * 获得配置性信息
	 * 
	 * @param propertyName
	 *            配置字段名
	 * @param defaultValue
	 *            默认信息
	 * @return
	 */
	public String getProperty(String propertyName, String defaultValue) {
		return this.properties.getProperty(propertyName, defaultValue);
	}

	/**
	 * 获得配置性信息
	 * 
	 * @param propertyName
	 *            配置字段名
	 * @return
	 */
	public String getProperty(String propertyName) {
		return this.properties.getProperty(propertyName);
	}

	private static SystemConfigs sConfigs = null;// 服务器配置
	private Properties properties;// 配置信息

	private static final String getUseRedis = SystemConfigs.newInstance().getProperty("useRedis") != null ? SystemConfigs.newInstance().getProperty("useRedis") : "0";

	/*
	 * 是否使用redis，不使用：!=1，使用：==1
	 */
	public static String getUseRedis() {
		return getUseRedis;
	}
}
