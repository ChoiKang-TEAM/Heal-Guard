package com.choikang.healguard.exercise.dto;

import com.choikang.healguard.common.consts.ResultCode;
import com.choikang.healguard.exercise.entity.Exercise;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExerciseRespDto {
    int code = ResultCode.SUCCESS.value();
    private Exercise result;

    public ExerciseRespDto(Exercise result) {
        this.result = result;
    }
}
