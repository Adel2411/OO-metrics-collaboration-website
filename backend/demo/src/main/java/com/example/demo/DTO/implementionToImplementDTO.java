package com.example.demo.DTO;


import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.function.Function;

@Component
public class implementionToImplementDTO implements Function<Object[], CodeImplementationDTO> {

    @Override

    public CodeImplementationDTO apply(Object[] codeImplementation) {
        return CodeImplementationDTO.builder()
                .id(UUID.fromString(codeImplementation[0].toString()))
                .code(codeImplementation[1].toString())
                .build();
    }
}
