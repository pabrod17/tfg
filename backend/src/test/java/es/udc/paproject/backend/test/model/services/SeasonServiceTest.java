package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Season;
import es.udc.paproject.backend.model.entities.SeasonTeam;
import es.udc.paproject.backend.model.entities.SeasonTeamDao;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.StartDateAfterEndDateException;
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class SeasonServiceTest {

    private final Long NON_EXISTENT_ID = new Long(-1);
    private final LocalDateTime startDate = LocalDateTime.of(2015, 5, 12, 15, 56);
    private final LocalDateTime endDate = LocalDateTime.of(2022, 5, 12, 15, 56);
    private final LocalDateTime startDateUpdated = LocalDateTime.of(2030, 1, 7, 15, 56);
    private final LocalDateTime endDateUpdated = LocalDateTime.of(2035, 2, 6, 15, 56);

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private SeasonTeamDao seasonTeamDao;

    @Autowired
    private UserService userService;

    private Season createSeason() {

        LocalDateTime startDate = LocalDateTime.of(2020, 5, 12, 15, 56);
        LocalDateTime endDate = LocalDateTime.of(2021, 2, 14, 15, 56);
        return new Season(startDate, endDate, "Calendario");
    }

    private Season createSeason2() {

        LocalDateTime startDate = LocalDateTime.of(2020, 7, 12, 15, 56);
        LocalDateTime endDate = LocalDateTime.of(2021, 7, 14, 15, 56);
        return new Season(startDate, endDate, "Calendario");
    }

    private Season createSeason3() {

        LocalDateTime startDate = LocalDateTime.of(2020, 8, 12, 15, 56);
        LocalDateTime endDate = LocalDateTime.of(2021, 8, 14, 15, 56);
        return new Season(startDate, endDate, "Calendario");
    }

    private Season createSeasonOutDate() {

        LocalDateTime startDate = LocalDateTime.of(2014, 8, 12, 15, 56);
        LocalDateTime endDate = LocalDateTime.of(2023, 8, 14, 15, 56);
        return new Season(startDate, endDate, "Calendario");
    }

    private Season createSeasonWithBadDates() {

        LocalDateTime endDate = LocalDateTime.of(2021, 7, 14, 15, 56);
        LocalDateTime startDate = LocalDateTime.of(2020, 7, 12, 15, 56);

        return new Season(endDate, startDate, "Calendario");
    }

    private Team createTeam(String teamName) {
        return new Team(teamName);
    }

    private User createUser(String userName) {
        return new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
    }

    @Test
    public void testAddSeasonAndFindSeasonById() throws InstanceNotFoundException, DuplicateInstanceException,
            StartDateAfterEndDateException {

        User user = createUser("usuario");
        userService.signUp(user);

        Season season = createSeason();
        seasonService.addSeason(user.getId(), season);

        Long seasonId = season.getId();
        Season foundSeason = seasonService.findSeasonById(user.getId(), seasonId);
        List<SeasonTeam> seasonsTeams = seasonTeamDao.findByUserId(user.getId());
        Season foundSeasonByUser = seasonsTeams.get(0).getSeason();

        assertEquals(season, foundSeason);
        assertEquals(season, foundSeasonByUser);
    }

    @Test
    public void testAddSeasonAndFindSeasonBetweenTwoDates()
            throws InstanceNotFoundException, DuplicateInstanceException, StartDateAfterEndDateException {

        User user = createUser("usuario");
        userService.signUp(user);

        Season season = createSeason();
        seasonService.addSeason(user.getId(), season);
        Season season2 = createSeason2();
        seasonService.addSeason(user.getId(), season2);
        Season season3 = createSeason3();
        seasonService.addSeason(user.getId(), season3);
        Season seasonOutDate = createSeasonOutDate();
        seasonService.addSeason(user.getId(), seasonOutDate);

        List<Season> seasons = seasonService.findSeasonsBetweenTwoDates(user.getId(), startDate, endDate);
        assertEquals(3, seasons.size());
    }

    @Test
    public void testAddSeasonAndFindSeasonByIdFromNonExistentId() throws DuplicateInstanceException {
        User user = createUser("usuario");
        userService.signUp(user);

        assertThrows(InstanceNotFoundException.class,
                () -> seasonService.findSeasonById(user.getId(), NON_EXISTENT_ID));
    }

    @Test
    public void testAddSeasonWithBadDates() throws DuplicateInstanceException, InstanceNotFoundException,
            StartDateAfterEndDateException {
        User user = createUser("usuario");
        userService.signUp(user);
        Season season = createSeasonWithBadDates();

        assertThrows(StartDateAfterEndDateException.class, () -> seasonService.addSeason(user.getId(), season));
    }

    @Test
    public void testAddSeasonsAndFindSeasonsWithBadDates() throws DuplicateInstanceException, InstanceNotFoundException,
            StartDateAfterEndDateException {
        User user = createUser("usuario");
        userService.signUp(user);
        Season season1 = createSeason();
        seasonService.addSeason(user.getId(), season1);
        Season season2 = createSeason2();
        seasonService.addSeason(user.getId(), season2);

        assertThrows(StartDateAfterEndDateException.class, () -> seasonService.findSeasonsBetweenTwoDates(user.getId(),endDate, startDate));
    }

    @Test
    public void testFindAllSeasons() throws InstanceNotFoundException, DuplicateInstanceException,
            StartDateAfterEndDateException {

        User user = createUser("usuario");
        userService.signUp(user);
        Season season1 = createSeason();
        seasonService.addSeason(user.getId(), season1);
        Season season2 = createSeason2();
        seasonService.addSeason(user.getId(), season2);
        Season season3 = createSeason3();
        seasonService.addSeason(user.getId(), season3);

        User user2 = createUser("usuario2");
        userService.signUp(user2);
        Season season11 = createSeason();
        seasonService.addSeason(user2.getId(), season11);
        Season season22 = createSeason2();
        seasonService.addSeason(user2.getId(), season22);
        List<Season> seasons = new ArrayList<>();
        seasons.add(season1);
        seasons.add(season2);
        seasons.add(season3);

        assertEquals(3, seasonService.findAllSeasons(user.getId()).size());
        assertEquals(2, seasonService.findAllSeasons(user2.getId()).size());

        assertEquals(seasons.size(), seasonService.findAllSeasons(user.getId()).size());
        assertEquals(seasons.get(0), seasonService.findAllSeasons(user.getId()).get(0));
        assertEquals(seasons.get(1), seasonService.findAllSeasons(user.getId()).get(1));
        assertEquals(seasons.get(2), seasonService.findAllSeasons(user.getId()).get(2));
    }

    @Test
    public void testRemoveSeason()
            throws InstanceNotFoundException, DuplicateInstanceException, StartDateAfterEndDateException {

		User user = createUser("usuario");
		userService.signUp(user);
        Season season1 = createSeason();
        seasonService.addSeason(user.getId(),season1);
        Season season2 = createSeason2();
        seasonService.addSeason(user.getId(),season2);
        Season season3 = createSeason3();
        seasonService.addSeason(user.getId(),season3);

        seasonService.removeSeason(user.getId(),season2.getId());

        assertEquals(2, seasonService.findAllSeasons(user.getId()).size());
    }

    @Test
    public void testRemoveSeasonFromNonExistentId() throws DuplicateInstanceException {
        User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> seasonService.removeSeason(user.getId(),NON_EXISTENT_ID));
    }

    @Test
    public void testUpdateSeason() throws InstanceNotFoundException, DuplicateInstanceException,
            StartDateAfterEndDateException {

		User user = createUser("usuario");
		userService.signUp(user);

        Season season = createSeason();
        seasonService.addSeason(user.getId(),season);
        season.setStartDate(startDateUpdated);
        season.setEndDate(endDateUpdated);
        seasonService.updateSeason(user.getId(),season);

        assertEquals(startDateUpdated, seasonService.findSeasonById(user.getId(),season.getId()).getStartDate());
        assertEquals(endDateUpdated, seasonService.findSeasonById(user.getId(),season.getId()).getEndDate());
        assertEquals(startDateUpdated, seasonTeamDao.findByUserId(user.getId()).get(0).getSeason().getStartDate());
        assertEquals(endDateUpdated, seasonTeamDao.findByUserId(user.getId()).get(0).getSeason().getEndDate());
    }

	@Test
	public void testFindTeamsToSeason() throws DuplicateInstanceException, InstanceNotFoundException,
            StartDateAfterEndDateException {
		
        User user = createUser("usuario");
		userService.signUp(user);

        Team team = createTeam("equipo");
		teamService.addTeam(user.getId(),team);
		Team team2 = createTeam("dos");
		teamService.addTeam(user.getId(),team2);

		Season season = createSeason();
		seasonService.addSeason(user.getId(),season);
        Season season2 = createSeason2();
		seasonService.addSeason(user.getId(),season2);

		teamService.addTeamToSeason(season.getId(), team, user.getId());
		teamService.addTeamToSeason(season.getId(), team2, user.getId());
        teamService.addTeamToSeason(season2.getId(), team2, user.getId());

        List<Team> teams = seasonService.findTeamsToSeason(user.getId(),season.getId());
        List<Team> teams2 = seasonService.findTeamsToSeason(user.getId(),season2.getId());

        assertEquals(2, teams.size());
        assertEquals(1, teams2.size());

        assertEquals(seasonService.findTeamsToSeason(user.getId(),season.getId()).get(0), team);
        assertEquals(seasonService.findTeamsToSeason(user.getId(),season.getId()).get(1), team2);
        assertEquals(seasonService.findTeamsToSeason(user.getId(),season2.getId()).get(0), team2);
	}
}