package es.udc.paproject.backend.model.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.SeasonDao;
import es.udc.paproject.backend.model.entities.SeasonTeam;
import es.udc.paproject.backend.model.entities.SeasonTeamDao;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class SeasonServiceImpl implements SeasonService {

    @Autowired
    private SeasonDao seasonDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Override
    public void addSeason(LocalDateTime startDate, LocalDateTime endDate, String calendario) {
        
        Season season = new Season(startDate, endDate, calendario);
        seasonDao.save(season);
    }

    @Override
    public void addTeamToSeason(Season season, Team team, User user) {

        SeasonTeam seasonTeam = new SeasonTeam(season, team, user);
        seasonTeamDao.save(seasonTeam);
    }

    @Override
    @Transactional(readOnly = true)
    public Season findSeasonById(Long seasonId) throws InstanceNotFoundException {

        Optional<Season> season = seasonDao.findById(seasonId);

        if (!season.isPresent()) {
            throw new InstanceNotFoundException("project.entities.season", seasonId);
        }

        return season.get();
    }

    @Override
    public List<Season> findSeasonsBetweenTwoDates(LocalDateTime startDate, LocalDateTime endDate)
            throws InstanceNotFoundException {

        List<Season> seasons = seasonDao.find(startDate, endDate);

        if (seasons.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.season");
        }

        return seasons;
    }

    @Override
    public List<Season> findAllSeasons() {

        Iterable<Season> seasons = seasonDao.findAll();
        List<Season> seasonsList = new ArrayList<>();

        seasons.forEach(s -> seasonsList.add(s));

        return seasonsList;
    }

    @Override
    public List<Team> findTeamsToSeason(Long seasonId) throws InstanceNotFoundException {

        List<Team> teams = seasonTeamDao.findBySeasonId(seasonId);

        if (teams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        return teams;
    }

    @Override
    public void removeSeason(Long seasonId) throws InstanceNotFoundException {

        Optional<Season> existingSeason = seasonDao.findById(seasonId);

        if (!existingSeason.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", seasonId);
        }

        seasonDao.delete(existingSeason.get());
    }

    @Override
    public Season updateSeason(Long seasonId, LocalDateTime startDate, LocalDateTime endDate)
            throws InstanceNotFoundException {

        Optional<Season> existingSeason = seasonDao.findById(seasonId);

        if (!existingSeason.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", seasonId);
        }

        existingSeason.get().setStartDate(startDate);
        existingSeason.get().setEndDate(endDate);

        seasonDao.save(existingSeason.get());

        return existingSeason.get();
    }
}