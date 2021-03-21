package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;

public interface SeasonService {

    Season addSeason(Long userId, Season season) throws InstanceNotFoundException, StartDateAfterEndDateException;

    Season findSeasonById(Long userId, Long seasonId) throws InstanceNotFoundException;

    List<Season> findSeasonsBetweenTwoDates(Long userId, LocalDateTime startDate, LocalDateTime endDate) throws InstanceNotFoundException, StartDateAfterEndDateException;

    List<Season> findAllSeasons(Long userId) throws InstanceNotFoundException;
    
    List<Team> findTeamsToSeason(Long userId, Long seasonId) throws InstanceNotFoundException;

    void removeSeason(Long userId, Long seasonId) throws InstanceNotFoundException;

    Season updateSeason(Long userId, Season seaon) throws InstanceNotFoundException;
}