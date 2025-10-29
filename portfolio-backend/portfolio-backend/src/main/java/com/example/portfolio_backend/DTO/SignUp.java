package com.example.portfolio_backend.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUp {
    private String name;
    private String code;
    private String password;
}
