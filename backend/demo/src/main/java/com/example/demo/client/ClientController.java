package com.example.demo.client;


import com.example.demo.Jwt.JwtService;
import com.example.demo.Model.Document;
import com.example.demo.Model.ResponseModel;
import com.example.demo.Model.ResponseModelBuilder;
import com.example.demo.Requests.TokenRequest;
import com.example.demo.Service.ModelService;
import com.example.demo.auth.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/client")
@RequiredArgsConstructor

public class ClientController {
    private final ModelService modelService;
    private final JwtService jwtService;
    //TODO implement client controller

    //TODO 1: READ METRICS WITH RESEARCHES
    @GetMapping("/documents")
    ResponseEntity<?> getDocuments(){
        System.out.println("get documents");
        ResponseModel responseModel ;
        try {
            List<Document> documents = modelService.getDocuments();
            System.out.println(documents);
            responseModel = ResponseModelBuilder.okResponse(documents);
        }
        catch (Exception e){
            responseModel = ResponseModelBuilder.badRequestResponse("failed getting documents");
        }
        return ResponseEntity.status(responseModel.getStatus()).body(responseModel);
    }

    //TODO 2: GET USER DATA
    @PostMapping("/getuser")
    public ResponseEntity<?> getUser(
            @RequestBody TokenRequest token
    ){
        AuthenticationResponse response = new AuthenticationResponse();
        try {
            String username = jwtService.extractUsername(token.getToken());
            int roleId = jwtService.extractUserRoleID(token.getToken());
            return ResponseEntity.ok(
                    Map.of(
                            "username", username,
                            "role", roleId
                    )
            );
        } catch (Exception e) {
            response.setResponse("Invalid token");
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return ResponseEntity.status(response.getStatus()).body(response);
        }
    }
}
