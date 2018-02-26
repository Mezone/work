package com.vimicro.interceptor;

import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.vimicro.AppConst;
import com.vimicro.service.LogService;

public class LogInterceptor implements HandlerInterceptor {

	 
    public List<String> execludeUrls;
    
	@Resource(name = "logService")
	private LogService logService;
    
	  
    public List<String> getExecludeUrls() {
		return execludeUrls;
	}

	public void setExecludeUrls(List<String> execludeUrls) {
		this.execludeUrls = execludeUrls;
	}
	
	@Override
	public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		String url = httpServletRequest.getServletPath();
    	if(execludeUrls.contains(url)){
    	}else{
//        	com.vimicro.skj.model.User user = (com.vimicro.skj.model.User) httpServletRequest.getSession().getAttribute("user");
//    		if(user != null && !url.contains(".")){
//    			//System.out.println(url + "  " + JSON.toJSONString(httpServletRequest.getParameterMap()));
//    			logService.addLog(user.getId(), user.getOrgId(), url, JSON.toJSONString(httpServletRequest.getParameterMap()), getIpAddr(httpServletRequest));
//            }
    	}
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub
	}

	@Override
	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
		// TODO Auto-generated method stub
		return true;
	}

	public String getIpAddr(HttpServletRequest request){
		String ip = request.getHeader(" x-forwarded-for ");
		if(ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)){
			ip = request.getHeader(" Proxy-Client-IP ");
		}
		
		if(ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)){
			ip = request.getHeader(" WL-Proxy-Client-IP ");
		}
		
		if(ip == null || ip.length() == 0 || " unknown ".equalsIgnoreCase(ip)){
			ip = request.getRemoteAddr();
		}
		
		return ip;
	}
}
