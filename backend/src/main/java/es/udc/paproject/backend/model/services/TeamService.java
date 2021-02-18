package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface TeamService {

    Team addTeam(Team team);

    void addTeamToSeason(Long seasonId, Team team, Long userId) throws InstanceNotFoundException;

    Team findTeamById(Long teamId) throws InstanceNotFoundException;

    Team findTeamByName(String teamName) throws InstanceNotFoundException;

    List<Team> findAllTeams();
    
    List<Season> findSeasonsToTeam(Long teamId) throws InstanceNotFoundException;
    
    void removeTeam(Long teamId) throws InstanceNotFoundException;

    Team updateTeam(Team team) throws InstanceNotFoundException;
}