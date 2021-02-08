package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Season;

public interface SeasonService {
    
    Season findSeasonById(Long seasonId);

    List<Season> findSeasons(LocalDateTime startDate, LocalDateTime endDate);

    Season removeSeason(Long seasonId);

    Season updateSeason(Long seasonId, LocalDateTime startDate, LocalDateTime endDate);
}