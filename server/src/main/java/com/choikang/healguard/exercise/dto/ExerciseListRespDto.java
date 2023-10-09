package com.choikang.healguard.exercise.dto;

import com.choikang.healguard.common.consts.ResultCode;
import com.choikang.healguard.dto.PageInfo;
import com.choikang.healguard.exercise.entity.Exercise;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExerciseListRespDto {
    int code = ResultCode.SUCCESS.value();
    private List<Exercise> result;
    private PageInfo pageInfo;

    public ExerciseListRespDto(List<Exercise> result, Page page) {
        this.result = result;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
