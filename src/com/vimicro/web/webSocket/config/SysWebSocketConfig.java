package com.vimicro.web.webSocket.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import org.springframework.context.annotation.Bean;

import com.vimicro.web.webSocket.hndler.SystemWebSocketHandler;
import com.vimicro.web.webSocket.interceptor.HandshakeInterceptor;

@Configuration
@EnableWebMvc
@EnableWebSocket
public class SysWebSocketConfig extends WebMvcConfigurerAdapter implements
        WebSocketConfigurer {

    public SysWebSocketConfig() {
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(systemWebSocketHandler(), "/syssocket").addInterceptors(new HandshakeInterceptor());

        registry.addHandler(systemWebSocketHandler(), "/sockjs/syssocket").addInterceptors(new HandshakeInterceptor())
                .withSockJS();

    }

    @Bean
    public WebSocketHandler systemWebSocketHandler() {
        //return new InfoSocketEndPoint();
        return new SystemWebSocketHandler();
    }

}
