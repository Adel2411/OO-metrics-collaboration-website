package com.example.demo.DTO;


import com.example.demo.Model.CodeImplementation;
import com.example.demo.Model.Research;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class implementionToImplementDTO implements Function<CodeImplementation, CodeImplementationDTO> {

    @Override

    public CodeImplementationDTO apply(CodeImplementation codeImplementation) {
        return CodeImplementationDTO.builder()
                .id(codeImplementation.getId())
                .code(codeImplementation.getCode())
                .build();
    }
}
