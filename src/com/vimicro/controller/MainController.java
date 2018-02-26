package com.vimicro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Administrator on 2016/9/29.
 */
@Controller
@RequestMapping(value = "/main")
public class MainController {

	@RequestMapping
	public String main() {
		return "main/index";
	}

	@RequestMapping(value = "/index")
	public String index() {
		return "main/index";
	}

	@RequestMapping(value = "/login")
	public String login() {
		return "main/login";
	}

	@RequestMapping(value = "/swqj")
	public ModelAndView swqj(String jlbh) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("main/swqj");
		mav.addObject("jlbh", jlbh);
		return mav;
	}
}
