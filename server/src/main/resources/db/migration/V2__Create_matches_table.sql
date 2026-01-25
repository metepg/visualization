CREATE SCHEMA IF NOT EXISTS liiga;

CREATE CAST (VARCHAR AS JSONB) WITH INOUT AS IMPLICIT;

CREATE TABLE liiga.game_results
(
    id        SERIAL PRIMARY KEY,
    api_id    INTEGER UNIQUE,
    home_team TEXT    NOT NULL,
    away_team TEXT    NOT NULL,
    season    INTEGER NOT NULL,
    raw_json  JSONB    NOT NULL,

    CONSTRAINT unique_api_id_per_season UNIQUE (api_id, season)
);
CREATE INDEX idx_game_results_teams ON liiga.game_results (home_team, away_team);
