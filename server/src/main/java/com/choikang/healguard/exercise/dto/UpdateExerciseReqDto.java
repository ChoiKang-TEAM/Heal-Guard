package com.choikang.healguard.exercise.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateExerciseReqDto {
    private Long id;
    private String name;
    private String category;
    private String description;
}
