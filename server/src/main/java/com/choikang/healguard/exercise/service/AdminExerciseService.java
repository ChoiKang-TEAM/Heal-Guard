package com.choikang.healguard.exercise.service;

import com.choikang.healguard.exercise.entity.Exercise;
import com.choikang.healguard.exercise.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminExerciseService {

    private ExerciseRepository exerciseRepository;

    public void deleteExercise(long exerciseId) {
        exerciseRepository.deleteById(exerciseId);
    }

    public Exercise updateExercise(Exercise exercise) {
        Optional<Exercise> optionalExercise = exerciseRepository.findById(exercise.getId());
        Exercise findExercise = optionalExercise.orElseThrow();

        Optional.ofNullable(exercise.getName()).ifPresent(findExercise::setName);
        Optional.ofNullable(exercise.getCategory()).ifPresent(findExercise::setCategory);
        Optional.ofNullable(exercise.getDescription()).ifPresent(findExercise::setDescription);

        return exerciseRepository.save(findExercise);
    }
}
