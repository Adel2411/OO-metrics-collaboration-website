package com.example.demo.User;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserRoleRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<?> findAllUserWithRole(){
        return entityManager.createQuery("SELECT  u.username , r.RoleName FROM User u JOIN Role r on u.role.id = r.").getResultList();
    }
}
