package com.example.portfolio.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "certificates")
public class Certificates {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String instituteName;
    private String date;
    private String s3Key;
    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonBackReference
    private User user;
}
