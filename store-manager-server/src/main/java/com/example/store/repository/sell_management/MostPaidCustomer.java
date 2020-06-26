package com.example.store.repository.sell_management;

public class MostPaidCustomer {
    private Long customer_id;
    private Double total;
    public MostPaidCustomer(Long customer_id, Double total) {
        this.customer_id = customer_id;
        this.total = total;
    }


    public Long getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }


}
