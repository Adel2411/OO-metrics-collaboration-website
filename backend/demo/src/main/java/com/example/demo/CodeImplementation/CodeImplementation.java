package com.example.demo.CodeImplementation;

import com.example.demo.Research.Research;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "codeimplementation")
public class CodeImplementation {
    @Id
    @GeneratedValue
    private UUID id ;
    @OneToOne
    @JoinColumn(name= "research_id")
    private Research researchId;
    private String code;
}
