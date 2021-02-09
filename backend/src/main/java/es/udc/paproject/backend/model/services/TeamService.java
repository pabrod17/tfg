package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.TeamWithSeasonException;

public interface TeamService {

    void addTeam(String teamName);

    void addTeamToSeason(Season season, Team team, User user);

    Team findTeamById(Long teamId) throws InstanceNotFoundException;

    Team findTeamByName(String teamName) throws InstanceNotFoundException;

    List<Team> findAllTeams();
    
    void removeTeam(Long teamId) throws InstanceNotFoundException, TeamWithSeasonException;

    Team updateTeam(Long teamId, String name) throws InstanceNotFoundException;
}