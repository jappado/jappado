package com.hakaton.jappadoBackend.company.repository;

import com.hakaton.jappadoBackend.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}