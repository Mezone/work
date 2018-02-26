package com.vimicro.interceptor;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.ResponseData;
import com.vimicro.model.User;
import com.vimicro.utils.JWTUtil;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.net.URLEncoder;

/**
 * Created by Administrator on 15-9-2. 登录拦截器
 */
public class LoginInterceptor implements HandlerInterceptor {

	private static Logger LOG = Logger.getLogger(LoginInterceptor.class);
	@Override
	public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o)
			throws Exception {
		User user = (User) httpServletRequest.getSession().getAttribute("user");

		String url = httpServletRequest.getServletPath();
		

		if (user != null) {
			return true;
		}
		String rt = httpServletRequest.getParameter("rt");
		
		System.out.println(rt);

		if (rt != null && "json".equals(rt)) {
			System.out.println(url);
			httpServletResponse.setContentType("application/json;charset=UTF-8");
			httpServletResponse.setCharacterEncoding("UTF-8");
			httpServletResponse.setStatus(httpServletResponse.SC_FORBIDDEN);
			PrintWriter out = httpServletResponse.getWriter();
			System.out.println(JSON.toJSONString(ResponseData.customerError().putDataValue(ResponseData.ERRORS_KEY, "登录信息失效，请重新登陆")));
			;
			ResponseData rd = ResponseData.customerError().putDataValue(ResponseData.ERRORS_KEY, "登录信息失效，请重新登陆");
			System.out.println(rd.getMessage());
			out.write(JSON.toJSONString(rd));
			out.flush();
		} else {
			StringBuffer requestUrl = httpServletRequest.getRequestURL();
			String queryString = httpServletRequest.getQueryString();
			if (queryString != null && !queryString.equals("")) {
				requestUrl.append("?").append(queryString);
			}
			String back = URLEncoder.encode(requestUrl.toString(), "UTF-8");
			httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/passport?back=" + back);
		}

		return false;

	}

	@Override
	public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			Object o, Exception e) throws Exception {
	}

}
