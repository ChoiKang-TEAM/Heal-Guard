package com.choikang.healguard.user.service;

import com.choikang.healguard.user.entity.User;
import com.choikang.healguard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void createUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user) {
        String seq = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString(); // 예외처리 필요
        Optional<User> optionalUser = userRepository.findById(seq);
        User findUser = optionalUser.orElseThrow();

        Optional.ofNullable(user.getName()).ifPresent(findUser::setName);
        Optional.ofNullable(user.getGender()).ifPresent(findUser::setGender);
        Optional.ofNullable(user.getAge()).ifPresent(findUser::setAge);
        Optional.ofNullable(user.getNickname()).ifPresent(findUser::setNickname);
        Optional.of(user.getBmi()).ifPresent(findUser::setBmi);

        userRepository.save(findUser);
    }
}
