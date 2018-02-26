package com.vimicro.model;


import java.util.Date;
import java.util.Map;

public class GpsTerminal {
	private String head;
	private String command;
	private String version;
	private int bodysize;
	private String gpsId;
	private double x;
	private double y;
	private int speed;
	private int direct;
	private int state;
	private int msgType;
	private int height;
	private int accuracy;
	private String date;
	private String onLine;
	private Date sysTime;
	private GpsInfo gpsInfo;

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public String getCommand() {
		return command;
	}

	public void setCommand(String command) {
		this.command = command;
	}

	public String getGpsId() {
		return gpsId;
	}

	public void setGpsId(String gpsId) {
		this.gpsId = gpsId;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
	}

	public int getDirect() {
		return direct;
	}

	public void setDirect(int direct) {
		this.direct = direct;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getMsgType() {
		return msgType;
	}

	public void setMsgType(int msgType) {
		this.msgType = msgType;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getOnLine() {
		return onLine;
	}

	public void setOnLine(String onLine) {
		this.onLine = onLine;
	}


	public Date getSysTime() {
		return sysTime;
	}

	public void setSysTime(Date sysTime) {
		this.sysTime = sysTime;
	}
	
	public GpsInfo getGpsInfo() {
		return gpsInfo;
	}

	public void setGpsInfo(GpsInfo gpsInfo) {
		this.gpsInfo = gpsInfo;
	}

	public String toString() {
		return "HEAD:" + this.head + " CMD:" + this.command  + " GPSID:" + this.gpsId + " X:" + this.x
				+ " Y:" + this.y + " Date:" + this.date + " Speed:";
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public int getBodysize() {
		return bodysize;
	}

	public void setBodysize(int bodysize) {
		this.bodysize = bodysize;
	}

	public int getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(int accuracy) {
		this.accuracy = accuracy;
	}
	
	
	
	
}
