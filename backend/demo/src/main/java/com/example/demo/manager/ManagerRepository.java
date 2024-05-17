package com.example.demo.manager;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
class ManagerRepository {
    @PersistenceContext
    private EntityManager entityManager;


    public List<?> getAdmins(){
       return entityManager.createQuery("SELECT  u.id , u.username  FROM User u WHERE u.role.id = 2").getResultList();
    }
}