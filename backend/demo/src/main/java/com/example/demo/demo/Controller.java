package com.example.demo.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
public class Controller {
    @RequestMapping("/hello")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("Hello World");
    }
}
