package com.example.portfolio.Frontend;


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
    private String date;
    private String s3Key;
}
