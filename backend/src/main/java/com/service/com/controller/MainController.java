package com.service.com.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.com.service.MainService;

import lombok.RequiredArgsConstructor;

@RestController
public class MainController {

	private final MainService mainService;

	public MainController(MainService mainService) {
		this.mainService = mainService;
	}

	@GetMapping("/welcome")
	public String welcome() {
		mainService.insertDate();
		return "welcome[티원 화이팅!!!]";
	}

}
