package com.example.portfolio_backend.Service;

import com.example.portfolio_backend.DTO.*;
import com.example.portfolio_backend.Frontend.GetCertificates;
import com.example.portfolio_backend.Models.*;
import com.example.portfolio_backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepo userRepo;


    @Autowired
    private CertificateRepo certificateRepo;

    @Autowired
    private EducationRepo educationRepo;

    @Autowired
    private ExperienceRepo experienceRepo;

    @Autowired
    private ProjectRepo projectRepo;

    public Boolean signUp(SignUp signup){
        User user = User.builder()
                .name(signup.getName())
                .code(signup.getCode())
                .password(signup.getPassword())
                .role("CREATOR")
                .build();
        userRepo.save(user);
        return true;

    }
    public Boolean addCertificate(Certificate certificate, String code){
        User user = userRepo.findByCode(code).orElseThrow(()-> new RuntimeException("maa chuda le"));
        Certificates certificate1 = Certificates.builder()
                .name(certificate.getName())
                .instituteName(certificate.getInstituteName())
                .percentage(certificate.getPercentage()).
                certificateId(certificate.getCertificateId())
                .certificateLink(certificate.getCertificateLink())
                .user(user)
                .build();
        certificateRepo.save(certificate1);
        return true;

    }
    public Boolean addEducation(Educations educations,String code){
        User user = userRepo.findByCode(code).orElseThrow(()-> new RuntimeException("maa chuda le"));
        Education education = Education.builder()
                .name(educations.getName())
                .percentage(educations.getPercentage())
                .instituteName(educations.getInstituteName())
                .years(educations.getYears())
                .achievments(educations.getAchievments())
                .user(user)
                .build();
        educationRepo.save(education);
        return true;
    }
    public Boolean addExperience(Experiences experiences, String code){
        User user = userRepo.findByCode(code).orElseThrow(()->new RuntimeException("maa chuda le"));
        Experience experience = Experience.builder()
                .jobRole(experiences.getJobRole())
                .experience(experiences.getExperience())
                .time(experiences.getTime())
                .company(experiences.getCompany())
                .achievments(experiences.getAchievements())
                .user(user)
                .build();
        experienceRepo.save(experience);
        return true;
    }
    public Boolean addProjects(Project project,String code){
        User user = userRepo.findByCode(code).orElseThrow(()->new RuntimeException("maa chuda le"));
        Projects projects = Projects.builder()
                .name(project.getName())
                .projectLink(project.getProjectLink())
                .githubLink(project.getGithubLink())
                .description(project.getDescription())
                .user(user)
                .build();
        projectRepo.save(projects);
        return true;
    }
    public User getUserDetails(String code){
        User user = userRepo.findByCode(code).orElseThrow(()-> new RuntimeException("maa chuda le"));
        return user;
    }
    public List<GetCertificates> getCertificates(){
        return certificateRepo.findAllC();
    }
    public List<Educations> getEducation(){
        return educationRepo.findByUserId();
    }
    public List<Experiences> getExperiences(){
        return experienceRepo.findByUserId();
    }
    public List<Project> getProjects(){
        return projectRepo.findByUserId();
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByCode(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getCode(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole()))
        );

    }
}
