package com.example.store.controller.overall_management;

import com.example.store.payload.overall_management.response.RevenueResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DashBoardController {
    @GetMapping("/dashboard/revenue/{revenue_id}")
    public ResponseEntity<?> getAnnualRevenue(@PathVariable(value = "revenue_id") String revenue_id){
        Date currentDate = new Date();
        Date oneYearBefore = new Date(currentDate.getTime() - (365L * 24L * 60L * 60L * 1000L));
        List<Integer> revenue = null;
        if(revenue_id.equals("month")){

        }
        if(revenue_id.equals("year")){

        }
        if(revenue_id.equals("day")){

        }
        return new ResponseEntity<>(new RevenueResponse(revenue), HttpStatus.OK);
    }

    // total customers
    // bill in a month
    // total revenue
    // average price per bill
    // number of products sold
    // top 5 customer chi tra nhieu tien nhat
}
