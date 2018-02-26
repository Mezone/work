package com.vimicro.dao;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.config.BeanDefinition;


@Repository("logDao")
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class LogDao {
	
//	@Resource(name = "jdbcTemplate")
//	private JdbcTemplate jdbcTemplate;
}
