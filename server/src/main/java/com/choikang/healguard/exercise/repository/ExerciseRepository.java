package com.choikang.healguard.exercise.repository;

import com.choikang.healguard.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExerciseRepository extends JpaRepository<Exercise,Long> {

    @Modifying
    @Query("UPDATE Exercise e SET e.status = 'D' WHERE e.id = :exerciseId")
    int deleteExerciseStatus(@Param("exerciseId") long exerciseId);

    @Modifying
    @Query("UPDATE Exercise e SET e.status = 'Y' WHERE e.id = :exerciseId")
    int updateExerciseStatus(@Param("exerciseId") long exerciseId);
}
