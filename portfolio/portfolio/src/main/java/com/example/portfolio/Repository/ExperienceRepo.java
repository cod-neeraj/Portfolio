package com.example.portfolio.Repository;
import com.example.portfolio.Models.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepo extends JpaRepository<Experience,Integer> {
    @Query("SELECT p FROM Experience p  ")
    List<Experience> findByUserId();


}
