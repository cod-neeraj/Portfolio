package com.example.portfolio_backend.Repository;

import com.example.portfolio_backend.DTO.Experiences;
import com.example.portfolio_backend.DTO.Project;
import com.example.portfolio_backend.Models.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Projects,Integer> {
    @Query("SELECT new com.example.portfolio_backend.DTO.Project(" +
            "p.name, p.description, p.githubLink, p.projectLink) " +
            "FROM Projects p ")
    List<Project> findByUserId();
}

