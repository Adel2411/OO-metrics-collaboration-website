package com.example.demo.auth;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ){
        AuthenticationResponse token = new AuthenticationResponse();
        try {
            token = authService.register(request);
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
}
