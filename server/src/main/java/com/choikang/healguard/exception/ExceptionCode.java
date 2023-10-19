package com.choikang.healguard.exception;

import lombok.Getter;

public enum ExceptionCode {
    EXERCISE_NOT_FOUND("EXERCISE NOT FOUND"),

    EXERCISE_NOT_UPDATE("EXERCISE NOT UPDATE");

    @Getter
    private String message;

    ExceptionCode(String message) {
        this.message = message;
    }
}
