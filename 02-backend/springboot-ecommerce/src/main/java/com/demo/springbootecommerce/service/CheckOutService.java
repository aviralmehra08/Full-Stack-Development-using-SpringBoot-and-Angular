package com.demo.springbootecommerce.service;

import com.demo.springbootecommerce.dto.Purchase;
import com.demo.springbootecommerce.dto.PurchaseResponse;

public interface CheckOutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
