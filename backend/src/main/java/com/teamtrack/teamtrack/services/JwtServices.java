package com.teamtrack.teamtrack.services;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;
import java.util.Map;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.teamtrack.teamtrack.entities.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtServices {

    private final String SECRET_KEY = "a25bd7b4c84a5c2fd45b90bad9601a60637563d3321c1190f33625a37895862d";

    public String extractEmail(String token) {
        return extractClaim(token, claims -> claims.get("email", String.class));
    }

    public String extractPhoneNumber(String token) {
        return extractClaim(token, claims -> claims.get("phoneNumber", String.class));
    }

    public String extractUserId(HttpServletRequest request) {

            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                return extractClaim(token, claims -> claims.get("UserId", String.class));
            }
            return null;




    }

    public boolean isValid(String token, UserDetails user) {
        String username = extractEmail(token);

        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parser().verifyWith(getSignKey()).build().parseSignedClaims(token).getPayload();

    }

    public String generateToken(UserEntity userEntity) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("UserId", userEntity.getUserId());
        claims.put("email", userEntity.getEmail());
        claims.put("phoneNumber", userEntity.getPhoneNumber());

        String token = Jwts.builder()
                // .subject(userEntity.getUserId())
                .claims(claims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(getSignKey())
                .compact();
        return token;

    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
