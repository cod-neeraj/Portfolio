package com.example.portfolio_backend.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Experiencesfrontend {
    private String jobRole;
    private String company;
    private String time;
    private List<String> experience;
}
