package com.teamtrack.teamtrack.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.teamtrack.teamtrack.services.JwtServices;
import com.teamtrack.teamtrack.services.UserServices;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtServices jwtServices;

    @Autowired
    private UserServices userServices;

    @Override
    protected void doFilterInternal(
            @SuppressWarnings("null") @NonNull HttpServletRequest request,
            @SuppressWarnings("null") @NonNull HttpServletResponse response,
            @SuppressWarnings("null") @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        String username = jwtServices.extractEmail(token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userdetails = userServices.loadUserByUsername(username);

            if (jwtServices.isValid(token, userdetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userdetails,
                        null, userdetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        }

        filterChain.doFilter(request, response);

    }

}
