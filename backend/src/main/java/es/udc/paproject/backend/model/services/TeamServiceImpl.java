package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.constraints.Null;

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

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private UserService userService;

    @Override
    public Team addTeam(Long userId, Team team) throws InstanceNotFoundException {
        
        User user = userService.loginFromId(userId);
        teamDao.save(team);
        SeasonTeam seasonTeam = new SeasonTeam(null, team, user);
        seasonTeamDao.save(seasonTeam);
       
        return team;
    }

    @Override
    public void addTeamToSeason(Long seasonId, Team team, Long userId) throws InstanceNotFoundException {

        Season season = seasonService.findSeasonById(seasonId);
        User user = userService.loginFromId(userId);
        
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
            if(seasonTeam.getTeam().getId() == teamId){
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
            if(seasonTeam.getTeam().getTeamName() == teamName){
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
            //EXCEPCION
        }

        return teams;
    }

    @Override
    public List<Season> findSeasonsToTeam(Long userId, Long teamId) throws InstanceNotFoundException {

        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        List<Season> seasons = new ArrayList<>();

        if (seasonTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam().getId() == teamId && seasonTeam.getSeason() != null){
                seasons.add(seasonTeam.getSeason());
            }
        }
        if (seasons.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        return seasons;
    }

    @Override
    public void removeTeam(Long userId, Long teamId) throws InstanceNotFoundException {
        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Long id = (long) -1;
        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam().getId() == teamId && seasonTeam.getTeam() != null){
                id = seasonTeam.getTeam().getId();
                teamDao.delete(seasonTeam.getTeam());
                seasonTeam.setTeam(null);
            }
        }
        if(id == -1) {
            throw new InstanceNotFoundException("project.entities.team", teamId);
        }
    }

    @Override
    public Team updateTeam(Long userId, Team team) throws InstanceNotFoundException {
        User user = userService.loginFromId(userId);
        List<SeasonTeam> seasonTeams = seasonTeamDao.findByUserId(user.getId());
        Team existingTeam = null;

        for (SeasonTeam seasonTeam : seasonTeams) {
            if(seasonTeam.getTeam().getId() == team.getId()){
                existingTeam = seasonTeam.getTeam();

                existingTeam.setTeamName(team.getTeamName());
                teamDao.save(existingTeam);

                Optional<SeasonTeam> seasonTeam2 = seasonTeamDao.findById(seasonTeam.getId());
                seasonTeam2.get().setTeam(existingTeam);
                seasonTeamDao.save(seasonTeam2.get());
            }
        }
        
        if (existingTeam == null) {
            throw new InstanceNotFoundException("project.entities.team", team.getId());
        }

        return existingTeam;
    }
}