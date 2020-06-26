package com.example.store.controller.overall_management;

import com.example.store.repository.sell_management.MostPaidCustomer;
import com.example.store.payload.overall_management.request.OverAllRequest;
import com.example.store.payload.overall_management.response.OverAllResponse;
import com.example.store.repository.customer_management.CustomerRepository;
import com.example.store.repository.sell_management.SellItemRepository;
import com.example.store.repository.sell_management.SellRepository;
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
        Integer customerCount = customerRepository.countCustomer(overAllRequest.getStart(), overAllRequest.getEnd());
        List<Float> totalPerBill = sellRepository.findTotalPerBill(overAllRequest.getStart(), overAllRequest.getEnd());
        Float totalPrice = 0.0f;
        for (Float total : totalPerBill) {
            totalPrice += total;
        }
        List<MostPaidCustomer> mostPaidCustomerList = sellRepository.findMostPaidCustomer(overAllRequest.getStart(), overAllRequest.getEnd());
//        List<MostPaidCustomer> mostPaidCustomerList = new ArrayList<MostPaidCustomer>(mostPaidCustomerPage.getContent());
        Float averagePricePerBill = totalPrice / (totalPerBill.size());
        return new ResponseEntity<>(new OverAllResponse(customerCount, sell_revenue.floatValue(), averagePricePerBill, mostPaidCustomerList), HttpStatus.OK);
    }


}
