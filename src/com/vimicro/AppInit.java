package com.vimicro;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class AppInit implements ApplicationListener<ContextRefreshedEvent> {

    private static Logger LOG = Logger.getLogger(AppInit.class);

    public void onApplicationEvent(ContextRefreshedEvent event) {

        if(event.getApplicationContext().getParent() == null){
            //配置文件配置
            LOG.info("初始化配置文件...");
            AppConfig.getConfig();
            LOG.info("系统初始化完成.");
        }

    }

}
