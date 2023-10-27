package com.choikang.healguard.user.dto;

import com.choikang.healguard.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserReqDto {
    private String name;

    private User.Gender gender;

    private String age;

    private String nickname;

    private double height;

    private double weight;
}
