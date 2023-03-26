package shop.configuration.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import shop.entities.UserEntity;
import shop.repositories.UserRepository;
import shop.repositories.UserRoleRepository;

import java.util.Collection;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository repository;
    private final UserRoleRepository userRoleRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                var userEntity = repository.findByEmail(username).orElseThrow(()
                        -> new UsernameNotFoundException("User not found"));
                var roles = userRoleRepository.findByUser(userEntity);
                userEntity.setUserRoles(roles);

                return new User(userEntity.getEmail(), userEntity.getPassword(), getAuthorities(userEntity)); // якщо є, то створюється новий юзер на основі того, що в БД
            }
            private Collection<? extends GrantedAuthority> getAuthorities(UserEntity userEntity) {
                String [] userRoles = userEntity.getUserRoles().stream()                                      //витягується списочок ролей, які є у юзера
                        .map((role) -> role.getRole().getName()).toArray(String []:: new);
                Collection<GrantedAuthority> authorityCollections =                               //створюється нова колекція authorityCollections
                        AuthorityUtils.createAuthorityList(userRoles);
                return authorityCollections;
            }
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}