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
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class SeasonServiceImpl implements SeasonService {

    @Autowired
    private SeasonDao seasonDao;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Override
    public Season addSeason(Season season) {
        
        seasonDao.save(season);
        return season;
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

        List<Season> seasons = seasonDao.findSeasons(startDate, endDate);

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

        List<SeasonTeam> seasonTeams = seasonTeamDao.findSeasonTeamsBySeasonId(seasonId);
        List<Team> teams = new ArrayList<>();

        if (seasonTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        for(int i = 0; i < seasonTeams.size(); i++){
            teams.add(seasonTeams.get(i).getTeam());
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
    public Season updateSeason(Season season)
            throws InstanceNotFoundException {

        Optional<Season> existingSeason = seasonDao.findById(season.getId());

        if (!existingSeason.isPresent()) {
            throw new InstanceNotFoundException("project.entities.team", season.getId());
        }

        existingSeason.get().setStartDate(season.getStartDate());
        existingSeason.get().setEndDate(season.getEndDate());

        seasonDao.save(existingSeason.get());

        return existingSeason.get();
    }
}