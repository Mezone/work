package com.vimicro.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vimicro.AppConfig;

@Controller
@RequestMapping(value = "/map")
public class MapController {



	@RequestMapping(value = "/getMapSL", method = RequestMethod.GET)
	@ResponseBody
	public void getMap(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("UTF-8");
		HttpURLConnection http = null;
		InputStream in = null;
		OutputStream out = null;
		String col = request.getParameter("col") == null ? "" : request
				.getParameter("col");
		String row = request.getParameter("row") == null ? "" : request
				.getParameter("row");
		String zoom = request.getParameter("zoom") == null ? "1" : request
				.getParameter("zoom");
		
		try {
			response.setContentType("image/png");
			String httpurl = AppConfig.getString("map.sl.url")
					+ "/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col="
					+ col + "&Row=" + row + "&Zoom=" + zoom + "&V=0.3";
			URL url = new URL(httpurl);
			http = (HttpURLConnection) url.openConnection();
			http.setConnectTimeout(3000);
			http.setRequestMethod("GET");
			http.connect();
			in = http.getInputStream();
			out = response.getOutputStream();
			pipe(in, out);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (http != null) {
				http.disconnect();
			}
		}

	}
	
	
	@RequestMapping(value = "/getMapYX", method = RequestMethod.GET)
	@ResponseBody
	public void getMapYX(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("UTF-8");
		HttpURLConnection http = null;
		InputStream in = null;
		OutputStream out = null;
		String col = request.getParameter("col") == null ? "" : request
				.getParameter("col");
		String row = request.getParameter("row") == null ? "" : request
				.getParameter("row");
		String zoom = request.getParameter("zoom") == null ? "1" : request
				.getParameter("zoom");
		
		try {
			response.setContentType("image/png");
			String httpurl = AppConfig.getString("map.yx.url")
					+ "/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col="
					+ col + "&Row=" + row + "&Zoom=" + zoom + "&V=0.3";
			URL url = new URL(httpurl);
			http = (HttpURLConnection) url.openConnection();
			http.setConnectTimeout(3000);
			http.setRequestMethod("GET");
			http.connect();
			in = http.getInputStream();
			out = response.getOutputStream();
			pipe(in, out);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (http != null) {
				http.disconnect();
			}
		}

	}
	
	
	@RequestMapping(value = "/getMapSY", method = RequestMethod.GET)
	@ResponseBody
	public void getMapSY(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("UTF-8");
		HttpURLConnection http = null;
		InputStream in = null;
		OutputStream out = null;
		String col = request.getParameter("col") == null ? "" : request
				.getParameter("col");
		String row = request.getParameter("row") == null ? "" : request
				.getParameter("row");
		String zoom = request.getParameter("zoom") == null ? "1" : request
				.getParameter("zoom");
		
		try {
			response.setContentType("image/png");
			String httpurl = AppConfig.getString("map.slyx.url")
					+ "/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col="
					+ col + "&Row=" + row + "&Zoom=" + zoom + "&V=0.3";
			URL url = new URL(httpurl);
			http = (HttpURLConnection) url.openConnection();
			http.setConnectTimeout(3000);
			http.setRequestMethod("GET");
			http.connect();
			in = http.getInputStream();
			out = response.getOutputStream();
			pipe(in, out);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (http != null) {
				http.disconnect();
			}
		}

	}

	public void pipe(InputStream dataIn, OutputStream dataOut)
			throws IOException {
		byte[] buf = new byte[1024];
		int read = 0;
		while ((read = dataIn.read(buf)) >= 0) {
			if (null != dataOut) {
				dataOut.write(buf, 0, read);
			}
		}
		if (null != dataOut) {
			dataOut.flush();
		}
	}

	public InputStream stringToStream(String s) {
		InputStream is = null;
		try {
			is = new ByteArrayInputStream(s.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return is;
	}

}