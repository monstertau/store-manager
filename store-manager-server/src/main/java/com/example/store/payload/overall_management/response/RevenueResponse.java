package com.example.store.payload.overall_management.response;

import java.util.List;

public class RevenueResponse {
    private Boolean success = true;
    private List<Double> thisMonth;
    private List<Double> thisYear;
    private List<Double> thisDay;
    private List<Double> lastMonth;
    private List<Double> lastYear;
    private List<Double> lastDay;

    public RevenueResponse(List<Double> thisMonth, List<Double> thisYear,
                           List<Double> thisDay, List<Double> lastMonth,
                           List<Double> lastYear, List<Double> lastDay) {
        this.thisMonth = thisMonth;
        this.thisYear = thisYear;
        this.thisDay = thisDay;
        this.lastMonth = lastMonth;
        this.lastYear = lastYear;
        this.lastDay = lastDay;
    }

    public List<Double> getThisMonth() {
        return thisMonth;
    }

    public void setThisMonth(List<Double> thisMonth) {
        this.thisMonth = thisMonth;
    }

    public List<Double> getThisYear() {
        return thisYear;
    }

    public void setThisYear(List<Double> thisYear) {
        this.thisYear = thisYear;
    }

    public List<Double> getThisDay() {
        return thisDay;
    }

    public void setThisDay(List<Double> thisDay) {
        this.thisDay = thisDay;
    }

    public List<Double> getLastMonth() {
        return lastMonth;
    }

    public void setLastMonth(List<Double> lastMonth) {
        this.lastMonth = lastMonth;
    }

    public List<Double> getLastYear() {
        return lastYear;
    }

    public void setLastYear(List<Double> lastYear) {
        this.lastYear = lastYear;
    }

    public List<Double> getLastDay() {
        return lastDay;
    }

    public void setLastDay(List<Double> lastDay) {
        this.lastDay = lastDay;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }


}
