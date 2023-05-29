package com.demo.springbootecommerce.dao;

import com.demo.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
