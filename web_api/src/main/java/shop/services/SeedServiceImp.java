package shop.services;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shop.constants.Roles;
import shop.entities.RoleEntity;
import shop.entities.UserEntity;
import shop.entities.UserRoleEntity;
import shop.interfaces.SeedService;
import shop.repositories.RoleRepository;
import shop.repositories.UserRepository;
import shop.repositories.UserRoleRepository;

@Service
@AllArgsConstructor
public class SeedServiceImp implements SeedService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void seedRoleData() {
        if (roleRepository.count() == 0) {
            RoleEntity admin = new RoleEntity().builder()
                    .name(Roles.Admin)
                    .build();
            roleRepository.save(admin);

            RoleEntity user = new RoleEntity().builder()
                    .name(Roles.User)
                    .build();
            roleRepository.save(user);
        }
    }

    @Override
    public void seedUserData() {
        if (userRepository.count() == 0) {
            var user = new UserEntity().builder()
                    .email("admin@gmail.com")
                    .firstName("Admin")
                    .lastName("Adminovi4")
                    .phone("098 34 34 221")
                    .password(passwordEncoder.encode("Qwerty-1"))
                    .build();
            userRepository.save(user);
            var role = roleRepository.findByName(Roles.Admin);
            var ur = new UserRoleEntity().builder()
                    .role(role)
                    .user(user)
                    .build();
            userRoleRepository.save(ur);
        }
    }
}