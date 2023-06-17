package com.demo.springbootecommerce.dto;

import com.demo.springbootecommerce.entity.Address;
import com.demo.springbootecommerce.entity.Customer;
import com.demo.springbootecommerce.entity.Order;
import com.demo.springbootecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
