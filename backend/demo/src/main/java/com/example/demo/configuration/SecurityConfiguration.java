package com.example.demo.configuration;

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
    final com.example.demo.Jwt.JWTauthFilter JWTauthFilter;
    final AuthenticationProvider Auth;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers("/api/v1/manager/**").hasRole(Roles.SUPER_ADMIN.name())
                                .requestMatchers("/api/v1/admin/**").hasAnyRole(Roles.ADMIN.name() , Roles.SUPER_ADMIN.name())
                                .requestMatchers("/api/v1/client/**").hasAnyRole(Roles.USER.name() , Roles.ADMIN.name() , Roles.SUPER_ADMIN.name())
                                .requestMatchers("/api/v1/metric/**").hasAnyRole(Roles.USER.name() , Roles.ADMIN.name() , Roles.SUPER_ADMIN.name())
                                .requestMatchers("/api/v1/auth/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(Auth)
                .addFilterBefore(JWTauthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
