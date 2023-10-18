package com.choikang.healguard.exception;

import lombok.Getter;

public enum ExceptionCode {
    EXERCISE_NOT_FOUND("EXERCISE NOT FOUND");

    @Getter
    private String message;

    ExceptionCode(String message) {
        this.message = message;
    }
}
