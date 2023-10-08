package com.choikang.healguard.exercise.dto;

import com.choikang.healguard.common.consts.ResultCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateExerciseRespDto {
    int code = ResultCode.SUCCESS.value();
}
