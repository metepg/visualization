package com.metepg.visualization.controller;

import com.metepg.visualization.model.liiga.GameResult;
import com.metepg.visualization.service.LiigaGameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameResultController {

    private final LiigaGameService liigaGameService;

    @GetMapping("/{team}")
    public List<GameResult> getGameResultsByTeam(@PathVariable String team) {
        return liigaGameService.getResultsByTeam(team);
    }
}
