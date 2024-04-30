package com.example.demo.repository;

import com.example.demo.Model.CodeImplementation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface codeImplementationRepository extends JpaRepository<CodeImplementation, UUID>{

    @Query(value = "SELECT * FROM codeimplementation WHERE research_id = ?1", nativeQuery = true)
   CodeImplementation findByResearchId(UUID id);

    @Query(value = "SELECT id FROM codeimplementation WHERE research_id = ?1", nativeQuery = true)
   UUID findIdByResearchId(UUID researchID);

    @Query("SELECT c FROM CodeImplementation c JOIN FETCH c.researchId r JOIN FETCH r.metricId m")
    List<CodeImplementation> findAllWithAssociations();
}
