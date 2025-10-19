package com.example.portfolio_backend.Repository;

import com.example.portfolio_backend.DTO.Educations;
import com.example.portfolio_backend.Frontend.GetCertificates;
import com.example.portfolio_backend.Models.Education;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepo extends JpaRepository<Education,Integer> {

    @Query("SELECT new com.example.portfolio_backend.DTO.Educations(" +
            "p.name, p.instituteName, p.percentage, p.years, p.achievments) " +
            "FROM Education p")
    List<Educations> findByUserId();
}
