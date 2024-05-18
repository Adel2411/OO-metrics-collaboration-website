package com.example.demo.hellowold;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class basicController {
    @RequestMapping("api/v1/hello")
    public String hello(){
        return "Hello World";
    }
}
