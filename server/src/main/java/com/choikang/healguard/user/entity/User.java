package com.choikang.healguard.user.entity;

import com.choikang.healguard.common.domain.BaseEntity;
import com.choikang.healguard.user.dto.CreateUserReqDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
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

    public User(CreateUserReqDto request) {
        this.user_seq = request.getUser_seq();
    }
}
