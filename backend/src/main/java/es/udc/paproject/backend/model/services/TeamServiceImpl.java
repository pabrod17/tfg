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
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private UserService userService;

    @Override
    public Team addTeam(Long userId, Team team) throws InstanceNotFoundException, DuplicateInstanceException {
        
        if(teamDao.existsByTeamName(team.getTeamName())){
            throw new DuplicateInstanceException("project.entities.team", team.getTeamName());
        }

        User user = userService.loginFromId(userId);
        teamDao.save(team);
        SeasonTeam seasonTeam = new SeasonTeam(null, team, user);
        seasonTeamDao.save(seasonTeam);

        return team;
    }

    @Override
    public void addTeamToSeason(Long seasonId, Team team, Long userId) throws InstanceNotFoundException {
        
        User user = userService.loginFromId(userId);
        Season season = seasonService.findSeasonById(userId, seasonId);
        SeasonTeam seasonTeam = new SeasonTeam(season, team, user);

        seasonTeamDao.save(seasonTeam);
    }

    @Override
    @Transactional(readOnly = true)
    public Team findTeamById(Long userId, Long teamId) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());


        Team team = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getId() == teamId){
                team = seasonTeam.getTeam();
            }
        }
        if (team == null) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        return team;
    }

    @Override
    @Transactional(readOnly = true)
    public Team findTeamByName(Long userId, String teamName) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Team team = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getTeamName().equals(teamName)){
                team = seasonTeam.getTeam();
            }
        }
        if (team == null) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        return team;
    }

    @Override
    public List<Team> findAllTeams(Long userId) throws InstanceNotFoundException {
        
        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Team> teams = new ArrayList<>();
        
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null){
                teams.add(seasonTeam.getTeam());
            }
        }

        if (teams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        return teams;
    }

    @Override
    public List<Season> findSeasonsToTeam(Long userId, Long teamId) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Season> seasons = new ArrayList<>();

        if (seasonTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.seasonTeam");
        }
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getSeason() != null && seasonTeam.getTeam().getId() == teamId){
                seasons.add(seasonTeam.getSeason());
            }
        }
        if (seasons.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        return seasons;
    }

    @Override
    public void removeTeam(Long userId, Long teamId) throws InstanceNotFoundException {
        
        Optional<Team> existingTeam = teamDao.findById(teamId);
        if (!existingTeam.isPresent()) {
            throw new InstanceNotFoundException("project.entities.season", teamId);
        }

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Long id = (long) -1;
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null && seasonTeam.getTeam().getId() == teamId){
                id = seasonTeam.getTeam().getId();
                teamDao.delete(seasonTeam.getTeam());
                seasonTeam.setTeam(null);

                if(seasonTeam.getSeason() == null && seasonTeam.getTeam()==null){
                    seasonTeamDao.delete(seasonTeam);
                }
            }
        }
        if(id == -1) {
            throw new InstanceNotFoundException("project.entities.team", teamId);
        }
    }

    @Override
    public Team updateTeam(Long userId, Team team) throws InstanceNotFoundException {

        Optional<Team> existingTeam = teamDao.findById(team.getId());
        if (!existingTeam.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", team.getId());
        }

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Team existingTeam2 = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam() != null &&seasonTeam.getTeam().getId() == team.getId()){
                existingTeam2 = seasonTeam.getTeam();
                existingTeam2.setTeamName(team.getTeamName());
                teamDao.save(existingTeam2);

                Optional<SeasonTeam> seasonTeam2 = seasonTeamDao.findById(seasonTeam.getId());
                seasonTeam2.get().getTeam().setTeamName(team.getTeamName());
                seasonTeamDao.save(seasonTeam2.get());
            }
        }
        if (existingTeam2 == null) {
            throw new InstanceNotFoundException("project.entities.team", team.getId());
        }
        return existingTeam2;
    }
}