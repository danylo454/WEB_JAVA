package shop.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shop.configuration.security.GoogleTokenVerifier;
import shop.dto.ServiceResponseDto;
import shop.dto.account.GoogleAuthDto;
import shop.dto.account.LoginDto;
import shop.dto.account.AuthResponseDto;
import shop.dto.account.RegisterDto;
import shop.services.AccountService;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;
    private final GoogleTokenVerifier googleTokenVerifier;
    @PostMapping("/register")
    public ServiceResponseDto register(
            @RequestBody RegisterDto request
    ) {
        return service.register(request);

    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> authenticate(@RequestBody LoginDto request) {
        var auth = service.login(request);
        if(auth==null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(auth);
    }
    @PostMapping("/google-auth")
    public ResponseEntity<AuthResponseDto> googleLogin(@RequestBody GoogleAuthDto googleAuth)  {
        try {
            var result = googleTokenVerifier.verify(googleAuth.getToken());

            AuthResponseDto response = new AuthResponseDto().builder()
                    .token(result.getEmail())
                    .build();
            return ResponseEntity.ok(response);

        }
        catch(Exception ex) {

        }
        AuthResponseDto result = new AuthResponseDto().builder()
                .token("")
                .build();
        return ResponseEntity.ok(result);
    }
}