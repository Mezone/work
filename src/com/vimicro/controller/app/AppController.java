package com.vimicro.controller.app;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.vimicro.model.ResponseData;
import com.vimicro.service.AppService;
import com.vimicro.service.MenuService;

@Controller
@RequestMapping(value = "/app")
public class AppController {

	@Resource(name = "appService")
	private AppService appService;
	
	
	@RequestMapping(value = "/selectAllVideo")
	@ResponseBody
	public ResponseData selectAllVideo(HttpServletRequest request) {
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("list", appService.selectAllVideo());
		return responseData;
	}
	
	@RequestMapping(value = "/selectAllJcz")
	@ResponseBody
	public ResponseData selectAllJcz(HttpServletRequest request) {
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("list", appService.selectAllJcz());
		return responseData;
	}

	@RequestMapping(value = "/selectAllKk")
	@ResponseBody
	public ResponseData selectAllKk(){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("list", appService.selectAllKk());
		return responseData;
	}

	@RequestMapping(value = "/selectZyByCoords")
	@ResponseBody
	public ResponseData selectZyByCoords(String coords){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("spjk", appService.selectAllVideo(coords));
		responseData.putDataValue("jcz", appService.selectAllJcz(coords));
		responseData.putDataValue("kk", appService.selectAllKk(coords));

		return responseData;
	}
	
	
	@RequestMapping(value = "/selectJczZyByCoords")
	@ResponseBody
	public ResponseData selectJczZyByCoords(String coords){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("list", appService.selectAllJcz(coords));
		return responseData;
	}
	
	@RequestMapping(value = "/selectBkclLsgj")
	@ResponseBody
	public ResponseData selectBkclLsgj(String hphm){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("list", appService.selectBkclLsgj(hphm));
		return responseData;
	}
	
	@RequestMapping(value = "/selectClxx")
	@ResponseBody
	public ResponseData selectClxx(String hphm){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("list", appService.selectClxx(hphm));
		return responseData;
	}
	
	@RequestMapping(value = "/selectJczGlJk")
	@ResponseBody
	public ResponseData selectJczGlJk(String jczid, String type){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("list", appService.selectJczGlJk(jczid, type));
		return responseData;
	}
	
	@RequestMapping(value = "/selectZbcs")
	@ResponseBody
	public ResponseData selectZbcs(){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("data", appService.selectZbcs());
		return responseData;
	}
		
	@RequestMapping(value = "/selectSjdtLeftInfo")
	@ResponseBody
	public ResponseData selectSjdtLeftInfo(String jczbh){
		ResponseData responseData = ResponseData.ok();
		responseData.putDataValue("jczinfo", appService.getJczInfo(jczbh));
		responseData.putDataValue("zbry", appService.selectJczZbry(jczbh));
		responseData.putDataValue("jrgc", appService.selectJczJrgc(jczbh));

		return responseData;
	}
		
	

}
