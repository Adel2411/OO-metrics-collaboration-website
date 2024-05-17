package com.example.demo.Research;

import com.example.demo.DTO.ResearchDTO;
import com.example.demo.DTO.ResearchToResearchDTO;
import com.example.demo.Metric.Model.Metric;
import com.example.demo.Metric.Repository.metricRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ResearchService {

    private final researchRepository researchRepository;
    private final com.example.demo.Metric.Repository.metricRepository metricRepository;

    private final ResearchToResearchDTO entityToDTOMapper;

    @PersistenceContext
    private  EntityManager entityManager;
    @Autowired
    public ResearchService( researchRepository researchRepository, metricRepository metricRepository  , ResearchToResearchDTO entityToDTOMapper) {
        this.researchRepository = researchRepository;
        this.metricRepository = metricRepository;
        this.entityToDTOMapper = entityToDTOMapper;
    }

    public Research addResearch(ResearchRequest request) {
        System.out.println(request);
        Research research = Research.builder()
                .description(request.getDescription())
                .MathFormula(request.getMathFormula())
                .build();

        UUID metricId = UUID.fromString(request.getMetricId());
        Metric metric = metricRepository.findById(metricId)
                .orElseThrow(() -> new RuntimeException("Metric not found"));

        if(researchRepository.findIdByMetricId(metric.getId()) != null){
            throw new RuntimeException("Research already exists for this metric");
        }
        research.setMetricId(metric);
        return researchRepository.save(research);
    }


    public void updateResearch(ResearchPutRequest research) {
        Research research1 =  researchRepository.findById(UUID.fromString(research.getId()))
                .orElseThrow(() -> new RuntimeException("Research not found"));
        research1.setDescription(research.getDescription());
        research1.setMathFormula(research.getMathFormula());
        researchRepository.save(research1);

    }

    public ResearchDTO getResearchById(String id) {
        Object[] research = (Object[]) getResearches(UUID.fromString(id)).get(0);
        return entityToDTOMapper.apply(research);
    }

    public  List<?> getResearches(UUID id) {
        Query query = entityManager.createQuery("SELECT r.id , r.description , r.MathFormula  FROM Research r where r.id = :id");
        query.setParameter("id", id);
        List<?> researches = query.getResultList();
        if(researches.isEmpty()){
            throw new RuntimeException("Research not found");
        }

        return  researches;
    }

    private void updateResearchQUERY(ResearchPutRequest research) {
        try {
            Query query = entityManager.createQuery("UPDATE Research r SET r.description = :description, r.MathFormula = :mathFormula WHERE r.id = :id");
            query.setParameter("description", research.getDescription());
            query.setParameter("mathFormula", research.getMathFormula());
            query.setParameter("id", UUID.fromString(research.getId()));

            int updatedCount = query.executeUpdate();

            if (updatedCount == 1) {
                System.out.println("Research updated successfully");
            } else {
                System.out.println("No research updated");
            }
        } catch (Exception e) {
            System.out.println("Error updating research: " + e.getMessage());
            throw new RuntimeException("Failed updating research", e);
        }
    }


    public void deleteResearch(String id) {
        UUID researchID = researchRepository.findIdByMetricId(UUID.fromString(id));
        if (researchID != null) {
            researchRepository.deleteById(researchID);
        }
    }
}
