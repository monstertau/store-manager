package com.example.store.payload.overall_management.response;

import java.util.List;

public class RevenueResponse {
    private Boolean success = true;
    private List<Integer> revenue;

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public List<Integer> getRevenue() {
        return revenue;
    }

    public RevenueResponse(List<Integer> revenue) {
        this.revenue = revenue;
    }

    public void setRevenue(List<Integer> revenue) {
        this.revenue = revenue;
    }
}
