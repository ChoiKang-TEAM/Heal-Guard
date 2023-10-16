package com.choikang.healguard.exercise.service;

import com.choikang.healguard.exercise.entity.Exercise;
import com.choikang.healguard.exercise.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class UserExerciseService {
    private final ExerciseRepository exerciseRepository;

    public void createExercise(Exercise exercise) {
        exerciseRepository.save(exercise);
    }

    public Page<Exercise> findExercises(int page,int size) {
        return exerciseRepository.findAll(PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "id")));
    }

    public Exercise findExercise(long exerciseId) {
        return exerciseRepository.findById(exerciseId).orElseThrow();
    }
}
