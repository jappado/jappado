package com.hakaton.jappadoBackend.company.service;

import com.hakaton.jappadoBackend.company.entity.Company;
import com.hakaton.jappadoBackend.company.repository.CompanyRepository;
import com.hakaton.jappadoBackend.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    private final LoggerUtil logger = LoggerUtil.getInstance();

    @Autowired
    private CompanyRepository companyRepository;

    /**
     * 회사 등록 메서드
     *
     * @param company 등록할 회사 객체
     * @return 등록된 회사 객체
     */
    public Company registerCompany(Company company) {
        logger.info("[CompanyService] registerCompany 처리: ");
        return companyRepository.save(company);
    }

    /**
     * ID로 회사 조회 메서드
     *
     * @param id 조회할 회사의 ID
     * @return 조회된 회사 객체
     * @throws RuntimeException 조회되지 않을 경우 예외 발생
     */
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }

    public List<Company> getAllCompanies() {
        logger.info("[CompanyService] getAllCompanies 처리: ");
        return companyRepository.findAll();
    }
}
