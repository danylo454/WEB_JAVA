package shop.services;

import org.springframework.web.client.RestOperations;
import shop.configuration.captcha.CaptchaSettings;
import shop.configuration.captcha.GoogleResponse;
import shop.dto.ServiceResponseDto;
import shop.dto.account.LoginDto;
import shop.dto.account.AuthResponseDto;
import shop.dto.account.RegisterDto;
import shop.configuration.security.JwtService;
import shop.constants.Roles;
import shop.entities.UserEntity;
import shop.entities.UserRoleEntity;
import shop.repositories.RoleRepository;
import shop.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shop.repositories.UserRoleRepository;
import shop.storage.StorageService;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final StorageService storageService;
    private final CaptchaSettings captchaSettings;
    private final RestOperations restTemplate;
    protected static final String RECAPTCHA_URL_TEMPLATE = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";


    public ServiceResponseDto register(RegisterDto request) {
        String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), request.getReCaptchaToken());
        final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
        if (!googleResponse.isSuccess()) {   //перевіряємо чи запит успішний
            return new ServiceResponseDto("reCaptcha was not successfully validated");
        }
        var temp = repository.findByEmail(request.getEmail());
        if (temp.isPresent()) {
            return new ServiceResponseDto("Bad reques user already exist");
        }
        String userImage = "";
        if (request.getImage() != null) {
            var fileName = storageService.saveMultipartFile(request.getImage());
            userImage = fileName;
        }
        var user = UserEntity.builder()
                .firstName(request.getName())
                .lastName(request.getSurname())
                .email(request.getEmail())
                .phone(request.getPhone())
                .email(request.getEmail())
                .image(userImage)
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        repository.save(user);

        var role = roleRepository.findByName(Roles.User);

        var ur = new UserRoleEntity().builder()
                .user(user)
                .role(role)
                .build();
        userRoleRepository.save(ur);

        var jwtToken = jwtService.generateAccessToken(user);
        return new ServiceResponseDto("Successful create user", jwtToken);


    }

    public AuthResponseDto login(LoginDto request) {

        String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), request.getReCaptchaToken());
        final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
        if (!googleResponse.isSuccess()) {   //перевіряємо чи запит успішний
            //throw new Exception("reCaptcha was not successfully validated");
            return null;
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDto.builder()
                .token(jwtToken)
                .build();
    }

}
