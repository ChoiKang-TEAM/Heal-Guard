package com.choikang.healguard.user.dto;

import com.choikang.healguard.common.consts.ResultCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRespDto {
    private int code = ResultCode.SUCCESS.value();
}
