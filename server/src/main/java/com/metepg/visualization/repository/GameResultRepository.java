package com.metepg.visualization.repository;

import com.metepg.visualization.model.liiga.GameResult;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameResultRepository extends ListCrudRepository<GameResult, Long> {

    @Query("""
        SELECT id, api_id, season, home_team, away_team, raw_json::text
        FROM liiga.game_results
        WHERE home_team = :teamName OR away_team = :teamName
        ORDER BY id DESC
    """)
    List<GameResult> findByTeamName(@Param("teamName") String teamName);
}
