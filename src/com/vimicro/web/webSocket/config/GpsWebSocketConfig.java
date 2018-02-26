package com.vimicro.web.webSocket.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import org.springframework.context.annotation.Bean;

import com.vimicro.web.webSocket.hndler.GpsWebSocketHandler;
import com.vimicro.web.webSocket.hndler.SystemWebSocketHandler;
import com.vimicro.web.webSocket.interceptor.HandshakeInterceptor;

@Configuration
@EnableWebMvc
@EnableWebSocket
public class GpsWebSocketConfig extends WebMvcConfigurerAdapter implements
        WebSocketConfigurer {

    public GpsWebSocketConfig() {
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(gpsWebSocketHandler(), "/gpssocket").addInterceptors(new HandshakeInterceptor());

        registry.addHandler(gpsWebSocketHandler(), "/sockjs/gpssocket").addInterceptors(new HandshakeInterceptor())
                .withSockJS();

    }

    @Bean
    public WebSocketHandler gpsWebSocketHandler() {
        //return new InfoSocketEndPoint();
        return new GpsWebSocketHandler();
    }

}
