package com.hakaton.jappadoBackend.api.data;

public class Data {
    private String contractType;
    private String deposit;
    private String monthlyRent;
    private String offiNm;
    private String region;
    private String excluUseAr;

    // Getter & Setter
    public String getContractType() {
        return contractType;
    }
    public void setContractType(String contractType) {
        this.contractType = contractType;
    }
    public String getDeposit() {
        return deposit;
    }
    public void setDeposit(String deposit) {
        this.deposit = deposit;
    }
    public String getMonthlyRent() {
        return monthlyRent;
    }
    public void setMonthlyRent(String monthlyRent) {
        this.monthlyRent = monthlyRent;
    }
    public String getOffiNm() {
        return offiNm;
    }
    public void setOffiNm(String offiNm) {
        this.offiNm = offiNm;
    }
    public String getRegion() {
        return region;
    }
    public void setRegion(String region) {
        this.region = region;
    }
    public String getExcluUseAr() {
        return excluUseAr;
    }
    public void setExcluUseAr(String excluUseAr) {
        this.excluUseAr = excluUseAr;
    }
}
