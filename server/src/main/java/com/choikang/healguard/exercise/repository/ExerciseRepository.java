package com.choikang.healguard.exercise.repository;

import com.choikang.healguard.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise,Long> {
}
