package com.example.demo.repository;

import com.example.demo.Model.Research;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface researchRepository extends JpaRepository<Research , UUID> {

    @Query
    List<Object> findReseachWithStatus();
}
