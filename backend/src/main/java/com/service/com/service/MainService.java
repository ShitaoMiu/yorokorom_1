package com.service.com.service;

import org.springframework.stereotype.Service;

import com.service.com.mapper.MainMapper;
import com.service.com.repository.MainRepository;

import lombok.RequiredArgsConstructor;

@Service
public class MainService {

	private final MainRepository mainRepository;
	private final MainMapper mainMapper;

	public MainService(MainRepository mainRepository,MainMapper mainMapper) 
	{
		this.mainRepository = mainRepository;
		this.mainMapper= mainMapper;
	}
	public void insertDate() {
		mainMapper.insertData();
	}

}
   