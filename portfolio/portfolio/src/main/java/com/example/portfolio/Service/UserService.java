package com.example.portfolio.Service;

import com.example.portfolio.DTO.Certificate;
import com.example.portfolio.DTO.Educations;
import com.example.portfolio.DTO.Experiencesfrontend;
import com.example.portfolio.DTO.Project;
import com.example.portfolio.Frontend.GetCertificates;
import com.example.portfolio.Models.*;
import com.example.portfolio.Repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService{

    @Value("${aws.bucket-name}")
    private String bucketName;

    private String region;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private S3Client s3client;

    @Autowired
    private S3Presigner s3Presigner;

    @Autowired
    private CertificateRepo certificateRepo;

    @Autowired
    private EducationRepo educationRepo;

    @Autowired
    private ExperienceRepo experienceRepo;

    @Autowired
    private ProjectRepo projectRepo;

//    public Boolean signUp(SignUp signup){
//        User user = User.builder()
//                .name(signup.getName())
//                .code(signup.getCode())
//                .password(signup.getPassword())
//                .codew(true)
//                .role("CREATOR")
//                .build();
//        userRepo.save(user);
//        return true;
//
//    }
    public Boolean addCertificate(Certificate dto, String code) throws IOException {

        User user = userRepo.findByCode(code)
                .orElseThrow(()-> new RuntimeException("ss"));

        MultipartFile file = dto.getCertificate();

        String key = "certificates/" + user.getId() + "/" + UUID.randomUUID() + ".pdf";

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .build();

        s3client.putObject(
                request,
                RequestBody.fromInputStream(
                        file.getInputStream(),
                        file.getSize()
                )
        );

        Certificates certificate = Certificates.builder()
                .name(dto.getName())
                .instituteName(dto.getInstituteName())
                .date(dto.getCertificateDate())
                .s3Key(key)
                .user(user)
                .build();

        certificateRepo.save(certificate);

        return true;
    }
    public Boolean addEducation(Educations educations, String code){
        User user = userRepo.findByCode(code).orElseThrow(()-> new RuntimeException("maa chuda le"));
        Education education = Education.builder()
                .name(educations.getName())
                .percentage(educations.getPercentage())
                .instituteName(educations.getInstituteName())
                .years(educations.getYears())
                .user(user)
                .build();
        educationRepo.save(education);
        return true;
    }
    public Boolean addExperience(Experiencesfrontend experiences, String code){
        User user = userRepo.findByCode(code).orElseThrow(()->new RuntimeException("maa chuda le"));
        Experience experience = Experience.builder()
                .jobRole(experiences.getJobRole())
                .experience(experiences.getExperience())
                .time(experiences.getTime())
                .company(experiences.getCompany())
                .user(user)
                .build();
        experienceRepo.save(experience);
        return true;
    }
    public Boolean addProjects(Project project, String code){
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
    public List<Experience> getExperiences(){
        return experienceRepo.findByUserId();
    }
    public List<Projects> getProjects(){
        return projectRepo.findByUserId();
    }
    public URL generatePresignedUrl(Integer id) {
        Certificates certificates = certificateRepo.findById(id).orElseThrow(()-> new RuntimeException("maa chuda"));


        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(certificates.getS3Key())
                .build();

        GetObjectPresignRequest presignRequest =
                GetObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(15))
                        .getObjectRequest(getObjectRequest)
                        .build();

        return s3Presigner.presignGetObject(presignRequest).url();
    }
    @Transactional
    public boolean deleteCertificate(Integer id){
        Certificates cert = certificateRepo.findById(id).orElseThrow();

        s3client.deleteObject(DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(cert.getS3Key())
                .build());

        User user = cert.getUser();
        if(user != null){
            user.getCertificates().remove(cert);
        }
        return true;
    }
    @Transactional
    public void deleteExperience(Integer id) {

        Experience exp = experienceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        User user = exp.getUser();

        if (user != null) {
            user.getExperiences().remove(exp);
        }
    }
    @Transactional
    public void deleteProject(Integer id){
        Projects project = projectRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("not found"));
        User user = project.getUser();

        if (user != null) {
            user.getExperiences().remove(project);
        }

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
