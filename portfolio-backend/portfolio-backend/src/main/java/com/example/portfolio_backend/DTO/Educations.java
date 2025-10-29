package com.example.portfolio_backend.DTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Educations {
    private String name;
    private String instituteName;
    private String percentage;
    private String years;
    private String achievments;
}
