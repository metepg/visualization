package com.metepg.visualization.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

@Getter
@ToString
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Table("authorities")
public class Authority {

    @Id
    private Long id;

    @Column("username")
    private String username;

    @Column("authority")
    private String authority;

    public Authority(String username, String authority) {
        this.username = username;
        this.authority = authority;
    }
}
