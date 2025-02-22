package com.hakaton.jappadoBackend.offer.service;

import com.hakaton.jappadoBackend.offer.dto.OfferRequestDto;
import com.hakaton.jappadoBackend.offer.dto.OfferResponseDto;
import com.hakaton.jappadoBackend.offer.entity.Offer;
import com.hakaton.jappadoBackend.offer.repository.OfferRepository;
import com.hakaton.jappadoBackend.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OfferService {

    private final LoggerUtil logger = LoggerUtil.getInstance();

    @Autowired
    private OfferRepository offerRepository;

    public OfferResponseDto createProposal(OfferRequestDto requestDto) {
        logger.info("[OfferService] createProposal - received candidateId: {}", requestDto.candidateId());
        Offer proposal = Offer.builder()
                .candidateId(requestDto.candidateId())
                .companyId(requestDto.companyId())
                .jobTitle(requestDto.jobTitle())
                .jobDescription(requestDto.jobDescription())
                .proposedSalary(requestDto.proposedSalary())
                .status("pending")
                .build();

        Offer savedProposal = offerRepository.save(proposal);
        logger.info("[OfferService] createProposal - saved proposal candidateId: {}", savedProposal.getCandidateId());

        return new OfferResponseDto(
                savedProposal.getId(),
                savedProposal.getCandidateId(),
                savedProposal.getCompanyId(),
                savedProposal.getJobTitle(),
                savedProposal.getJobDescription(),
                savedProposal.getProposedSalary(),
                savedProposal.getStatus()
        );
    }

    public OfferResponseDto respondToProposal(Long proposalId, String response) {
        Offer proposal = offerRepository.findById(proposalId)
                .orElseThrow(() -> new RuntimeException("Proposal not found with id: " + proposalId));


        proposal.updateStatus(response.toLowerCase());
        Offer updatedProposal = offerRepository.save(proposal);
        logger.info("[OfferService] respondToProposal 동작: {}", updatedProposal.getStatus());

        return new OfferResponseDto(
                updatedProposal.getId(),
                updatedProposal.getCandidateId(),
                updatedProposal.getCompanyId(),
                updatedProposal.getJobTitle(),
                updatedProposal.getJobDescription(),
                updatedProposal.getProposedSalary(),
                updatedProposal.getStatus()
        );
    }

    public List<OfferResponseDto> getOffersByCandidateId(Long candidateId) {
        List<Offer> offers = offerRepository.findByCandidateId(candidateId);
        logger.info("[OfferService] getOffersByCandidateId 동작: {}", offers);
        return offers.stream()
                .map(offer -> new OfferResponseDto(
                        offer.getId(),
                        offer.getCandidateId(),
                        offer.getCompanyId(),
                        offer.getJobTitle(),
                        offer.getJobDescription(),
                        offer.getProposedSalary(),
                        offer.getStatus()))
                .collect(Collectors.toList());
    }
}
