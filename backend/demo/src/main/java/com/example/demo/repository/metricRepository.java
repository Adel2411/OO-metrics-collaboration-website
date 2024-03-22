package com.example.demo.repository;

import com.example.demo.Model.Metric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface metricRepository extends JpaRepository<Metric, UUID> {
    @Query("DELETE FROM Metric m WHERE m.id = ?1")
    void deleteAllrelated(UUID uuid);


//    @Query("SELECT m, r, c FROM Metric m LEFT JOIN m. r LEFT JOIN r.implementation c")
//    List<Object[]> getAllMetricsWithDetails();
}
