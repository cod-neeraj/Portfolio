package com.example.portfolio.Repository;

import com.example.portfolio.Frontend.GetCertificates;
import com.example.portfolio.Models.Certificates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CertificateRepo extends JpaRepository<Certificates,Integer> {
    @Query("SELECT new com.example.portfolio.Frontend.GetCertificates(" +
            "p.id, p.name, p.instituteName, p.date, p.s3Key) " +
            "FROM Certificates p")
    List<GetCertificates> findAllC();

}


