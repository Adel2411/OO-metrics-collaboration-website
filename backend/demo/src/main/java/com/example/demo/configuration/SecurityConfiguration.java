package com.example.demo.configuration;


import com.example.demo.Jwt.JwtAuthenticationFilter;
import com.example.demo.User.Model.Roles;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers( "/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/manager/**").hasAuthority(Roles.SUPER_ADMIN.name())
                        .requestMatchers("/api/v1/admin/**").hasAnyAuthority(Roles.ADMIN.name(), Roles.SUPER_ADMIN.name())
                        .requestMatchers("/api/v1/client/**").hasAnyAuthority(Roles.USER.name(), Roles.ADMIN.name(), Roles.SUPER_ADMIN.name())
                        .requestMatchers("/api/v1/metric/**").hasAnyAuthority(Roles.USER.name(), Roles.ADMIN.name(), Roles.SUPER_ADMIN.name())
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
