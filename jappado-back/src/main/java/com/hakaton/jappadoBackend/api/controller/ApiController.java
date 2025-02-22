package com.hakaton.jappadoBackend.api.controller;

import com.hakaton.jappadoBackend.api.data.Data;
import com.hakaton.jappadoBackend.api.parser.JsonDataParser;
import com.hakaton.jappadoBackend.api.service.ApiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
public class ApiController {

    // 지역명과 법정동 코드(LAWD_CD)를 매핑한 Map
    private static final Map<String, String> regionCodes = Map.ofEntries(
            Map.entry("중구", "26110"),
            Map.entry("서구", "26140"),
            Map.entry("동구", "26170"),
            Map.entry("영도구", "26200"),
            Map.entry("부산진구", "26230"),
            Map.entry("동래구", "26260"),
            Map.entry("남구", "26290"),
            Map.entry("북구", "26320"),
            Map.entry("해운대구", "26350"),
            Map.entry("사하구", "26380"),
            Map.entry("금정구", "26410"),
            Map.entry("강서구", "26440"),
            Map.entry("연제구", "26470"),
            Map.entry("수영구", "26500"),
            Map.entry("사상구", "26530"),
            Map.entry("기장군", "26710")
    );

    private final ApiService apiService;
    private final JsonDataParser parser;

    public ApiController() {
        this.apiService = new ApiService();
        this.parser = new JsonDataParser();
    }

    @GetMapping("/region/{regionName}")
    public ResponseEntity<?> getDataByRegion(@PathVariable("regionName") String regionName) {
        // 입력값 정제
        regionName = regionName.trim().replaceAll("[\\p{Cntrl}&&[^\r\n\t]]", "");

        String lawdCd = regionCodes.get(regionName);
        if (lawdCd == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("해당 지역(" + regionName + ")에 대한 법정동 코드가 존재하지 않습니다.");
        }

        String xmlData = apiService.fetchXmlData(lawdCd);
        Map<String, List<Data>> regionDataMap = parser.parseAndGroupByRegion(xmlData);

        List<Data> dataList = regionDataMap.get(regionName);
        if (dataList == null || dataList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("해당 지역(" + regionName + ")에 대한 데이터가 없습니다.");
        }
        return ResponseEntity.ok(dataList);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRegionData() {
        Map<String, List<Data>> allData = new HashMap<>();

        for (Map.Entry<String, String> entry : regionCodes.entrySet()) {
            String regionName = entry.getKey();
            String lawdCd = entry.getValue();

            String xmlData = apiService.fetchXmlData(lawdCd);

            Map<String, List<Data>> regionDataMap = parser.parseAndGroupByRegion(xmlData);
            List<Data> dataList = regionDataMap.get(regionName);
            if (dataList == null) {
                dataList = new ArrayList<>();
            }
            allData.put(regionName, dataList);
        }
        return ResponseEntity.ok(allData);
    }
}
