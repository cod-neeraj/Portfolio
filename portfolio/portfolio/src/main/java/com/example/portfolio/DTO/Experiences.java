package com.example.portfolio.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Experiences {
    private Integer id;
    private String jobRole;
    private String company;
    private String time;
    private List<String> points;
}
