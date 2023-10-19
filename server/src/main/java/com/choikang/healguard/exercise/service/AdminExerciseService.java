package com.choikang.healguard.exercise.service;

import com.choikang.healguard.exception.BusinessLogicException;
import com.choikang.healguard.exception.ExceptionCode;
import com.choikang.healguard.exercise.entity.Exercise;
import com.choikang.healguard.exercise.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class AdminExerciseService {

    private final ExerciseRepository exerciseRepository;

    public void deleteExercise(long exerciseId) {
        int affectedRows = exerciseRepository.deleteExerciseStatus(exerciseId);
        if (affectedRows == 0) {
            throw new BusinessLogicException(ExceptionCode.EXERCISE_NOT_UPDATE);
        }
    }

    public Exercise updateExercise(Exercise exercise) {
        Optional<Exercise> optionalExercise = exerciseRepository.findById(exercise.getId());
        Exercise findExercise = optionalExercise.orElseThrow(() -> new BusinessLogicException(ExceptionCode.EXERCISE_NOT_FOUND));

        Optional.ofNullable(exercise.getName()).ifPresent(findExercise::setName);
        Optional.ofNullable(exercise.getCategory()).ifPresent(findExercise::setCategory);
        Optional.ofNullable(exercise.getDescription()).ifPresent(findExercise::setDescription);

        return exerciseRepository.save(findExercise);
    }

    public void updateExerciseStatus(long exerciseId) {
        int affectedRows = exerciseRepository.updateExerciseStatus(exerciseId);
        if (affectedRows == 0) {
            throw new BusinessLogicException(ExceptionCode.EXERCISE_NOT_UPDATE);
        }
    }
}
