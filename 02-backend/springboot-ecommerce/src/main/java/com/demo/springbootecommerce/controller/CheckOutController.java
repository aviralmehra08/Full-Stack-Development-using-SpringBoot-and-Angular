package com.demo.springbootecommerce.controller;

import com.demo.springbootecommerce.dto.Purchase;
import com.demo.springbootecommerce.dto.PurchaseResponse;
import com.demo.springbootecommerce.service.CheckOutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckOutController {
    private CheckOutService checkoutService;
    public CheckOutController(CheckOutService checkOutService){
        this.checkoutService = checkOutService;
    }
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse  = checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }
}
