package com.example.demo.auth;
import com.example.demo.Requests.TokenRequest;
import com.example.demo.configuration.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "https://oo-metrics-collaboration-website-frontend.onrender.com")

@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authService;
    private final JwtService jwtService;

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

   @PostMapping("/verify")
    public ResponseEntity<?> verify(
            @RequestBody TokenRequest token
    ){
        boolean isExpired = jwtService.isTokenExpired(token.getToken());
        AuthenticationResponse response = new AuthenticationResponse();
        if(isExpired){
            response.setResponse("Token is expired");
            response.setStatus(HttpStatus.FORBIDDEN.value());
        } else {
            response.setResponse("Token is valid");
            response.setStatus(HttpStatus.OK.value());
        }
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping("/getuser")
    public ResponseEntity<?> getUser(
            @RequestBody TokenRequest token
    ){
        AuthenticationResponse response = new AuthenticationResponse();
        String username;
        try {
            username = jwtService.extractUsername(token.getToken());
            response.setResponse(username);
            response.setStatus(HttpStatus.OK.value());
        } catch (Exception e) {
            response.setResponse("Invalid token");
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
