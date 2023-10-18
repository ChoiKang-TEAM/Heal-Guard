package com.choikang.healguard.exercise.controller;

import com.choikang.healguard.exercise.dto.ExerciseRespDto;
import com.choikang.healguard.exercise.dto.UpdateExerciseReqDto;
import com.choikang.healguard.exercise.entity.Exercise;
import com.choikang.healguard.exercise.service.AdminExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminExerciseController {
    private final AdminExerciseService exerciseService;

    @DeleteMapping("/exercises/{exerciseId}")
    public ExerciseRespDto deleteExercise(@PathVariable long exerciseId) {
        exerciseService.deleteExercise(exerciseId);
        return new ExerciseRespDto();
    }

    @PatchMapping("/exercises/{exerciseId}")
    public ExerciseRespDto patchExercise(@PathVariable long exerciseId,
                                         @RequestBody UpdateExerciseReqDto updateExerciseReqDto) {
        updateExerciseReqDto.setId(exerciseId);
        Exercise exercise = exerciseService.updateExercise(new Exercise(updateExerciseReqDto));

        return new ExerciseRespDto(exercise);
    }

    @PatchMapping("/exercises/{exerciseId}/status")
    public ExerciseRespDto changeExerciseStatus(@PathVariable long exerciseId) {
        exerciseService.updateExerciseStatus(exerciseId);

        return new ExerciseRespDto();
    }
}
