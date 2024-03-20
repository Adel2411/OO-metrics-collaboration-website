package com.example.demo.auth;

import com.example.demo.Model.User;
import com.example.demo.configuration.JwtService;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService JwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var user =  User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
        var JwtToken = JwtService.generateToken(user);
        return AuthenticationResponse.builder()
                        .response(JwtToken)
                        .status(HttpStatus.OK.value())
                        .build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var JwtToken = JwtService.generateToken(user);
        return AuthenticationResponse.builder().
                response(JwtToken)
                .status(HttpStatus.OK.value())
                .build();
    }
}
