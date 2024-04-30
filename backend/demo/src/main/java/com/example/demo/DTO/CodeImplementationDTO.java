package com.example.demo.DTO;


import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CodeImplementationDTO {
        private UUID id;
        private String code;
}
