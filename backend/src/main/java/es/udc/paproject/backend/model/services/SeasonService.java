package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface SeasonService {
    //done
    Season addSeason(Long userId, Season season) throws InstanceNotFoundException;
    //done
    Season findSeasonById(Long userId, Long seasonId) throws InstanceNotFoundException;
    //done
    List<Season> findSeasonsBetweenTwoDates(Long userId, LocalDateTime startDate, LocalDateTime endDate) throws InstanceNotFoundException;
    //done
    List<Season> findAllSeasons(Long userId) throws InstanceNotFoundException;
    
    List<Team> findTeamsToSeason(Long userId, Long seasonId) throws InstanceNotFoundException;
    //done
    void removeSeason(Long userId, Long seasonId) throws InstanceNotFoundException;
    //done
    Season updateSeason(Long userId, Season seaon) throws InstanceNotFoundException;
}