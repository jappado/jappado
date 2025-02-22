package com.hakaton.jappadoBackend.offer.controller;

import com.hakaton.jappadoBackend.offer.dto.OfferRequestDto;
import com.hakaton.jappadoBackend.offer.dto.OfferResponseDto;
import com.hakaton.jappadoBackend.offer.service.OfferService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @PostMapping
    public ResponseEntity<OfferResponseDto> createProposal(@RequestBody OfferRequestDto requestDto) {
        OfferResponseDto responseDto = offerService.createProposal(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{proposalId}/respond")
    public ResponseEntity<OfferResponseDto> respondToProposal(
            @PathVariable Long proposalId,
            @RequestBody String response) {
        OfferResponseDto updatedOffer = offerService.respondToProposal(proposalId, response);
        log.info("respondToProposal 수행: ", response);
        return ResponseEntity.ok(updatedOffer);
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<OfferResponseDto>> getOffersForCandidate(@PathVariable Long candidateId) {
        List<OfferResponseDto> offers = offerService.getOffersByCandidateId(candidateId);
        return ResponseEntity.ok(offers);
    }
}
