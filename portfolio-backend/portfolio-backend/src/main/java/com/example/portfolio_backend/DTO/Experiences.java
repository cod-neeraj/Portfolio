package com.example.portfolio_backend.DTO;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Experiences {
    private String jobRole;
    private String company;
    private String time;
    private String experience;
    private String achievements;
}
