package com.example.demo.Service;

import com.example.demo.DTO.CodeImplementationDTO;
import com.example.demo.Model.CodeImplementation;
import com.example.demo.Model.Research;
import com.example.demo.Requests.CodeImplementationPutRequest;
import com.example.demo.Requests.CodeImplementationRequest;
import com.example.demo.repository.codeImplementationRepository;
import com.example.demo.repository.researchRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.DTO.implementionToImplementDTO;

import java.util.List;
import java.util.UUID;

@Service
public class CodeImplementationService {

    private final codeImplementationRepository codeImplementationRepository;
    private final researchRepository researchRepository;
    private  final  implementionToImplementDTO entityToDTOMapper;

    @PersistenceContext
    private EntityManager entityManager;


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
        CodeImplementation codeImplementation1 = codeImplementationRepository.findById(UUID.fromString(codeImplementation.getId()))
                .orElseThrow(() -> new RuntimeException("Code Implementation not found"));
        codeImplementation1.setCode(codeImplementation.getCode());
        return codeImplementationRepository.save(codeImplementation1);
    }

    public CodeImplementationDTO getCodeImplementationDTO(UUID id) {
        Object[] codeImplementation = findCodeByID(id);
        return entityToDTOMapper.apply(codeImplementation);
    }


    private Object[] findCodeByID(UUID id) {
        String jpql = "SELECT c.id , c.code FROM CodeImplementation c WHERE c.id = :id";
        Query query = entityManager.createQuery(jpql);
        query.setParameter("id", id);
        List<?> result = query.getResultList();
        if(result.isEmpty()){
            throw new RuntimeException("Code Implementation not found");
        }

        return (Object[]) result.get(0);
    }

    private Object[] updateCode(CodeImplementationPutRequest codeImplementation) {
        String jpql = "UPDATE CodeImplementation c SET c.code = :code WHERE c.id = :id";
        Query query = entityManager.createQuery(jpql);
        query.setParameter("id", UUID.fromString(codeImplementation.getId()));
        query.setParameter("code", codeImplementation.getCode());
        List<?> result = query.getResultList();
        if(result.isEmpty()){
            throw new RuntimeException("Code Implementation not found");
        }

        return (Object[]) result.get(0);
    }



}
