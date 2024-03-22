package com.example.demo.Model;

public class ResponseModelBuilder {
    public static ResponseModel okResponse(Object message) {
        return ResponseModel.builder().status(200).data(message).build();
    }

    public static ResponseModel badRequestResponse(Object message) {
        return ResponseModel.builder().status(400).data(message).build();
    }
}
