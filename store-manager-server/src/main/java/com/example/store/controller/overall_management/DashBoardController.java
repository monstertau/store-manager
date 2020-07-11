package com.example.store.controller.overall_management;

import com.example.store.payload.overall_management.response.RevenueResponse;
import com.example.store.repository.sell_management.MostPaidCustomer;
import com.example.store.payload.overall_management.request.OverAllRequest;
import com.example.store.payload.overall_management.response.OverAllResponse;
import com.example.store.repository.customer_management.CustomerRepository;
import com.example.store.repository.sell_management.SellItemRepository;
import com.example.store.repository.sell_management.SellRepository;
import com.example.store.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DashBoardController {
    /*
    - Revenue:
    - Total Customer:
    - Average Price per Bill:
    - Number of product sold:
     */
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private SellItemRepository sellItemRepository;
    @Autowired
    private SellRepository sellRepository;

    @PostMapping("/dashboard/overall")
    public ResponseEntity<?> OverAllData(@Valid @RequestBody OverAllRequest overAllRequest) {
        Logger logger = LoggerFactory.getLogger(DashBoardController.class);
        logger.info(overAllRequest.getStart());
        Double sell_revenue = sellItemRepository.totalSell(overAllRequest.getStart(), overAllRequest.getEnd());
        Double revenue = 0D;
        if(sell_revenue != null){
            revenue = sell_revenue;
        }
        Integer customerCount = customerRepository.countCustomer(overAllRequest.getStart(), overAllRequest.getEnd());
        List<Float> totalPerBill = sellRepository.findTotalPerBill(overAllRequest.getStart(), overAllRequest.getEnd());
        Float totalPrice = 0.0f;
        for (Float total : totalPerBill) {
            totalPrice += total;
        }
        List<MostPaidCustomer> mostPaidCustomerList = sellRepository.findMostPaidCustomer(overAllRequest.getStart(), overAllRequest.getEnd());
        Float averagePricePerBill = totalPrice / (totalPerBill.size());
        return new ResponseEntity<>(new OverAllResponse(customerCount, revenue.floatValue(), averagePricePerBill, mostPaidCustomerList), HttpStatus.OK);
    }

    @GetMapping("/dashboard/revenue")
    public ResponseEntity<?> Revenue() {
        List<Double> thisMonth = new ArrayList<>();
        List<Double> thisYear = new ArrayList<>();
        List<Double> thisDay = new ArrayList<>();
        List<Double> lastMonth = new ArrayList<>();
        List<Double> lastYear = new ArrayList<>();
        List<Double> lastDay = new ArrayList<>();
        DateUtil dateUtil = new DateUtil();
        for (int i = 0; i < dateUtil.getThisYear().size() - 1; i++) {
            String thisStart = dateUtil.getThisYear().get(i);
            String thisEnd = dateUtil.getThisYear().get(i + 1);
            System.out.println(sellItemRepository.totalSell("2020-01-30 06:52:05", "2020-06-30 06:52:05"));
            Double sell_revenue = sellItemRepository.totalSell(thisStart, thisEnd);
            Double revenue = 0D;
            if(sell_revenue != null){
                revenue = sell_revenue;
            }
            thisYear.add(revenue);
        }
        for (int i = 0; i < dateUtil.getLastYear().size() - 1; i++) {
            String lastStart = dateUtil.getLastYear().get(i);
            String lastEnd = dateUtil.getLastYear().get(i + 1);
            Double sell_revenue = sellItemRepository.totalSell(lastStart, lastEnd);
            Double revenue = 0D;
            if(sell_revenue != null){
                revenue = sell_revenue;
            }
            lastYear.add(revenue);

        }
        for (int i = 0; i < dateUtil.getThisMonth().size() - 1; i++) {
            String thisStart = dateUtil.getThisMonth().get(i);
            String thisEnd = dateUtil.getThisMonth().get(i + 1);
            Double sell_revenue = sellItemRepository.totalSell(thisStart, thisEnd);
            Double revenue = 0D;
            if(sell_revenue != null){
                revenue = sell_revenue;
            }
            thisMonth.add(revenue);
        }
        for (int i = 0; i < dateUtil.getLastMonth().size() - 1; i++) {
            String lastStart = dateUtil.getLastMonth().get(i);
            String lastEnd = dateUtil.getLastMonth().get(i + 1);
            Double sell_revenue = sellItemRepository.totalSell(lastStart, lastEnd);
            Double revenue = 0D;
            if(sell_revenue != null){
                revenue = sell_revenue;
            }
            lastMonth.add(revenue);
        }
        for (int i = 0; i < dateUtil.getThisDay().size() - 1; i++) {
            String thisStart = dateUtil.getThisDay().get(i);
            String thisEnd = dateUtil.getThisDay().get(i + 1);
            Double sell_revenue = sellItemRepository.totalSell(thisStart, thisEnd);
            Double revenue = 0D;
            if(sell_revenue != null){
                revenue = sell_revenue;
            }
            thisDay.add(revenue);
        }
        for (int i = 0; i < dateUtil.getLastDay().size() - 1; i++) {
            String lastStart = dateUtil.getLastDay().get(i);
            String lastEnd = dateUtil.getLastDay().get(i + 1);
            Double sell_revenue = sellItemRepository.totalSell(lastStart, lastEnd);
            Double revenue = 0D;
            if(sell_revenue != null){
                revenue = sell_revenue;
            }
            lastDay.add(revenue);
        }

        return new ResponseEntity<>(new RevenueResponse(thisMonth, thisYear, thisDay, lastMonth, lastYear, lastDay), HttpStatus.OK);
    }


}
