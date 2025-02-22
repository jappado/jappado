package com.hakaton.jappadoBackend.candidate.controller;

import com.hakaton.jappadoBackend.candidate.dto.CandidateResponseDto;
import com.hakaton.jappadoBackend.candidate.entity.Candidate;
import com.hakaton.jappadoBackend.candidate.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> registerCandidate(
            @RequestPart("fullName") String fullName,
            @RequestPart("email") String email,
            @RequestPart("phoneNumber") String phoneNumber,
            @RequestPart("skills") String skills,
            @RequestPart("experience") String experience,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture,
            @RequestPart("category") String category) {

        byte[] profilePictureBytes = null;
        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                profilePictureBytes = profilePicture.getBytes();
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로필 사진 변환 실패");
            }
        }

        Candidate candidate = Candidate.builder()
                .fullName(fullName)
                .email(email)
                .phoneNumber(phoneNumber)
                .skills(skills)
                .experience(experience)
                .profilePicture(profilePictureBytes)
                .category(category)
                .build();

        Candidate savedCandidate = candidateService.registerCandidate(candidate);
        return ResponseEntity.ok(savedCandidate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidateResponseDto> getCandidate(@PathVariable Long id) {
        Candidate candidate = candidateService.getCandidateById(id);
        return ResponseEntity.ok(mapToDto(candidate));
    }

    @GetMapping("/candidateInfo")
    public ResponseEntity<List<CandidateResponseDto>> getAllCandidates() {
        List<Candidate> candidates = candidateService.getAllCandidates();
        List<CandidateResponseDto> dtos = candidates.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    private CandidateResponseDto mapToDto(Candidate candidate) {
        return new CandidateResponseDto(
                candidate.getId(),
                candidate.getFullName(),
                candidate.getEmail(),
                candidate.getPhoneNumber(),
                candidate.getSkills(),
                candidate.getExperience(),
                candidate.getProfilePicture(),
                candidate.getCategory()
        );
    }

}
