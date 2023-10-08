package com.choikang.healguard.exercise.entity;

import com.choikang.healguard.common.domain.BaseEntity;
import com.choikang.healguard.exercise.dto.CreateExerciseReqDto;
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
        this.category = createExerciseReqDto.getCategory();
        this.description = createExerciseReqDto.getDescription();
    }
}
