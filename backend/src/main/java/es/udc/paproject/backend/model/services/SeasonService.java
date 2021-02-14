package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.List;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface SeasonService {
    
    void addSeason(Season season);

    void addTeamToSeason(Season season, Team team, User user);

    Season findSeasonById(Long seasonId) throws InstanceNotFoundException;

    List<Season> findSeasonsBetweenTwoDates(LocalDateTime startDate, LocalDateTime endDate) throws InstanceNotFoundException;

    List<Season> findAllSeasons();

    List<Team> findTeamsToSeason(Long seasonId) throws InstanceNotFoundException;

    void removeSeason(Long seasonId) throws InstanceNotFoundException;

    Season updateSeason(Long seasonId, LocalDateTime startDate, LocalDateTime endDate) throws InstanceNotFoundException;
}