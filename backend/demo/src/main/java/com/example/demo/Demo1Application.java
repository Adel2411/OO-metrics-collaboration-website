package com.example.demo;

import com.example.demo.configuration.secretsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableConfigurationProperties(secretsConfig.class)
@CrossOrigin({ "https://oo-metrics-collaboration-website-frontend.onrender.com" , "http://localhost:5173" })
public class Demo1Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

}
