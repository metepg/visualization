package com.metepg.visualization.model.liiga;

import com.fasterxml.jackson.annotation.JsonRawValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(schema = "liiga", value = "game_results")
public record GameResult(
    @Id Long id,
    Integer api_id,
    Integer season,
    String homeTeam,
    String awayTeam,

    @JsonRawValue
    String rawJson
) {}
