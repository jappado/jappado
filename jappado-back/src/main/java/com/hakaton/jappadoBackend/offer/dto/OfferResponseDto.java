package com.hakaton.jappadoBackend.offer.dto;

public record OfferResponseDto (
        Long id,            // 제안의 고유 ID
        Long candidateId,   // 후보자의 ID
        Long companyId,     // 기업의 ID
        String jobTitle,
        String jobDescription,
        String proposedSalary,
        String status
){}
