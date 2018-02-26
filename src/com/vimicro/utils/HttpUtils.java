package com.vimicro.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Http请求工具类
 * Created by Administrator on 2017/1/13.
 */
public class HttpUtils {

    /**
     * GET请求
     * @param httpUrl
     * @return
     */
    public static String get(String httpUrl) throws RuntimeException {
        HttpURLConnection httpURLconnection = null;
        InputStream in = null;
        ByteArrayOutputStream bos = null;
        try {
            URL url = new URL(httpUrl);
            httpURLconnection = (HttpURLConnection) url.openConnection();
            httpURLconnection.setRequestMethod("GET");
            httpURLconnection.setConnectTimeout(30000);
            httpURLconnection.setReadTimeout(30000);
            httpURLconnection.setDoOutput(true);
            httpURLconnection.setDoInput(true);
            httpURLconnection.setUseCaches(false);
            httpURLconnection.connect();
            int responseCode = httpURLconnection.getResponseCode();
            if(responseCode == 200){
                in = httpURLconnection.getInputStream();
                bos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = in.read(buffer)) != -1) {
                    bos.write(buffer, 0, len);
                }
                bos.flush();
                return new String(bos.toByteArray(), "UTF-8");
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("网络异常");
        } finally {
            if(in != null){
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(bos != null){
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (httpURLconnection != null) {
                httpURLconnection.disconnect();
            }
        }
    }

    /**
     * POST请求
     * @param httpUrl
     * @param params
     * @return
     */
    public static String post(String httpUrl, String params) {
        HttpURLConnection httpURLconnection = null;
        InputStream in = null;
        OutputStream out = null;
        ByteArrayOutputStream bos = null;
        try {
            URL url = new URL(httpUrl);
            httpURLconnection = (HttpURLConnection) url.openConnection();
            httpURLconnection.setRequestMethod("POST");
            httpURLconnection.setConnectTimeout(20000);
            httpURLconnection.setReadTimeout(20000);
            httpURLconnection.setDoOutput(true);
            httpURLconnection.setDoInput(true);
            httpURLconnection.setUseCaches(false);
            httpURLconnection.connect();
            out = httpURLconnection.getOutputStream();
            byte[] paramsBytes = params.getBytes("UTF-8");
            out.write(paramsBytes, 0, paramsBytes.length);
            int responseCode = httpURLconnection.getResponseCode();
            if(responseCode == 200){
                in = httpURLconnection.getInputStream();
                bos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = in.read(buffer)) != -1) {
                    bos.write(buffer, 0, len);
                }
                bos.flush();
                return new String(bos.toByteArray(), "UTF-8");
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("网络异常");
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
            if(bos != null){
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (httpURLconnection != null) {
                httpURLconnection.disconnect();
            }
        }
    }
    
    
    /**
     * POST请求,带超时时间
     * @param httpUrl
     * @param params
     * @param timeout
     * @return
     */
    public static String post(String httpUrl, String params, int timeout) {
        HttpURLConnection httpURLconnection = null;
        InputStream in = null;
        OutputStream out = null;
        ByteArrayOutputStream bos = null;
        try {
            URL url = new URL(httpUrl);
            httpURLconnection = (HttpURLConnection) url.openConnection();
            httpURLconnection.setRequestMethod("POST");
            httpURLconnection.setConnectTimeout(timeout);
            httpURLconnection.setReadTimeout(timeout);
            httpURLconnection.setDoOutput(true);
            httpURLconnection.setDoInput(true);
            httpURLconnection.setUseCaches(false);
            httpURLconnection.connect();
            out = httpURLconnection.getOutputStream();
            byte[] paramsBytes = params.getBytes("UTF-8");
            out.write(paramsBytes, 0, paramsBytes.length);
            int responseCode = httpURLconnection.getResponseCode();
            if(responseCode == 200){
                in = httpURLconnection.getInputStream();
                bos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = in.read(buffer)) != -1) {
                    bos.write(buffer, 0, len);
                }
                bos.flush();
                return new String(bos.toByteArray(), "UTF-8");
            } else {
                return null;
            }
        } catch (Exception e) {
           // e.printStackTrace();
            throw new RuntimeException("网络异常");
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
            if(bos != null){
                try {
                    bos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (httpURLconnection != null) {
                httpURLconnection.disconnect();
            }
        }
    }

}
