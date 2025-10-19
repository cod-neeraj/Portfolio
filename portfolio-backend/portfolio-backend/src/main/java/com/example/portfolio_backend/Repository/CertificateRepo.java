package com.example.portfolio_backend.Repository;

import com.example.portfolio_backend.DTO.Certificate;
import com.example.portfolio_backend.Frontend.GetCertificates;
import com.example.portfolio_backend.Models.Certificates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CertificateRepo extends JpaRepository<Certificates,Integer> {
    @Query("SELECT new com.example.portfolio_backend.Frontend.GetCertificates(" +
            "p.id, p.name, p.instituteName, p.percentage, p.certificateId, p.certificateLink) " +
            "FROM Certificates p")
    List<GetCertificates> findAllC();

}


