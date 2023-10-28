package com.choikang.healguard.user.dto;

import com.choikang.healguard.common.consts.ResultCode;
import com.choikang.healguard.user.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRespDto {
    private int code = ResultCode.SUCCESS.value();

    private User result;

    public UserRespDto(User result) {
        this.result = result;
    }
}
