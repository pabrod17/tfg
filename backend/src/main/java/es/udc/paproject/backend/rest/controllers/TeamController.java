package es.udc.paproject.backend.rest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDtos;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDto;
import es.udc.paproject.backend.rest.dtos.TeamDto;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.TeamService;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("/all")
    public List<TeamDto> findAllTeams() {
        return toTeamDtos(teamService.findAllTeams());
    }

    @GetMapping("/{id}")
    public TeamDto findTeamById(@PathVariable Long id) throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamById(id));
    }

    @GetMapping("/{name}")
    public TeamDto findTeamByName(@PathVariable String name) throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamByName(name));
    }

    @PostMapping("/add/{name}")
    public TeamDto addTeam(@RequestBody String name){
        return toTeamDto(teamService.addTeam(new Team(name)));
    }
}