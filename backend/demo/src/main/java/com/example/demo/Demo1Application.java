package com.example.demo;

import com.example.demo.configuration.secretsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(secretsConfig.class)
public class Demo1Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

}
