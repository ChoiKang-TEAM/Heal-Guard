package com.choikang.healguard.exercise.service;

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

    public void updateExerciseStatus(long exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow();
        exercise.setStatus(Exercise.Status.Y);
        exerciseRepository.save(exercise); // 나중에 쿼리로 DB를 두번쓰지 않게 바꿀것
    }
}
