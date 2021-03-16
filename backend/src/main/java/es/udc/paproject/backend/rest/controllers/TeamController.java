package es.udc.paproject.backend.rest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDtos;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDto;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeam;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamUpdate;

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

    @GetMapping("/find/{id}")
    public TeamDto findTeamById(@PathVariable Long id) throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamById(id));
    }

    @GetMapping("/{name}")
    public TeamDto findTeamByName(@PathVariable String name) throws InstanceNotFoundException {
        System.out.println("HOLAAA -> " + name);
        return toTeamDto(teamService.findTeamByName(name));
    }

//http://localhost:8080/teams/findByName/:name?name=PRIMERO
/**    @GetMapping("/findByName/{name}")
    public TeamDto findTeamByName(@RequestParam String name) throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamByName(name));
    }/ */

    @PostMapping("/new/")
    public TeamDto addTeam(@RequestBody  TeamDto teamDto){
        Team team = toTeam(teamDto);
        return toTeamDto(teamService.addTeam(team));
    }

    @PutMapping("/update/{id}")
    public TeamDto updateTeam(@PathVariable Long id, @RequestBody TeamDto teamDto) throws InstanceNotFoundException {
        Team team = toTeamUpdate(teamDto);
        return toTeamDto(teamService.updateTeam(team));
    }

    @DeleteMapping("/remove/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTeam(@PathVariable Long id) throws InstanceNotFoundException {
        teamService.removeTeam(id);
    }

    @PostMapping("/toseason/{id}")
    public void addTeamToSeason(@PathVariable Long id, @RequestBody TeamDto teamDto, @RequestAttribute Long userId) throws InstanceNotFoundException {
        Team team = toTeam(teamDto);
        teamService.addTeamToSeason(id, team, userId);
    }
}