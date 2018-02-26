package com.vimicro.delegate;

import java.io.Serializable;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.web.socket.TextMessage;

import com.alibaba.fastjson.JSON;
import com.vimicro.dao.RedisDao;
import com.vimicro.model.GpsTerminal;
import com.vimicro.web.webSocket.hndler.GpsSessionManager;

public class RedisKeyExpiredMessageDelegate implements MessageListener {

	@Resource(name = "redisDao")
	private RedisDao redisDao;
	
	public static GpsSessionManager sessionManager = GpsSessionManager.instance();
	
	@Override
	public void onMessage(Message message, byte[] pattern) {
		// TODO Auto-generated method stub
		String id = new String(message.getBody());
		id = id.split(":")[2];
		System.out.println("GPS: " + id + "   下线");
		if(redisDao.checkExistsGpsTerminal(id)){
			GpsTerminal gt = redisDao.getGpsTerminal(id);
			gt.setOnLine("offline");
			//System.out.println(JSON.toJSONString(gt));
			sessionManager.sendMessageToAllUsers(new TextMessage(JSON.toJSONString(gt)));
		}
		
	}


}
