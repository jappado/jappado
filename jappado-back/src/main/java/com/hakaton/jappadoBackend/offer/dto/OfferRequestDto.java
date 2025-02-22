package com.hakaton.jappadoBackend.offer.dto;

public record OfferRequestDto(
        Long candidateId,
        Long companyId,
        String jobTitle,
        String jobDescription,
        String proposedSalary
) {}
