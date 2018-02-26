package com.vimicro.utils;


import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.swing.JTextArea;

import org.apache.log4j.Logger;
import org.apache.mina.core.buffer.IoBuffer;
import org.springframework.web.socket.TextMessage;

import com.alibaba.fastjson.JSON;


public class GpsTrans {
	
	private static Logger logger = Logger.getLogger(GpsTrans.class);
	
	
	public static Map gpsInfo = new HashMap();
	
	
	public static boolean isContainId(String id){
		//System.out.println(gpsID.containsKey(id));
		if(gpsInfo.containsKey(id)){
			return true;
		}
		return false;
	}

	/**
	 * ����ͷ��Ϣ
	 * 
	 * @param b
	 * @return
	 */
	public static String readHead(byte[] b) {
		return higherBytes2HexString(b);
	}

	/**
	 * ����������
	 * 
	 * @return
	 */
	public static String readCommand(byte[] b) {
		return higherBytes2HexString(b);
	}
	
	/**
	 * ���ذ汾��Ϣ
	 * 
	 * @return
	 */
	public static String readVersion(byte[] b) {
		return higherBytes2HexString(b);
	}

	/**
	 * ���ذ����С
	 * 
	 * @param b
	 *            4�ֽ�
	 * @return
	 */
	public static int readBodySize(byte[] b) {
		return lowerBytes2Int(b);
	}

	/**
	 * �����ն˱��  �ϰ汾   aa00
	 * 
	 * @param b
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public static String readTerminalId(byte[] b) throws UnsupportedEncodingException {
		StringBuilder id = new StringBuilder();
		for(int i=0; i< b.length; i++){
			if(b[i]< 10){
				id.append("0" + b[i]);
			}else{
				id.append(b[i]);
			}
		}
		return ""+Long.parseLong(id.toString());
		//return bytesToCharString(b);
	}
	
	/**
	 * �����ն˱��  �°汾   aaaa
	 * 
	 * @param b
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public static String readTerminalIdNew(byte[] b) {
		try {
			String id = new String(b, "GBK");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bytesToCharString(b);
	}


	/**
	 * ����X
	 * 
	 * @param b
	 * @return
	 */
	public static double readX(byte[] b) {
		return bytesToDouble(b);
	}

	/**
	 * ����Y
	 * 
	 * @param b
	 * @return
	 */
	public static double readY(byte[] b) {
		return bytesToDouble(b);
	}

	/**
	 * �����ٶ�
	 * 
	 * @param b
	 * @return
	 */
	public static int readSpeed(byte[] b) {
		String hexS = lowerBytes2HexString(b);
		return Integer.parseInt(hexS, 16);
	}
	

	/**
	 * ���ط���
	 * 
	 * @param b
	 * @return
	 */
	public static int readDirect(byte[] b) {
		String hexS = lowerBytes2HexString(b);
		return Integer.parseInt(hexS, 16);
	}
	
	/**
	 * ��������
	 * 
	 * @return
	 */
	public static int readState(byte[] b) {
		String hexS = lowerBytes2HexString(b);
		return Integer.parseInt(hexS, 16);
	}
	
	
	/**
	 * ����leixing
	 * 
	 * @return
	 */
	public static int readType(byte[] b) {
		String hexS = lowerBytes2HexString(b);
		return Integer.parseInt(hexS, 16);
	}
	

	/**
	 * ���غ���
	 * 
	 * @param b
	 * @return
	 */
	public static int readHeight(byte[] b) {
		String hexS = lowerBytes2HexString(b);
		return Integer.parseInt(hexS, 16);
	}

	/**
	 * ���ؾ���
	 * 
	 * @param b
	 * @return
	 */
	public static int readAccuracy(byte[] b) {
		String hexS = lowerBytes2HexString(b);
		return Integer.parseInt(hexS, 16);
	}
	
	
	/**
	 * ����ʱ��
	 * 
	 * @param b
	 * @return
	 */
	public static String readDoubleDate(byte[] b) {
		double t = bytesToDouble(b);
		long dt = (long) ((t-25570) * (1000*3600*24) + 57600000);
		Date date = new Date(dt);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = format.format(date);
		return time;
	}

