package com.hakaton.jappadoBackend.company.dto;

public record CompanyRequestDto(
        String name,
        String address,
        String category,
        String text
) {}
