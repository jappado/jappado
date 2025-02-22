package com.hakaton.jappadoBackend.api.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class ApiService {
    private static final String BASE_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcOffiRent/getRTMSDataSvcOffiRent";
    private static final String SERVICE_KEY = "vNyagBk21N64UgyKvgc408lxy2WrIEROYWCOmq8jhTen3jAREPGLL42YUWJ8u/AIsZaOKVf2blCVjBPUsNggBw==";
    private static final String DEAL_YMD = "202502";  // 거래 연월

    public String fetchXmlData(String lawdCd) {
        String url = BASE_URL + "?LAWD_CD=" + lawdCd + "&DEAL_YMD=" + DEAL_YMD + "&serviceKey=" + SERVICE_KEY;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}
