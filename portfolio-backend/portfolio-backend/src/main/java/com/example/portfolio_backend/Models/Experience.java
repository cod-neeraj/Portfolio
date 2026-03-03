package com.example.portfolio_backend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "experience")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String jobRole;
    private String company;
    private String time;
    @ElementCollection
    @CollectionTable(
            name = "experience_points",
            joinColumns = @JoinColumn(name = "experience_id")
    )
    @Column(name = "point")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<String> experience;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonBackReference
    private User user;
}
