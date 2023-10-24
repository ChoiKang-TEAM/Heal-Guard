package com.choikang.healguard.user.controller;

import com.choikang.healguard.user.dto.CreateUserReqDto;
import com.choikang.healguard.user.dto.UserRespDto;
import com.choikang.healguard.user.entity.User;
import com.choikang.healguard.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/users/create")
    public UserRespDto createUser(@RequestBody CreateUserReqDto request) {
        userService.createUser(new User(request));
        return new UserRespDto();
    }
}
