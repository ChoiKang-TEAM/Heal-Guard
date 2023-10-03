package com.choikang.healguard.user.controller;

import com.choikang.healguard.user.dto.CreateUserReqDto;
import com.choikang.healguard.user.dto.CreateUserRespDto;
import com.choikang.healguard.user.entity.User;
import com.choikang.healguard.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/user/create")
    public CreateUserRespDto createUser(@RequestBody CreateUserReqDto request) {
        userService.createUser(new User(request));
        return new CreateUserRespDto();
    }
}
