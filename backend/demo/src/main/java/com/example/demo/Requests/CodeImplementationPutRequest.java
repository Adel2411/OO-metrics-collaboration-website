package com.example.demo.Requests;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CodeImplementationPutRequest {

    private String id;
    private String code;

    @Override
    public String toString() {
        return "CodeImplementationPutRequest{" +
                "id='" + id + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}
