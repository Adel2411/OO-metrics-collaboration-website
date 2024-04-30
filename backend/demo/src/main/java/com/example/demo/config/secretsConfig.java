package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "secrets")
public record secretsConfig (String dburl , String dbUsername , String dbPassword ,String sign){
}
