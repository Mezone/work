package com.vimicro.utils;

import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.Map.Entry;

import com.google.common.collect.Table;


public class StringUtils {

	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	/**
	 * 生成UUID
	 *
	 * @return
	 */
	public static String uuid() {
		return UUID.randomUUID().toString().replace("-", "").toUpperCase();
	}

	/**
	 * 生成JSON返回值
	 * 
	 * @param code
	 * @param data
	 * @return
	 */
	public static String jsonStringResult(int code, String data, boolean json) {
		StringBuilder sb = new StringBuilder();
		if (json) {
			sb.append("{\"code\":").append(code).append(",").append("\"data\":").append(data).append("}");
		} else {
			sb.append("{\"code\":").append(code).append(",").append("\"data\":").append("\"").append(data)
					.append("\"}");
		}
		return sb.toString();
	}

	/**
	 * 时间格式化
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDate(Date date) {
		return sdf.format(date);
	}

	/**
	 * 生成6位随机密码
	 * 
	 * @return
	 */
	public static String randomPwd() {
		return Integer.toString((int) ((Math.random() * 9 + 1) * 100000));
	}

	/**
	 * 处理字符串方法，对于是null的String对象，或是‘null’字符串的，均返回空字符串。
	 */
	public static String doEmpty(String src) {
		if (src == null || "null".equalsIgnoreCase(src))
			return "";
		else
			return src;
	}


	public static String nullStringTransfer(String s) {
		return "null".equals(s) ? "\"null\"" : s;
	}

	/**
	 * 判断字符是否为中文
	 * @param c
	 * @return
	 */
	public static boolean isChinese(char c) {
		Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
		if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
				|| ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
				|| ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
				|| ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B
				|| ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
				|| ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS
				|| ub == Character.UnicodeBlock.GENERAL_PUNCTUATION) {
			return true;
		}
		return false;
	}
	
	/**
	 * 处理参数存在跨站漏洞
	 * @param value
	 * @return
	 */
	public static String stripXSS(String value) {  
        if (value != null) {  
            // NOTE: It's highly recommended to use the ESAPI library and  
            // uncomment the following line to  
            // avoid encoded attacks.  
            // value = ESAPI.encoder().canonicalize(value);  
            // Avoid null characters  
            value = value.replaceAll("", "");  
            // Avoid anything between script tags  
            Pattern scriptPattern = Pattern.compile("<script>(.*?)</script>",  
                    Pattern.CASE_INSENSITIVE);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Avoid anything in a src='...' type of expression  
            scriptPattern = Pattern.compile("src[\r\n]*=[\r\n]*\\\'(.*?)\\\'",  
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE  
                            | Pattern.DOTALL);  
            value = scriptPattern.matcher(value).replaceAll("");  
            scriptPattern = Pattern.compile("src[\r\n]*=[\r\n]*\\\"(.*?)\\\"",  
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE  
                            | Pattern.DOTALL);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Remove any lonesome </script> tag  
            scriptPattern = Pattern.compile("</script>",  
                    Pattern.CASE_INSENSITIVE);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Remove any lonesome <script ...> tag  
            scriptPattern = Pattern.compile("<script(.*?)>",  
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE  
                            | Pattern.DOTALL);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Avoid eval(...) expressions  
            scriptPattern = Pattern.compile("eval\\((.*?)\\)",  
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE  
                            | Pattern.DOTALL);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Avoid expression(...) expressions  
            scriptPattern = Pattern.compile("expression\\((.*?)\\)",  
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE  
                            | Pattern.DOTALL);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Avoid javascript:... expressions  
            scriptPattern = Pattern.compile("javascript:",  
                    Pattern.CASE_INSENSITIVE);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Avoid vbscript:... expressions  
            scriptPattern = Pattern.compile("vbscript:",  
                    Pattern.CASE_INSENSITIVE);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Avoid onload= expressions  
            scriptPattern = Pattern.compile("onload(.*?)=",  
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE  
                            | Pattern.DOTALL);  
            value = scriptPattern.matcher(value).replaceAll("");  
  
            scriptPattern = Pattern.compile("<iframe>(.*?)</iframe>",  
                    Pattern.CASE_INSENSITIVE);  
            value = scriptPattern.matcher(value).replaceAll("");  
  
            scriptPattern = Pattern.compile("</iframe>",  
                    Pattern.CASE_INSENSITIVE);  
            value = scriptPattern.matcher(value).replaceAll("");  
            // Remove any lonesome <script ...> tag  
            scriptPattern = Pattern.compile("<iframe(.*?)>",  
                    Pattern.CASE_INSENSITIVE | Pattern.MULTILINE  
                            | Pattern.DOTALL);  
            value = scriptPattern.matcher(value).replaceAll("");  
        }  
        return value;  
    }  
	
//	public static String str2Md5(String str){
//		try{
//			MessageDigest md;
//			md = MessageDigest.getInstance("md5");
//			byte m5[] = md.digest(str.getBytes());
//			BASE64Encoder encoder = new BASE64Encoder();
//			return encoder.encode(m5);
// 		}catch(Exception e){
//			e.printStackTrace();
//		}
//		return null;
//	}
}
