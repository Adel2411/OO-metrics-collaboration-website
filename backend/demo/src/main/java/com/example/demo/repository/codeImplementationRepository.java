package com.example.demo.repository;

import com.example.demo.Model.CodeImplementation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface codeImplementationRepository extends JpaRepository<CodeImplementation, UUID>{
}
