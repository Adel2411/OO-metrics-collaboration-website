package com.example.demo.Requests;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestMapping;


@Data
public class TokenRequest {
    String token;
}
