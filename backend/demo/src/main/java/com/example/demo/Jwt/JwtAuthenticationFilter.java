package com.example.demo.Jwt;

import com.example.demo.Jwt.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService JwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull  HttpServletRequest request,
            @NonNull  HttpServletResponse response,
            @NonNull  FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("Filtering request");
        if (request.getServletPath().contains("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            System.out.println("Filtering request 2");
            return;
        }
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String token = authorizationHeader.substring(7);
        final String username = JwtService.extractUsername(token);
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            System.out.println("username: " + username + " user roles: " + userDetails.getAuthorities());
            System.out.println("request " + request.getServletPath()  );
            if(JwtService.validateToken(token, userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                System.out.println("Filtering request 3");
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        System.out.println("Filtering request 4");
        filterChain.doFilter(request, response);
    }
}