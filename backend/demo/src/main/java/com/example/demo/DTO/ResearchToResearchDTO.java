package com.example.demo.DTO;

import com.example.demo.Model.Research;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.function.Function;

@Component
public class ResearchToResearchDTO implements Function<Object[], ResearchDTO> {
    @Override
    public ResearchDTO apply(Object[] research) {
        return ResearchDTO.builder()
                .id(UUID.fromString(research[0].toString()))
                .description((research[1] == null) ? null : research[1].toString())
                .mathFormula((research[2] == null) ? null : research[2].toString())
                .build();
    }
}
