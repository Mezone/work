package com.vimicro.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.RemovalListener;
import com.google.common.cache.RemovalNotification;
import com.vimicro.AppConfig;
import com.vimicro.dao.GpsDao;
import com.vimicro.dao.RedisDao;
import com.vimicro.dao.RoleDao;
import com.vimicro.model.GpsInfo;
import com.vimicro.model.GpsTerminal;
import com.vimicro.utils.GpsTrans;
import com.vimicro.web.webSocket.hndler.GpsSessionManager;
import com.vividsolutions.jts.util.StringUtil;

import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.DatagramPacket;
import io.netty.channel.socket.nio.NioDatagramChannel;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletionService;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.executor.ExecutorFilter;
import org.apache.mina.transport.socket.DatagramSessionConfig;
import org.apache.mina.transport.socket.nio.NioDatagramAcceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

@Service("gpsService")
public class GpsService {

	@Resource(name = "gpsDao")
	private GpsDao gpsDao;
	
	@Resource(name = "redisDao")
	private RedisDao redisDao;

	private static NioDatagramAcceptor acceptor;

	public static GpsSessionManager sessionManager = GpsSessionManager.instance();

	private static Logger logger = Logger.getLogger(GpsService.class);
	
	@Value("#{configProp['gps.offline']}")   
    private long offlineTime;
	
	@Value("#{configProp['gps.udp.host']}")   
    private int gpsport;

	@PostConstruct
	public void addGpsInfoToRedis() {
		List<GpsInfo> gpsinfoList = gpsDao.selectAllGps();
		redisDao.addGpsInfo(gpsinfoList);
		// 启动GPSUdp端口
		// startGpsReceive();
		System.out.println(offlineTime);
		
		startGpsReceiveNio();
	}

