package com.example.portfolio_backend.Controller;

import com.example.portfolio_backend.DTO.*;
import com.example.portfolio_backend.Frontend.GetCertificates;
import com.example.portfolio_backend.Models.Experience;
import com.example.portfolio_backend.Models.Projects;
import com.example.portfolio_backend.Models.User;
import com.example.portfolio_backend.Security.JwtUtil;
import com.example.portfolio_backend.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.io.IOException;
import java.net.URL;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signUp")
    private ResponseEntity<Boolean> signUp(@RequestBody SignUp signUp){
        signUp.setPassword(passwordEncoder.encode(signUp.getPassword()).toString());
        Boolean bool = userService.signUp(signUp);
        return ResponseEntity.ok(bool);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login login, HttpServletResponse httpServletResponse){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(login.getCode(), login.getPassword()));
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);
            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 10 * 60 * 60);
            httpServletResponse.addCookie(cookie);

            return ResponseEntity.status(HttpStatus.OK).body(login.getCode());
        }catch(BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("bhaag jaa madarchod yahan se");
        }
    }

    @PostMapping(
            value = "/addCertificate",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Boolean> addCertificate(
            @ModelAttribute Certificate certificate
    ) throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null &&
                authentication.isAuthenticated() &&
                authentication.getPrincipal() instanceof UserDetails) {

            String code = ((UserDetails) authentication.getPrincipal()).getUsername();

            Boolean bool = userService.addCertificate(certificate, code);
            return ResponseEntity.ok(bool);

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @GetMapping("/viewCertificate/{id}")
    public ResponseEntity<URL> viewCertificate(@PathVariable Integer id){
        URL url = userService.generatePresignedUrl(id);
        return ResponseEntity.status(HttpStatus.OK).body(url);

    }

    @DeleteMapping("/deleteCertificate/{id}")
    public ResponseEntity<Boolean> deleteCertificate(@PathVariable Integer id){
        Boolean bool = userService.deleteCertificate(id);
        return ResponseEntity.ok(bool);

    }

    @PostMapping("/addEducation")
    public ResponseEntity<Boolean> addEducation(@RequestBody Educations education){
        Authentication authentication = (Authentication) SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated() &&
                authentication.getPrincipal() instanceof UserDetails){

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String code = userDetails.getUsername();
            Boolean bool =  userService.addEducation(education,code);
            return ResponseEntity.status(HttpStatus.OK).body(bool);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @PostMapping("/addExperience")
    public ResponseEntity<Boolean> addExperience(@RequestBody Experiencesfrontend experiences){
        Authentication authentication = (Authentication) SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated() &&
                authentication.getPrincipal() instanceof UserDetails){

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String code = userDetails.getUsername();
            Boolean bool =  userService.addExperience(experiences,code);
            return ResponseEntity.status(HttpStatus.OK).body(bool);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @PostMapping("/addProjects")
    public ResponseEntity<Boolean> addProjects(@RequestBody Project project) {
        Authentication authentication = (Authentication) SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                authentication.getPrincipal() instanceof UserDetails) {

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String code = userDetails.getUsername();
            Boolean bool = userService.addProjects(project, code);
            return ResponseEntity.status(HttpStatus.OK).body(bool);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUserDetails(){
        Authentication authentication = (Authentication) SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.isAuthenticated() &&
                authentication.getPrincipal() instanceof UserDetails){

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String code = userDetails.getUsername();
            User user =  userService.getUserDetails(code);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/getCertificates")
    public ResponseEntity<List<GetCertificates>> getCertificates() {
            List<GetCertificates> list = userService.getCertificates();
            if (list == null) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(list);
            }


        }

    @GetMapping("/getEducation")
    public ResponseEntity<List<Educations>> getEducation() {

            List<Educations> list = userService.getEducation();
            if (list == null) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(list);
            }


        }


    @GetMapping("/getExperiences")
    public ResponseEntity<List<Experience>> getExperiences(){

            List<Experience> list = userService.getExperiences();
            if (list == null) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(list);
            }
        }



    @GetMapping("/getProjects")
    public ResponseEntity<List<Projects>> getProjects(){
        List<Projects> list =  userService.getProjects();
        if(list == null){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        else{
            return ResponseEntity.status(HttpStatus.OK).body(list);
        }


    }

    @DeleteMapping("/deleteExperiences/{id}")
    public ResponseEntity<Boolean> getExperiences(@PathVariable Integer id, @AuthenticationPrincipal UserDetails userDetails){

         userService.deleteExperience(id);
            return ResponseEntity.status(HttpStatus.OK).body(true);

    }

    @DeleteMapping("/deleteProject/{id}")
    public ResponseEntity<Boolean> deleteProjects(@PathVariable Integer id,@AuthenticationPrincipal UserDetails userDetails){
        userService.deleteProject(id);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }



}
