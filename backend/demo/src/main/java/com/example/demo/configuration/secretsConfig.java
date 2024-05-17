package com.example.demo.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "secrets")
public record secretsConfig (String dburl , String dbUsername , String dbPassword ,String sign){
}
