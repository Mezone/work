package com.vimicro.utils;


import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import com.alibaba.fastjson.JSONObject;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.IncorrectClaimException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MissingClaimException;
import io.jsonwebtoken.SignatureAlgorithm;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;

public class JWTUtil {
	
    private static String SECRET = "czxyjb";

    

	/**
	 * 由字符串生成加密key
	 * @return
	 */
	public static SecretKey generalKey(){
		String stringKey = SECRET;
		byte[] encodedKey = Base64.decodeBase64(stringKey);
	    SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
	    return key;
	}

	/**
	 * 创建jwt
	 * @param id
	 * @param subject
	 * @param ttlMillis
	 * @return
	 * @throws Exception
	 */
	public static String createJWT(String subject) {
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);
		SecretKey key = generalKey();
		JwtBuilder builder = Jwts.builder()
//			.setIssuedAt(now)
			.setSubject(subject)
		    .signWith(signatureAlgorithm, key);
//		if (ttlMillis >= 0) {
//		    long expMillis = nowMillis + ttlMillis;
//		    Date exp = new Date(expMillis);
//		    builder.setExpiration(exp);
//		}
		return builder.compact();
	}
	
	/**
	 * 解密jwt
	 * @param jwt
	 * @return
	 * @throws Exception
	 */
	public static String parseJWT(String jwt){
		String res = null;
		try{
			SecretKey key = generalKey();
			Claims claims = Jwts.parser()         
			   .setSigningKey(key)
			   .parseClaimsJws(jwt).getBody();
			res = claims.getSubject();
		}catch(ExpiredJwtException expireException){
			//expireException.printStackTrace();
			res = null;
		} catch (MissingClaimException e) {
		    // we get here if the required claim is not present
			res = null;
		} catch (IncorrectClaimException e) {
		    // we get here if the required claim has the wrong value
			res = null;
		}
		return res;
	}
	
	/**
	 * 生成subject信息
	 * @param user
	 * @return
	 */
	public  static String generalSubject(){
		JSONObject jo = new JSONObject();
		jo.put("userId", "userid");
		jo.put("roleId", "zyy");
		return jo.toJSONString();
	}

    
    public static void main(String[] args) throws InterruptedException{
//    	String token = JWTUtil.createJWT(generalSubject());
    	
//    	Map map = new HashMap();
//    	map.put("userid", "zhaoyueyue");
//    	map.put("zzjgdm", "3204");
//    
//    	System.out.println(token);
//    	Thread.sleep(1000 * 2);
//    	String str = JWTUtil.parseJWT(token);
//    	System.out.println(str);
    }

}