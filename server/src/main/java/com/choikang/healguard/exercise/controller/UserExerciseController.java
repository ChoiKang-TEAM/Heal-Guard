package com.choikang.healguard.exercise.controller;

import com.choikang.healguard.exercise.dto.CreateExerciseReqDto;
import com.choikang.healguard.exercise.dto.ExerciseListRespDto;
import com.choikang.healguard.exercise.dto.ExerciseRespDto;
import com.choikang.healguard.exercise.dto.UpdateExerciseReqDto;
import com.choikang.healguard.exercise.entity.Exercise;
import com.choikang.healguard.exercise.service.UserExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserExerciseController {
    private final UserExerciseService exerciseService;

    @PostMapping("/exercises/create")
    public ExerciseRespDto postExercise(@RequestBody CreateExerciseReqDto createExerciseReqDto){
        exerciseService.createExercise(new Exercise(createExerciseReqDto));

        return new ExerciseRespDto();
    }

    @GetMapping("/exercises")
    public ExerciseListRespDto getExercises(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int size){
        Page<Exercise> exercisePage = exerciseService.findExercises(page, size);
        List<Exercise> exercises = exercisePage.getContent();

        return new ExerciseListRespDto(exercises,exercisePage);
    }

    @GetMapping("/exercises/{exercisesId}")
    public ExerciseRespDto getExercise(@PathVariable long exercisesId) {
        return new ExerciseRespDto(exerciseService.findExercise(exercisesId));
    }
}
