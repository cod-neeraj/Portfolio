package com.example.portfolio_backend.Repository;
import com.example.portfolio_backend.DTO.Experiences;
import com.example.portfolio_backend.DTO.Experiencesfrontend;
import com.example.portfolio_backend.Models.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepo extends JpaRepository<Experience,Integer> {
    @Query("SELECT p FROM Experience p  ")
    List<Experience> findByUserId();


}
