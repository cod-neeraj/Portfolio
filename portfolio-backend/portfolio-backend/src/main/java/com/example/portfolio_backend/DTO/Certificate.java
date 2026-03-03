package com.example.portfolio_backend.DTO;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Certificate {

    private String name;
    private String instituteName;
    private String certificateDate;
    private MultipartFile certificate;
}
