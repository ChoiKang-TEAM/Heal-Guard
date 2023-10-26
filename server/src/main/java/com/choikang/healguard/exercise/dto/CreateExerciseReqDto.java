package com.choikang.healguard.exercise.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateExerciseReqDto {
    private String name;
    private String muscleGroup;
    private String category;
    private String description;
}
