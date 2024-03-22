package com.example.demo.Model;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseModel {
    int status ;
    Object data;
}
