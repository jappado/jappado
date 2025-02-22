package com.hakaton.jappadoBackend.candidate.dto;

public record CandidateResponseDto(
        Long id,
        String fullName,
        String email,
        String phoneNumber,
        String skills,
        String experience,
        byte[] profilePicture,
        String category
) {}
