package com.example.demo.auth;
import com.example.demo.Requests.TokenRequest;
import com.example.demo.Jwt.JwtService;
import com.example.demo.User.Model.Roles;
import com.example.demo.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor

@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ){
        AuthenticationResponse token = new AuthenticationResponse();
        try {
            token = authService.register(request , Roles.USER.ordinal());
        } catch (Exception e) {
            token.setResponse("Username or email already exists");
            token.setStatus(HttpStatus.FORBIDDEN.value());
        }
        return ResponseEntity.status(token.getStatus()).body(token);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ){
        AuthenticationResponse token = new AuthenticationResponse();
        try {
            token = authService.login(request);
        } catch (Exception e) {
            token.setResponse("Invalid username or password");
            token.setStatus(HttpStatus.FORBIDDEN.value());
        }
        return ResponseEntity.status(token.getStatus()).body(token);
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verify(
            @RequestBody TokenRequest token
    ){
        boolean isExpired = jwtService.isTokenExpired(token.getToken());
        if(isExpired){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("response", "Token expired"));
        }
        return ResponseEntity.ok(Map.of("response", "Token is valid"));
    }




}