	/**
	 * netty udp接收GPS 数据
	 * 
	 */
	public void startGpsReceiveNio() {
		try {
			EventLoopGroup group = new NioEventLoopGroup();
			Bootstrap b = new Bootstrap();
			b.group(group);
			b.channel(NioDatagramChannel.class);
			b.option(ChannelOption.SO_BROADCAST, true);
			b.handler(new SimpleChannelInboundHandler<DatagramPacket>(){
				@Override
				protected void channelRead0(ChannelHandlerContext arg0, DatagramPacket datagramPacket) throws Exception {
					// TODO Auto-generated method stub
					ByteBuf  bb = datagramPacket.content();
					
					if(!bb.hasArray()){
						int length = bb.readableBytes();
						byte[] buf = new byte[length];
						bb.getBytes(bb.readerIndex(), buf);
						String res = new String(buf);
						String result[] = res.split(",");
						String gpsid = result[1];
						String y = result[3];
						String x = result[4];
						String sj = result[8];
						String type = result[10];
						
						//if(type.equals("car")){
							GpsTerminal terminal = new GpsTerminal();
							terminal.setGpsId(gpsid);
							terminal.setX(Double.parseDouble(x));
							terminal.setY(Double.parseDouble(y));
							terminal.setOnLine("online");
							terminal.setDate(sj);
							terminal.setSysTime(new Date());
							if(redisDao.checkExistsGps(terminal.getGpsId())){
								terminal.setGpsInfo(redisDao.getGpsInfo(gpsid));
								redisDao.addGpsTerminal(terminal);
								String terres = JSON.toJSONString(terminal);
								redisDao.addCacheExpire(gpsid, terres, offlineTime);
								sessionManager.sendMessageToAllUsers(new TextMessage(terres));

							}
						//}
						
					}
					
//					if(!bb.hasArray()){
//						int length = bb.readableBytes();
//						byte[] buf = new byte[length];
//						bb.getBytes(bb.readerIndex(), buf);
//						byte[] head = new byte[2];
//						byte[] bodyLength = new byte[4];// new
//						// byte[]{buf[6],buf[7],buf[8],buf[9]}
//						byte[] terCode = new byte[20];
//						byte[] x = new byte[8];
//						byte[] y = new byte[8];
//						byte[] speed = new byte[2];
//						byte[] direct = new byte[2];
//						byte[] height = new byte[2];
//						byte[] scale = new byte[2];
//						byte[] year = new byte[2];
//						byte[] month = new byte[1];
//						byte[] day = new byte[1];
//						byte[] hour = new byte[1];
//						byte[] min = new byte[1];
//						byte[] sec = new byte[1];
//						
//						System.arraycopy(buf, 0, head, 0, 2);
//						System.arraycopy(buf, 6, bodyLength, 0, 4);
//						System.arraycopy(buf, 10, terCode, 0, 20);
//						System.arraycopy(buf, 30, x, 0, 8);
//						System.arraycopy(buf, 38, y, 0, 8);
//						System.arraycopy(buf, 46, speed, 0, 2);
//						System.arraycopy(buf, 48, direct, 0, 2);
//						System.arraycopy(buf, 50, height, 0, 2);
//						System.arraycopy(buf, 52, scale, 0, 2);
//						System.arraycopy(buf, 54, year, 0, 2);
//						System.arraycopy(buf, 56, month, 0, 1);
//						System.arraycopy(buf, 57, day, 0, 1);
//						System.arraycopy(buf, 58, hour, 0, 1);
//						System.arraycopy(buf, 59, min, 0, 1);
//						System.arraycopy(buf, 60, sec, 0, 1);
//						
//						GpsTerminal terminal = new GpsTerminal();
//						
//						terminal.setHead(GpsTrans.readHead(head));
//						terminal.setBodysize(GpsTrans.readBodySize(bodyLength));
//						terminal.setGpsId(GpsTrans.readTerminalIdNew(terCode));
//						terminal.setX(GpsTrans.readX(x));
//						terminal.setY(GpsTrans.readY(y));
//						terminal.setSpeed(GpsTrans.byteArrayToShort(speed));
//						terminal.setDirect(GpsTrans.byteArrayToShort(direct));
//						terminal.setHeight(GpsTrans.byteArrayToShort(height));
//						terminal.setAccuracy(GpsTrans.byteArrayToShort(scale));
//						
//						String yearTemp=String.valueOf(GpsTrans.byteArrayToShort(year));
//
//						StringBuffer sbTime=new StringBuffer();
//						sbTime.append(yearTemp);
//						sbTime.append("-");
//						sbTime.append(month[0]<10?"0"+month[0]:month[0]);
//						sbTime.append("-");
//						sbTime.append(day[0]<10?"0"+day[0]:day[0]);
//						sbTime.append(" ");
//						sbTime.append(hour[0]<10?"0"+hour[0]:hour[0]);
//						sbTime.append(":");
//						sbTime.append(min[0]<10?"0"+min[0]:min[0]);
//						sbTime.append(":");
//						sbTime.append(sec[0]<10?"0"+sec[0]:sec[0]);
//						terminal.setDate(sbTime.toString());
//						
//
//					}
				}});
			b.bind(gpsport);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * mina  接收GPS  udp  数据
	 */
	public void startGpsReceive() {
		acceptor = new NioDatagramAcceptor();//
		acceptor.setHandler(new IoHandlerAdapter() {
			@Override
			public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
				super.exceptionCaught(session, cause);
			}
			@Override
			public void messageReceived(IoSession session, Object message) throws Exception {
				if (message instanceof IoBuffer) {
					IoBuffer ioBuf = (IoBuffer) message;
					try {
						GpsTerminal terminal = new GpsTerminal();
						byte[] b1 = new byte[1];
						byte[] b2 = new byte[2];
						byte[] b4 = new byte[4];
						byte[] b6 = new byte[6];
						byte[] b7 = new byte[7];

						byte[] b8 = new byte[8];
						byte[] b20 = new byte[20];
						ioBuf.get(b2, 0, 2);
						String head = GpsTrans.readHead(b2);
						if ("aa00".equalsIgnoreCase(head)) {
							terminal.setHead(head);
							ioBuf.get(b2, 0, 2);
							terminal.setCommand(GpsTrans.readCommand(b2));
							ioBuf.get(b6, 0, 6);
							terminal.setGpsId(GpsTrans.readTerminalId(b6));
							ioBuf.get(b8, 0, 8);
							terminal.setX(GpsTrans.readX(b8));
							ioBuf.get(b8, 0, 8);
							terminal.setY(GpsTrans.readY(b8));
							ioBuf.get(b1, 0, 1);
							terminal.setSpeed(GpsTrans.readSpeed(b1));
							ioBuf.get(b1, 0, 1);
							terminal.setDirect(GpsTrans.readDirect(b1));
							ioBuf.get(b4, 0, 4);
							terminal.setState(GpsTrans.readState(b4));
							ioBuf.get(b2, 0, 2);
							terminal.setMsgType(GpsTrans.readType(b2));
							ioBuf.get(b2, 0, 2);
							terminal.setHeight(GpsTrans.readHeight(b2));
							ioBuf.get(b8, 0, 8);
							terminal.setDate(GpsTrans.readDoubleDate(b8));
							terminal.setOnLine("online");
							terminal.setSysTime(new Date());
							
							//System.out.println(JSON.toJSONString(terminal));
							//loadingCache.put(terminal.getGpsId(), terminal);
							//redisDao.addGpsTerminal(terminal);
							//redisDao.addCacheExpire(key, value, time)
							if(redisDao.checkExistsGps(terminal.getGpsId())){
								String gpsid = terminal.getGpsId();
								terminal.setGpsInfo(redisDao.getGpsInfo(gpsid));
								redisDao.addGpsTerminal(terminal);
								String terres = JSON.toJSONString(terminal);
								redisDao.addCacheExpire(gpsid, terres, offlineTime);
								sessionManager.sendMessageToAllUsers(new TextMessage(terres));

							}
//							if (gpsCache.getIfPresent(terminal.getGpsId()) != null) {
//								terminal.setGpsInfo(gpsCache.getIfPresent(terminal.getGpsId()));
//								sessionManager.sendMessageToAllUsers(new TextMessage(JSON.toJSONString(terminal)));
//							}

						} else if ("aaaa".equalsIgnoreCase(head)) {
							terminal.setHead(head);
							ioBuf.get(b2, 0, 2);
							terminal.setCommand(GpsTrans.readCommand(b2));
							ioBuf.get(b2, 0, 2);
							terminal.setVersion(GpsTrans.readVersion(b2));
							ioBuf.get(b4, 0, 4);
							terminal.setBodysize(GpsTrans.readBodySize(b4));
							ioBuf.get(b20, 0, 20);
							terminal.setGpsId(GpsTrans.readTerminalIdNew(b20));
							ioBuf.get(b8, 0, 8);
							terminal.setX(GpsTrans.readX(b8));
							ioBuf.get(b8, 0, 8);
							terminal.setY(GpsTrans.readY(b8));
							ioBuf.get(b2, 0, 2);
							terminal.setSpeed(GpsTrans.byteArrayToShort(b2));
							ioBuf.get(b2, 0, 2);
							terminal.setDirect(GpsTrans.byteArrayToShort(b2));
							ioBuf.get(b2, 0, 2);
							terminal.setHeight(GpsTrans.byteArrayToShort(b2));
							ioBuf.get(b2, 0, 2);
							terminal.setAccuracy(GpsTrans.byteArrayToShort(b2));
							ioBuf.get(b7, 0, 7);
							terminal.setDate(GpsTrans.readDateNew(b7));
						}
					} catch (Exception e) {
						if (acceptor != null) {
							acceptor.dispose();
						}
					}
				}
			}

		});//
		Executor threadPool = Executors.newFixedThreadPool(30);//
		acceptor.getFilterChain().addLast("exector", new ExecutorFilter(threadPool));
		// acceptor.getFilterChain().addLast("logger",
		// new LoggingFilter());
		DatagramSessionConfig dcfg = acceptor.getSessionConfig();//
		dcfg.setReadBufferSize(4096);//
		dcfg.setReceiveBufferSize(1024);//
		dcfg.setSendBufferSize(1024);//
		dcfg.setReuseAddress(true);//
		try {
			acceptor.bind(new InetSocketAddress(10081));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			acceptor.dispose();
		} //

	}

}
