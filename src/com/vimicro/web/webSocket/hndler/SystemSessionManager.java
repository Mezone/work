package com.vimicro.web.webSocket.hndler;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;

/**
 * WebSocket Session��������
 */
public class SystemSessionManager {
	/**
	 * session�е��û���Ϣ��
	 */

	private SystemSessionManager() {

	}

	public static SystemSessionManager instance() {
		return SingletonHolder.sessionManager;
	}

	private static class SingletonHolder {
		private static SystemSessionManager sessionManager = new SystemSessionManager();
	}

	public HashMap<String, WebSocketSession> userMapPc = new HashMap<String, WebSocketSession>();

	/**
	 * ����һ���û�session
	 * 
	 * @param userId
	 *            �û�id
	 * @param webSocketSession
	 * @param userType
	 *            �û�����
	 */
	public void put(String sessionid, WebSocketSession webSocketSession) {

		userMapPc.put(sessionid, webSocketSession);

	}

	/**
	 * 
	 * 
	 * @param webSocketSession
	 */
	public void remove(String sessionid) {
		userMapPc.remove(sessionid);
	}

	/**
	 * �ж��û��Ƿ�����
	 */
	public boolean checkUserOnLine(String userid) {
		if (userMapPc.get(userid) != null) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * ��ȡ�����û�
	 */
	public Map<String, WebSocketSession> getAllOnlineUsers() {
		return userMapPc;
	}

	/**
	 * �����������û�������Ϣ
	 * 
	 * @param user
	 *            ��˭���ģ�
	 * @param message
	 */
	public void sendMessageToAllUsers(TextMessage message) {

		for (Map.Entry<String, WebSocketSession> entry : this.userMapPc.entrySet()) {
			WebSocketSession session = entry.getValue();
			if (session.isOpen()) {
				try {
					//synchronized (session) {
						session.sendMessage(message);
				//	}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	/**
	 * ��ĳ���û�������Ϣ
	 * 
	 * @param userId
	 * @param message
	 */
	public void sendMessageToUser(String userId, TextMessage message) {
		WebSocketSession sessionpc = this.userMapPc.get(userId);
		if (sessionpc != null) {
			if (sessionpc.isOpen()) {
				try {
					sessionpc.sendMessage(message);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		/*
		 * WebSocketSession sessionmt = this.userMapMt.get(userId); if
		 * (sessionmt != null) { if (sessionmt.isOpen()) { try {
		 * sessionmt.sendMessage(message); } catch (IOException e) {
		 * e.printStackTrace(); } } }
		 */
	}

	/**
	 * ������û�������Ϣ
	 * 
	 * @param userId
	 * @param message
	 */
	public void sendMessageToUsers(List users, TextMessage message) {
		for (int i = 0; i < users.size(); i++) {
			String userId = users.get(i).toString();
			WebSocketSession sessionpc = this.userMapPc.get(userId);
			if (sessionpc != null) {
				if (sessionpc.isOpen()) {
					try {
						sessionpc.sendMessage(message);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
			/*
			 * WebSocketSession sessionmt = this.userMapMt.get(userId); if
			 * (sessionmt != null) { if (sessionmt.isOpen()) { try {
			 * sessionmt.sendMessage(message); } catch (IOException e) {
			 * e.printStackTrace(); } } }
			 */
		}

	}

	/**
	 * �������û�������Ϣ���������Լ���
	 * 
	 * @param userId
	 * @param message
	 */
	public void sendMessageToOtherUsers(String userid, TextMessage message) {
		for (Map.Entry<String, WebSocketSession> entry : this.userMapPc.entrySet()) {
			if (!(entry.getKey().equals(userid))) {
				WebSocketSession session = entry.getValue();
				if (session.isOpen()) {
					try {
					//	synchronized (session) {
							session.sendMessage(message);
					//	}
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}

		}
		/*
		 * WebSocketSession sessionmt = this.userMapMt.get(userId); if
		 * (sessionmt != null) { if (sessionmt.isOpen()) { try {
		 * sessionmt.sendMessage(message); } catch (IOException e) {
		 * e.printStackTrace(); } } }
		 */
	}

}
