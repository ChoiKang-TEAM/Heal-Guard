package com.choikang.healguard.exercise.controller;

import com.choikang.healguard.exercise.dto.CreateExerciseReqDto;
import com.choikang.healguard.exercise.dto.CreateExerciseRespDto;
import com.choikang.healguard.exercise.entity.Exercise;
import com.choikang.healguard.exercise.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    @PostMapping("/exercise/create")
    public CreateExerciseRespDto postExercise(@RequestBody CreateExerciseReqDto createExerciseReqDto){
        exerciseService.createExercise(new Exercise(createExerciseReqDto));

        return new CreateExerciseRespDto();
    }
}
