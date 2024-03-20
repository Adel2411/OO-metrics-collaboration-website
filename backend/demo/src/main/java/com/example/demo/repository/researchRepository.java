package com.example.demo.repository;

import com.example.demo.Model.Research;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface researchRepository extends JpaRepository<Research , UUID> {
}
