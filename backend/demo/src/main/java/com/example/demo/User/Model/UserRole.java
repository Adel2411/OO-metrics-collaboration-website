package com.example.demo.User.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {
    @JsonProperty("user_name")
    private String UserName;
    @JsonProperty("role_name")
    private String RoleName;
}
