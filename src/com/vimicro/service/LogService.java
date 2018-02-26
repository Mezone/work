package com.vimicro.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.vimicro.dao.LogDao;

@Service("logService")
public class LogService {

	@Resource(name = "logDao")
	private LogDao logDao;

	public int addLog(String userid, String dwdm, String url, String param, String ip) {
		// TODO Auto-generated method stub
		return 0;
		//return logDao.addLog(userid, dwdm, url, param, ip);
	}

}
