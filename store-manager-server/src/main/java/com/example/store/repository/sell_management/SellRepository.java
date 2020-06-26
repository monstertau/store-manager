package com.example.store.repository.sell_management;

import java.util.List;
import java.util.Optional;

import com.example.store.model.sell_management.Sell;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SellRepository extends JpaRepository<Sell, Long> {
    Optional<Sell> findById(Long id);

    @Query("SELECT e from Sell e WHERE e.user_id = :user_id AND e.customer_id = :customer_id AND e.createdAt >= STR_TO_DATE(:start, '%Y-%m-%d %H:%i:%s') AND e.createdAt <= STR_TO_DATE(:end, '%Y-%m-%d %H:%i:%s')  ORDER BY e.createdAt ASC")
    Page<Sell> findByUserIdAndCustomerIdAndDate(Long user_id, Long customer_id, String start, String end, Pageable pageable);

    @Query("SELECT e from Sell e WHERE e.user_id = :id  ORDER BY SUM(e.createdAt) ASC")
    Page<Sell> findByUserId(Long id, Pageable pageable);

    @Query("SELECT e from Sell e WHERE e.customer_id = :id  ORDER BY e.createdAt ASC")
    Page<Sell> findByCustomerId(Long id, Pageable pageable);

    @Query("SELECT e from Sell e WHERE e.createdAt >= STR_TO_DATE(:start, '%Y-%m-%d %H:%i:%s') AND e.createdAt <= STR_TO_DATE(:end, '%Y-%m-%d %H:%i:%s')  ORDER BY e.createdAt ASC")
    Page<Sell> findByDate(String start, String end, Pageable pageable);

    Page<Sell> findAll(Pageable pageable);

    @Query("SELECT e.total from Sell e WHERE e.createdAt >= STR_TO_DATE(:start, '%Y-%m-%d %H:%i:%s') AND e.createdAt <= STR_TO_DATE(:end, '%Y-%m-%d %H:%i:%s')")
    List<Float> findTotalPerBill(String start,String end);

    @Query("SELECT new com.example.store.repository.sell_management.MostPaidCustomer(e.customer_id, sum(e.total) ) from Sell e WHERE e.createdAt >= STR_TO_DATE(:start, '%Y-%m-%d %H:%i:%s') AND e.createdAt <= STR_TO_DATE(:end, '%Y-%m-%d %H:%i:%s') AND e.customer_id IS NOT NULL GROUP BY e.customer_id ORDER BY sum(e.total) DESC")
    List<MostPaidCustomer> findMostPaidCustomer(String start,String end);
}