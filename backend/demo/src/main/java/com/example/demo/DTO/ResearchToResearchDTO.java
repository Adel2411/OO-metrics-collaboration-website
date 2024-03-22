package com.example.demo.DTO;

import com.example.demo.Model.Research;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class ResearchToResearchDTO implements Function<Research , ResearchDTO> {
    @Override
    public ResearchDTO apply(Research research) {
        return ResearchDTO.builder()
                .id(research.getId())
                .description(research.getDescription())
                .mathFormula(research.getMathFormula())
                .build();
    }
}
