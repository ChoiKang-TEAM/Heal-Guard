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
    private DataResult result;

    @Getter
    public static class DataResult {
        private final List<Exercise> exercises;
        private final PageInfo pageInfo;

        public DataResult(List<Exercise> exercises, Page page) {
            this.exercises = exercises;
            this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
        }
    }

    public ExerciseListRespDto(List<Exercise> exercises, Page<Exercise> page) {
        this.result = new DataResult(exercises, page);
    }
}
