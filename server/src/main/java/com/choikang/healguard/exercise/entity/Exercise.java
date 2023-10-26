package com.choikang.healguard.exercise.entity;

import com.choikang.healguard.common.domain.BaseEntity;
import com.choikang.healguard.exercise.dto.CreateExerciseReqDto;
import com.choikang.healguard.exercise.dto.UpdateExerciseReqDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Exercise extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String muscleGroup; // 운동 부위
    private String category;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status = Status.W;

    public enum Status {
        Y("사용"),
        W("대기"),
        N("미사용"),
        D("삭제");

        private final String description;

        Status(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    public Exercise(CreateExerciseReqDto createExerciseReqDto) {
        this.name = createExerciseReqDto.getName();
        this.muscleGroup = createExerciseReqDto.getMuscleGroup();
        this.category = createExerciseReqDto.getCategory();
        this.description = createExerciseReqDto.getDescription();
    }

    public Exercise(UpdateExerciseReqDto updateExerciseReqDto) {
        this.id = updateExerciseReqDto.getId();
        this.muscleGroup = updateExerciseReqDto.getMuscleGroup();
        this.name = updateExerciseReqDto.getName();
        this.category = updateExerciseReqDto.getCategory();
        this.description = updateExerciseReqDto.getDescription();
    }
}
