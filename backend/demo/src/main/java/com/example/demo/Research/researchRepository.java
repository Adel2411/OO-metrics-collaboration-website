package com.example.demo.Research;

import com.example.demo.Research.Research;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface researchRepository extends JpaRepository<Research , UUID> {


    @Query(value = "SELECT m.*, " +
            "CASE WHEN EXISTS (SELECT 1 FROM codeimplementation r WHERE r.research_id = m.id) " +
            "THEN 1 ELSE 0 END AS status " +
            "FROM research m", nativeQuery = true)
    List<Object []> findResearchWithStatus();

    @Query(value = "SELECT id FROM research WHERE metric_id = ?1", nativeQuery = true)
    UUID findIdByMetricId(UUID metricId);


}
