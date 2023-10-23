package com.choikang.healguard.user.entity;

import com.choikang.healguard.common.domain.BaseEntity;
import com.choikang.healguard.user.dto.CreateUserReqDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
    @Id
    private String user_seq;
    private String name;
    private Gender gender;
    private String age;
    private String nickname;
    private double bmi;

    public enum Gender {
        MALE("남자"),
        FEMALE("여자"),
        OTHER("그외");

        private final String description;

        Gender(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    public User(CreateUserReqDto createUserReqDto) {
        this.user_seq = createUserReqDto.getUser_seq();
        this.name = createUserReqDto.getName();
        this.gender = createUserReqDto.getGender();
        this.age = createUserReqDto.getAge();
        this.nickname = createUserReqDto.getNickname();
        this.bmi = createUserReqDto.getWeight() / Math.pow(createUserReqDto.getHeight() / 100 , 2);
    }
}
