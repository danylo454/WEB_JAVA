package shop.dto.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    private String name;
    private String surname;
    private String email;
    private String password;
    private MultipartFile image;
    private String phone;
    private String confirmPassword;
    private String reCaptchaToken;
}