	/**
	 * ����ʱ��
	 * 
	 * @param b
	 * @return
	 */
	public static String readDate(byte[] b) {
		StringBuilder sb = new StringBuilder();
		byte[] yearByte = { b[0], b[1] };
		String hexS = lowerBytes2HexString(yearByte);
		int year = Integer.parseInt(hexS, 16);
		sb.append(year);
		sb.append("-");
		int month = b[2];
		sb.append(month);
		sb.append("-");
		int day = b[3];
		sb.append(day);
		sb.append(" ");
		int hour = b[4];
		sb.append(hour);
		sb.append(":");
		int minute = b[5];
		sb.append(minute);
		sb.append(":");
		int second = b[6];
		sb.append(second);
		return sb.toString();
	}
	
	
	/**
	 * ����ʱ��
	 * 
	 * @param b
	 * @return
	 */
	public static String readDateNew(byte[] b) {
		StringBuilder sb = new StringBuilder();
		byte[] yearByte = { b[0], b[1] };
		int year = byteArrayToShort(yearByte);
		sb.append(year);
		sb.append("-");
		int month = b[2];
		sb.append(month);
		sb.append("-");
		int day = b[3];
		sb.append(day);
		sb.append(" ");
		int hour = b[4];
		sb.append(hour);
		sb.append(":");
		int minute = b[5];
		sb.append(minute);
		sb.append(":");
		int second = b[6];
		sb.append(second);
		return sb.toString();
	}

	/**
	 * �ֽ�����תdouble
	 * 
	 * @param b
	 *            ����Ϊ8
	 * @return
	 */
	public static double bytesToDouble(byte[] b) {
		long l;
		l = b[0];
		l &= 0xff;
		l |= ((long) b[1] << 8);
		l &= 0xffff;
		l |= ((long) b[2] << 16);
		l &= 0xffffff;
		l |= ((long) b[3] << 24);
		l &= 0xffffffffl;
		l |= ((long) b[4] << 32);
		l &= 0xffffffffffl;
		l |= ((long) b[5] << 40);
		l &= 0xffffffffffffl;
		l |= ((long) b[6] << 48);
		l &= 0xffffffffffffffl;
		l |= ((long) b[7] << 56);
		return Double.longBitsToDouble(l);
	}

	/**
	 * �ֽ�����תString
	 * 
	 * @param b
	 * @return
	 */
	public static String bytesToCharString(byte[] b) {
		Charset cs = Charset.forName("UTF-8");
		ByteBuffer bb = ByteBuffer.allocate(b.length);
		bb.put(b);
		bb.flip();
		CharBuffer cb = cs.decode(bb);
		return cb.toString().trim();
	}

	/**
	 * �ֽ�����תInt����λ��ǰ��
	 * 
	 * @param b
	 *            4�ֽ�
	 * @return
	 */
	public static int lowerBytes2Int(byte[] b) {
		return (b[0] << 24) + (b[1] << 16) + (b[2] << 8) + b[3];
	}

	/**
	 * �ֽ�����ת16�����ַ�������λ��ǰ��
	 * 
	 * @param b
	 * @return
	 */
	public static String higherBytes2HexString(byte[] b) {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < b.length; i++) {
			int v = b[i] & 0xFF;
			String hv = Integer.toHexString(v);
			if (hv.length() < 2) {
				sb.append(0);
			}
			sb.append(hv);
		}
		return sb.toString();
	}

	/**
	 * �ֽ�����ת16�����ַ�������λ��ǰ��
	 * 
	 * @param b
	 * @return
	 */
	public static String lowerBytes2HexString(byte[] b) {
		StringBuilder sb = new StringBuilder();
		for (int i = b.length - 1; i >= 0; i--) {
			int v = b[i] & 0xFF;
			String hv = Integer.toHexString(v);
			if (hv.length() < 2) {
				sb.append(0);
			}
			sb.append(hv);
		}
		return sb.toString();
	}


	
	public static short byteArrayToShort(byte[] b) {
		int b0 = b[1] & 0x000000FF  ;
        int b1 = (b[0] & 0x000000FF )<< 8;
        short s = new Integer(b0 + b1).shortValue();
		return s;
	}

}
