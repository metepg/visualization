package com.metepg.visualization.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.metepg.visualization.model.liiga.GameResult;
import com.metepg.visualization.repository.GameResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Slf4j
public class LiigaGameService {

    private final RestClient restClient;
    private final GameResultRepository repository;
    private final ObjectMapper objectMapper;

    public void syncGames() {
        log.info("Starting Liiga game sync...");

        try {
            if (repository.count() > 0) {
                log.info("Table 'liiga.game_results' already contains data. Skipping sync.");
                return;
            }

            List<Map<String, Object>> response = restClient.get()
                .uri("/games?tournament=runkosarja")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});

            if (response != null && !response.isEmpty()) {
                List<GameResult> games = response.stream()
                    .map(map -> objectMapper.convertValue(map, JsonNode.class))
                    .filter(node -> node.has("ended") && node.get("ended").asBoolean())
                    .map(this::mapToEntity)
                    .toList();

                int savedGames = repository.saveAll(games).size();
                log.info("Successfully synced {} games.", savedGames);
            } else {
                log.warn("Liiga API returned an empty list or null.");
            }

        } catch (Exception e) {
            log.error("Failed to sync games from Liiga API", e);
        }
    }

    private GameResult mapToEntity(JsonNode node) {
        return new GameResult(
            null,
            node.get("id").asInt(),
            node.get("season").asInt(),
            node.path("homeTeam").path("teamName").asText("Unknown"),
            node.path("awayTeam").path("teamName").asText("Unknown"),
            node.toString()
        );
    }

    public List<GameResult> getResultsByTeam(String teamName) {
        return repository.findByTeamName(teamName);
    }

}
