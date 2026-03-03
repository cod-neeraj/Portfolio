package com.example.portfolio.Repository;

import com.example.portfolio.DTO.Educations;
import com.example.portfolio.Models.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepo extends JpaRepository<Education,Integer> {

    @Query("SELECT new com.example.portfolio.DTO.Educations(" +
            "p.name, p.instituteName, p.percentage, p.years) " +
            "FROM Education p")
    List<Educations> findByUserId();
}
