package com.example.demo.Service;

import com.example.demo.Model.Document;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Document> getDocuments() {
        String jpql = "SELECT NEW com.example.demo.Model.Document (m.name, r.description, r.MathFormula , c.code) " +
                "FROM Metric m " +
                "JOIN Research r ON m.id = r.metricId.id " +
                "JOIN CodeImplementation c ON r.id = c.reseach_id.id";
        TypedQuery<Document> query = entityManager.createQuery(jpql, Document.class);
        return query.getResultList();
    }
}
