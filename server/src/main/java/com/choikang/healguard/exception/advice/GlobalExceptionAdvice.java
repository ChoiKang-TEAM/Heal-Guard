package com.choikang.healguard.exception.advice;

import com.choikang.healguard.exception.BusinessLogicException;
import com.choikang.healguard.exception.response.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ErrorResponse handleBusinessLogicException(BusinessLogicException e) {
        return new ErrorResponse(-1,e.getMessage());
    }

}
