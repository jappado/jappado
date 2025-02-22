package com.hakaton.jappadoBackend.candidate.service;

import com.hakaton.jappadoBackend.candidate.entity.Candidate;
import com.hakaton.jappadoBackend.candidate.repository.CandidateRepository;
import com.hakaton.jappadoBackend.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CandidateService {

    private final LoggerUtil logger = LoggerUtil.getInstance();

    @Autowired
    private CandidateRepository candidateRepository;

    /**
     * 새로운 지원자를 등록합니다.
     *
     * @param candidate 등록할 Candidate 엔티티 객체.
     * @return 데이터베이스에 저장된 후 생성된 Candidate 객체.
     */
    public Candidate registerCandidate(Candidate candidate) {
        logger.info("[CandidateService] registerCandidate 처리: ", candidate);
        return candidateRepository.save(candidate);
    }

    /**
     * ID로 지원자 정보를 조회합니다.
     *
     * @param id 조회할 Candidate의 고유 ID.
     * @return 조회된 Candidate 객체.
     * @throws RuntimeException 해당 ID의 지원자가 존재하지 않을 경우 예외 발생.
     */
    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<Candidate> getAllCandidates() {
        List<Candidate> candidates = candidateRepository.findAll();
        logger.info("[CandidateService] getAllCandidates 호출됨, 결과 개수: " + candidates.size());

        for (Candidate c : candidates) {
            logger.info("Candidate: " + c.getFullName() + ", Email: " + c.getEmail());
        }

        return candidates;
    }
}
