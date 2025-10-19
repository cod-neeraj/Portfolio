package com.example.portfolio_backend.Frontend;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetCertificates {
    private Integer id;
    private String name;
    private String instituteName;
    private String percentage;
    private String certificateId;
    private String certificateLink;
}
