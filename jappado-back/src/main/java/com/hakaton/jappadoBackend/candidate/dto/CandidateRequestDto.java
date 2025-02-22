package com.hakaton.jappadoBackend.candidate.dto;

public record CandidateRequestDto(
        String fullName,
        String email,
        String phoneNumber,
        String skills,
        String experience,
        String category
) {}
