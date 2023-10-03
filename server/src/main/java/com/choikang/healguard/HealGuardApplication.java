package com.choikang.healguard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HealGuardApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealGuardApplication.class, args);
	}
}
