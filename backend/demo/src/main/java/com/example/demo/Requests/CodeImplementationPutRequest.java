package com.example.demo.Requests;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CodeImplementationPutRequest {

    private String id;
    private String code;

    public CodeImplementationPutRequest(String id, String code) {
        this.id = id;
        this.code = code;
    }

    public CodeImplementationPutRequest() {
    }

    @Override
    public String toString() {
        return "CodeImplementationPutRequest{" +
                "id='" + id + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}
