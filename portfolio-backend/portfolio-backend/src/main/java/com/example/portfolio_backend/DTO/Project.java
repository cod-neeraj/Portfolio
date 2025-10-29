package com.example.portfolio_backend.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {
    private String name;
    private String description;
    private String githubLink;
    private String projectLink;
}
