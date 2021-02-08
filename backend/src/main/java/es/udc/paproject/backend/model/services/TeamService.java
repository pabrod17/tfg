package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.Team;

public interface TeamService {

    Team findTeamById(Long teamId);

    Team findTeamByName(String teamName);
    
    Team removeTeam(Long teamId);

    //Añadir mas cosas luego
    Team updateTeam(Long teamId, String name);
    
}