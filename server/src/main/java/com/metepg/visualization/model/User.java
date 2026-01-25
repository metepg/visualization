package com.metepg.visualization.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.util.HashSet;
import java.util.Set;

@Getter
@ToString
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Table("users")
public class User {

    @Id
    private String username;

    private String password;

    private boolean enabled;

    @MappedCollection(idColumn = "username")
    private final Set<Authority> authorities = new HashSet<>();

    public User(String username, String password, boolean enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

    public void addAuthority(String authority) {
        this.authorities.add(new Authority(this.username, authority));
    }
}
