package com.service.com.repository;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
@Repository
 public class MainRepository {
	  private final EntityManager em;
	  
	  public MainRepository(EntityManager em) 
	  {
		  this.em = em;
	  }
	  
}
   