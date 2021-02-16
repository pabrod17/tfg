package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Team;

public class TeamConversor {

    public TeamConversor() {
    }
    
    public final static TeamDto toTeamDto(Team team){
        return new TeamDto(team.getId(), team.getTeamName());
    }
}