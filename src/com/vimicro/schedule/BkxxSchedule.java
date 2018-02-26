package com.vimicro.schedule;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.vimicro.dao.AppDao;
import com.vimicro.dao.RedisDao;
import com.vimicro.web.webSocket.hndler.SystemSessionManager;

@EnableScheduling
@Component
public class BkxxSchedule {

	
	@Resource(name = "appDao")
	private AppDao appDao;
	
	@Resource(name = "redisDao")
	private RedisDao redisDao;
	
	public static SystemSessionManager sessionManager = SystemSessionManager.instance();
	
	
	@Scheduled(fixedRate = 1000*60)
	public void selectBkcl(){
		//return appDao.
		List<JSONObject> list = appDao.selectBkcl();
		sessionManager.sendMessageToAllUsers(new TextMessage(JSON.toJSONString(list)));
		redisDao.addBkxx(list);
	}
}
