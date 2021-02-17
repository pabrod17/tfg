package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.SeasonTeam;
import es.udc.paproject.backend.model.entities.SeasonTeamDao;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.TeamDao;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Override
    public Team addTeam(Team team) {
        teamDao.save(team);
        return team;
    }

    @Override
    public void addTeamToSeason(Season season, Team team, User user) {

        SeasonTeam seasonTeam = new SeasonTeam(season, team, user);
        seasonTeamDao.save(seasonTeam);
    }

    @Override
    @Transactional(readOnly = true)
    public Team findTeamById(Long teamId) throws InstanceNotFoundException {

        Optional<Team> team = teamDao.findById(teamId);

        if (!team.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", teamId);
        }

        return team.get();
    }

    @Override
    @Transactional(readOnly = true)
    public Team findTeamByName(String teamName) throws InstanceNotFoundException {

        Optional<Team> team = teamDao.findByTeamName(teamName);

        if (!team.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", teamName);
        }

        return team.get();
    }

    @Override
    public List<Team> findAllTeams() {

        Iterable<Team> teams = teamDao.findAll();
        List<Team> teamsList = new ArrayList<>();

        teams.forEach(s -> teamsList.add(s));

        return teamsList;
    }

    @Override
    public List<Season> findSeasonsToTeam(Long teamId) throws InstanceNotFoundException {
        List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsByTeamId(teamId);
        List<Season> seasons = new ArrayList<>();

        if (seasonTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        for(int i = 0; i < seasonTeams.size(); i++){
            seasons.add(seasonTeams.get(i).getSeason());
        }


        return seasons;
    }

    @Override
    public void removeTeam(Long teamId) throws InstanceNotFoundException {

        Optional<Team> existingTeam = teamDao.findById(teamId);

        if (!existingTeam.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", teamId);
        }

        teamDao.delete(existingTeam.get());
    }

    @Override
    public Team updateTeam(Team team) throws InstanceNotFoundException {

        Optional<Team> existingTeam = teamDao.findById(team.getId());

        if (!existingTeam.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", team.getId());
        }

        existingTeam.get().setTeamName(team.getTeamName());
        teamDao.save(existingTeam.get());

        return existingTeam.get();
    }
}