package com.example.store.payload.overall_management.response;

import com.example.store.repository.sell_management.MostPaidCustomer;

import java.util.List;

public class OverAllResponse {
    private Integer customerCount;
    private Float revenue;
    private Float averagePricePerBill;
    private List<MostPaidCustomer> mostPaidCustomerList;

    public OverAllResponse(Integer customerCount, Float revenue, Float averagePricePerBill, List<MostPaidCustomer> mostPaidCustomerList) {
        this.customerCount = customerCount;
        this.revenue = revenue;
        this.averagePricePerBill = averagePricePerBill;
        this.mostPaidCustomerList = mostPaidCustomerList;
    }

    public List<MostPaidCustomer> getMostPaidCustomerList() {
        return mostPaidCustomerList;
    }

    public void setMostPaidCustomerList(List<MostPaidCustomer> mostPaidCustomerList) {
        this.mostPaidCustomerList = mostPaidCustomerList;
    }

    public Float getAveragePricePerBill() {
        return averagePricePerBill;
    }

    public void setAveragePricePerBill(Float averagePricePerBill) {
        this.averagePricePerBill = averagePricePerBill;
    }

    public Float getRevenue() {
        return revenue;
    }

    public void setRevenue(Float revenue) {
        this.revenue = revenue;
    }

    public Integer getCustomerCount() {
        return customerCount;
    }

    public void setCustomerCount(Integer customerCount) {
        this.customerCount = customerCount;
    }
}
