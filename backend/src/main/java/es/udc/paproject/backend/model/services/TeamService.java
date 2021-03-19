package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface TeamService {
    //done
    Team addTeam(Long userId, Team team) throws InstanceNotFoundException;
    //done
    void addTeamToSeason(Long seasonId, Team team, Long userId) throws InstanceNotFoundException;
    //done
    Team findTeamById(Long userId,Long teamId) throws InstanceNotFoundException;
    //done
    Team findTeamByName(Long userId, String teamName) throws InstanceNotFoundException;
    //done
    List<Team> findAllTeams(Long userId) throws InstanceNotFoundException;
    
    List<Season> findSeasonsToTeam(Long userId, Long teamId) throws InstanceNotFoundException;
    //done
    void removeTeam(Long userId, Long teamId) throws InstanceNotFoundException;
    //done
    Team updateTeam(Long userId, Team team) throws InstanceNotFoundException;
}