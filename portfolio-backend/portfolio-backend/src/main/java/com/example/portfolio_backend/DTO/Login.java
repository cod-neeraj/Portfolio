package com.example.portfolio_backend.DTO;

import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Login {
    private String code;
    private String password;
}
