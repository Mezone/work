package com.vimicro.test;

import com.vimicro.AppConfig;
import com.vimicro.model.GpsTerminal;
import com.vimicro.utils.GpsTrans;

import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.DatagramPacket;
import io.netty.channel.socket.nio.NioDatagramChannel;

public class Niotest {

	public static void main(String args[]){
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
						String x = result[3];
						String y = result[4];
						String sj = result[8];
						String type = result[10];
						
						System.out.println(gpsid + " " + x + "  " + y + " " + sj + " " + type);

					}
				}});
			b.bind(10086);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
