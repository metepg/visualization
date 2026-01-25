package com.metepg.visualization.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.metepg.visualization.model.liiga.GameResult;
import com.metepg.visualization.repository.GameResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@Service
@Slf4j
public class LiigaGameService {

    private final RestClient restClient;
    private final GameResultRepository repository;
    private final ObjectMapper objectMapper;

    @Scheduled(cron = "0 0 2 * * *", zone = "Europe/Helsinki")
    public void syncGames() {
        log.info("Fetching new games from Liiga API...");

        try {
            List<Map<String, Object>> response = restClient.get()
                .uri("/games?tournament=runkosarja")
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});

            if (response != null && !response.isEmpty()) {
                Set<Integer> existingApiIds = repository.findAllApiIds();
                log.info("Database has {} games saved already", existingApiIds.size());

                List<GameResult> newGames = response.stream()
                    .map(map -> objectMapper.convertValue(map, JsonNode.class))
                    .filter(node -> node.has("ended") && node.get("ended").asBoolean())
                    .map(this::mapToEntity)
                    .filter(game -> !existingApiIds.contains(game.api_id()))
                    .toList();

                int savedGames = repository.saveAll(newGames).size();
                log.info("Successfully saved {} new games.", savedGames);
            } else {
                log.warn("Liiga API returned an empty list or null.");
            }

        } catch (Exception e) {
            log.error("Failed to fetch games from Liiga API", e);
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
