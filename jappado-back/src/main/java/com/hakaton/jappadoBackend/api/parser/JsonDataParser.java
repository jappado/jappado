package com.hakaton.jappadoBackend.api.parser;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hakaton.jappadoBackend.api.data.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonDataParser {

    public Map<String, List<Data>> parseAndGroupByRegion(String jsonData) {
        Map<String, List<Data>> regionDataMap = new HashMap<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonData);
            JsonNode itemsNode = root.path("response").path("body").path("items").path("item");

            if (itemsNode.isArray()) {
                for (JsonNode itemNode : itemsNode) {
                    Data data = new Data();
                    data.setExcluUseAr(itemNode.path("excluUseAr").asText());
                    data.setContractType(itemNode.path("contractType").asText());
                    data.setDeposit(itemNode.path("deposit").asText());
                    data.setMonthlyRent(itemNode.path("monthlyRent").asText());
                    data.setOffiNm(itemNode.path("offiNm").asText());

                    String region = itemNode.path("sggNm").asText().trim();
                    data.setRegion(region);

                    regionDataMap.computeIfAbsent(region, k -> new ArrayList<>()).add(data);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return regionDataMap;
    }
}
