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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDtos;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamDto;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeam;
import static es.udc.paproject.backend.rest.dtos.TeamConversor.toTeamUpdate;

import es.udc.paproject.backend.rest.dtos.TeamDto;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.TeamService;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("")
    public List<TeamDto> findAllTeams(@RequestAttribute Long userId) throws InstanceNotFoundException {
        return toTeamDtos(teamService.findAllTeams(userId));
    }

    @GetMapping("/toSeason/{seasonId}")
    public List<TeamDto> findTeamsToSeason(@RequestAttribute Long userId, @PathVariable Long seasonId) throws InstanceNotFoundException {
        return toTeamDtos(teamService.findTeamsToSeason(userId, seasonId));
    }

    @GetMapping("/name/{name}")
    public TeamDto findTeamByName(@RequestAttribute Long userId, @PathVariable String name)
            throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamByName(userId, name));
    }

    @GetMapping("/team/{id}")
    public TeamDto findTeamById(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException {
        return toTeamDto(teamService.findTeamById(userId, id));
    }

    @PostMapping("/addTeam/")
    public TeamDto addTeam(@RequestAttribute Long userId, @RequestBody TeamDto teamDto)
            throws InstanceNotFoundException, DuplicateInstanceException {
        Team team = toTeam(teamDto);
        return toTeamDto(teamService.addTeam(userId, team));
    }

    @PutMapping("/update/{id}")
    public TeamDto updateTeam(@RequestAttribute Long userId, @PathVariable Long id, @RequestBody TeamDto teamDto) throws InstanceNotFoundException {
        Team team = toTeamUpdate(teamDto);
        return toTeamDto(teamService.updateTeam(userId, team));
    }

    @DeleteMapping("/remove/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTeam(@RequestAttribute Long userId, @PathVariable Long id) throws InstanceNotFoundException {
        teamService.removeTeam(userId, id);
    }

    @PostMapping("/addTeamtoSeason/{seasonId}")
    public void addTeamToSeason(@RequestAttribute Long userId, @PathVariable Long seasonId, @RequestParam Long teamId) throws InstanceNotFoundException {
        teamService.addTeamToSeason(seasonId, teamId, userId);
    }
}