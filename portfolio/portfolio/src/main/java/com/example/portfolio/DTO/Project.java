package com.example.portfolio.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Project {
    private String name;
    private List<String> description;
    private String githubLink;
    private String projectLink;
}
