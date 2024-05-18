package com.example.demo.User;


import com.example.demo.User.Model.UserID;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserRoleRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<UserID> findAdminUsers(){
        String jpql = "SELECT NEW com.example.demo.User.Model.UserID (u.id, u.username) " +
                "FROM User u WHERE u.role.id = 1";
        return entityManager.createQuery(jpql, UserID.class).getResultList();
    }
}
