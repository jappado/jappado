package com.hakaton.jappadoBackend.company.dto;

public record CompanyResponseDto(
        Long companyId,
        String name,
        String address,
        String category,
        String text,
        byte[] image
) {}
