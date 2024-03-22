package com.example.demo.Service;

import com.example.demo.DTO.CodeImplementationDTO;
import com.example.demo.Model.CodeImplementation;
import com.example.demo.Model.Research;
import com.example.demo.Requests.CodeImplementationPutRequest;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.repository.codeImplementationRepository;
import com.example.demo.repository.researchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.DTO.implementionToImplementDTO;
import java.util.UUID;

@Service
public class CodeImplementationService {

    private final codeImplementationRepository codeImplementationRepository;
    private final researchRepository researchRepository;
    private  final  implementionToImplementDTO entityToDTOMapper;


    @Autowired
    public CodeImplementationService(
            codeImplementationRepository codeImplementationRepository
            , researchRepository researchRepository ,
            implementionToImplementDTO entityToDTOMapper
    ) {
        this.codeImplementationRepository = codeImplementationRepository;
        this.researchRepository = researchRepository;
        this.entityToDTOMapper = entityToDTOMapper;
    }
    public CodeImplementation save(CodeImplementationRequest codeImplementation) {
        CodeImplementation newCodeImplementation = CodeImplementation.builder()
                .code(codeImplementation.getCode())
                .build();

        UUID researchId = UUID.fromString(codeImplementation.getResearch_id());
        Research research = researchRepository.findById(researchId)
                .orElseThrow(() -> new RuntimeException("Research not found"));

        newCodeImplementation.setResearchId(research);
        return codeImplementationRepository.save(newCodeImplementation);
    }

    public CodeImplementation update(CodeImplementationPutRequest codeImplementation) {
        CodeImplementation codeImplementationToUpdate = codeImplementationRepository.findById(UUID.fromString(codeImplementation.getId()))
                .orElseThrow(() -> new RuntimeException("Code Implementation not found"));

        codeImplementationToUpdate.setCode(codeImplementation.getCode());
        return codeImplementationRepository.save(codeImplementationToUpdate);
    }

    public CodeImplementationDTO getCodeImplementationDTO(UUID id) {
        CodeImplementation codeImplementation = codeImplementationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Code Implementation not found"));
        return entityToDTOMapper.apply(codeImplementation);
    }


}
