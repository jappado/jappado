package com.hakaton.jappadoBackend.company.controller;

import com.hakaton.jappadoBackend.company.dto.CompanyResponseDto;
import com.hakaton.jappadoBackend.company.entity.Company;
import com.hakaton.jappadoBackend.company.service.CompanyService;
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
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<CompanyResponseDto> registerCompany(
            @RequestPart("name") String name,
            @RequestPart("address") String address,
            @RequestPart("category") String category,
            @RequestPart("text") String text,
            @RequestPart(value = "image", required = false) MultipartFile image) {


        byte[] imageBytes = null;
        if (image != null && !image.isEmpty()) {
            try {
                imageBytes = image.getBytes();
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }

        Company company = Company.builder()
                .name(name)
                .address(address)
                .category(category)
                .text(text)
                .image(imageBytes)
                .build();

        Company savedCompany = companyService.registerCompany(company);
        return ResponseEntity.ok(mapToDto(savedCompany));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponseDto> getCompany(@PathVariable Long id) {
        Company company = companyService.getCompanyById(id);
        return ResponseEntity.ok(mapToDto(company));
    }

    @GetMapping("/companies")
    public ResponseEntity<List<CompanyResponseDto>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        List<CompanyResponseDto> dtos = companies.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    private CompanyResponseDto mapToDto(Company company) {
        return new CompanyResponseDto(
                company.getId(),
                company.getName(),
                company.getAddress(),
                company.getCategory(),
                company.getText(),
                company.getImage()
        );
    }
}
