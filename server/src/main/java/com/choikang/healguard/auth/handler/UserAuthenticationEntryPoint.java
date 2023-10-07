package com.choikang.healguard.auth.handler;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        String jsonResponse;

        if (exception instanceof ExpiredJwtException) {
            jsonResponse = "{\"code\": 9000}";
        } else if (exception instanceof SignatureException) {
            jsonResponse = "{\"code\": 9002}";
        } else {
            jsonResponse = "{\"code\": 9003}";
        }

        byte[] responseBytes = jsonResponse.getBytes(StandardCharsets.UTF_8);
        response.getOutputStream().write(responseBytes);
    }
}
