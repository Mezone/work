/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vimicro.web.webSocket.hndler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.alibaba.fastjson.JSON;


/**
 *
 * @author zhao_yueyue
 */
@Component
public class GpsWebSocketHandler implements WebSocketHandler {

    private GpsSessionManager sessionManager = GpsSessionManager.instance();


	@Override
    public void afterConnectionEstablished(WebSocketSession wss) {
        	sessionManager.put(wss.getId(), wss);
        	
    }

    @Override
    public void handleMessage(WebSocketSession wss, WebSocketMessage<?> wsm) throws Exception {
    	//System.out.println(wsm.getPayload());

    }

    @Override
    public void handleTransportError(WebSocketSession wss, Throwable thrwbl) throws Exception {
        sessionManager.remove(wss.getId());
        	
        if(wss.isOpen()){
            wss.close();
        }
       System.out.println("websocket connection closed......");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession wss, CloseStatus cs) throws Exception {
    	 sessionManager.remove(wss.getId());
        System.out.println("websocket connection closed......");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
    
}
