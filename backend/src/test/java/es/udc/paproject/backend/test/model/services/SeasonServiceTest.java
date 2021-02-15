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
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
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
	private UserService userService;

    private Season createSeason(){

        LocalDateTime startDate = LocalDateTime.of(2020, 5, 12, 15, 56);    
        LocalDateTime endDate = LocalDateTime.of(2021, 2, 14, 15, 56);    
        return new Season(startDate, endDate, "Calendario");
    }
    private Season createSeason2(){

        LocalDateTime startDate = LocalDateTime.of(2020, 7, 12, 15, 56);    
        LocalDateTime endDate = LocalDateTime.of(2021, 7, 14, 15, 56);    
        return new Season(startDate, endDate, "Calendario");
    }
    private Season createSeason3(){

        LocalDateTime startDate = LocalDateTime.of(2020, 8, 12, 15, 56);    
        LocalDateTime endDate = LocalDateTime.of(2021, 8, 14, 15, 56);    
        return new Season(startDate, endDate, "Calendario");
    }

    private Team createTeam(String teamName) {
		return new Team(teamName);
	}

	private User createUser(String userName) {
		return new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
	}

    @Test
    public void testAddSeasonAndFindSeasonById() throws InstanceNotFoundException {

        Season season = createSeason();
        seasonService.addSeason(season);

        Long seasonId = season.getId();
        Season foundSeason = seasonService.findSeasonById(seasonId);

        assertEquals(season, foundSeason);
    }

    @Test
    public void testAddSeasonAndFindSeasonBetweenTwoDates() throws InstanceNotFoundException {

        Season season = createSeason();
        seasonService.addSeason(season);
        Season season2 = createSeason2();
        seasonService.addSeason(season2);
        Season season3 = createSeason3();
        seasonService.addSeason(season3);


        List<Season> seasons = seasonService.findSeasonsBetweenTwoDates(startDate, endDate);
        assertEquals(3, seasons.size());
    }

    @Test
    public void testAddSeasonAndFindSeasonByIdFromNonExistentId(){
        assertThrows(InstanceNotFoundException.class, () -> seasonService.findSeasonById(NON_EXISTENT_ID));
    }

    @Test
    public void testFindAllSeasons(){

        Season season1 = createSeason();
        seasonService.addSeason(season1);
        Season season2 = createSeason2();
        seasonService.addSeason(season2);
        Season season3 = createSeason3();
        seasonService.addSeason(season3);

        List<Season> seasons = new ArrayList<>();
        seasons.add(season1);
        seasons.add(season2);
        seasons.add(season3);

        assertEquals(seasons.size(), seasonService.findAllSeasons().size());
        assertEquals(seasons.get(0), seasonService.findAllSeasons().get(0));
        assertEquals(seasons.get(1), seasonService.findAllSeasons().get(1));
        assertEquals(seasons.get(2), seasonService.findAllSeasons().get(2));
    }

    @Test
    public void testReomveSeason() throws InstanceNotFoundException {

        Season season1 = createSeason();
        seasonService.addSeason(season1);
        Season season2 = createSeason2();
        seasonService.addSeason(season2);
        Season season3 = createSeason3();
        seasonService.addSeason(season3);

        seasonService.removeSeason(season2.getId());

        assertEquals(2, seasonService.findAllSeasons().size());
    }

    @Test
    public void testRemoveSeasonFromNonExistentId(){
		assertThrows(InstanceNotFoundException.class, () -> seasonService.removeSeason(NON_EXISTENT_ID));
    }

    @Test
    public void testUpdateSeason() throws InstanceNotFoundException {

        Season season = createSeason();
        seasonService.addSeason(season);
        Long seasonId = season.getId();
        seasonService.updateSeason(seasonId, startDateUpdated, endDateUpdated);

        assertEquals(startDateUpdated, seasonService.findSeasonById(seasonId).getStartDate());
        assertEquals(endDateUpdated, seasonService.findSeasonById(seasonId).getEndDate());
    }

    @Test
    public void testUpdateSeasonFromNonExistenId(){
        assertThrows(InstanceNotFoundException.class, () -> seasonService.removeSeason(NON_EXISTENT_ID));
    }

	@Test
	public void testFindTeamsToSeason() throws DuplicateInstanceException, InstanceNotFoundException {
		Team team = createTeam("equipo");
		teamService.addTeam(team);
		Team team2 = createTeam("dos");
		teamService.addTeam(team2);
		Season season = createSeason();
		seasonService.addSeason(season);
		User user = createUser("usuario");
		userService.signUp(user);

		teamService.addTeamToSeason(season, team, user);
		teamService.addTeamToSeason(season, team2, user);

        List<Team> teams = seasonService.findTeamsToSeason(season.getId());

        assertEquals(2, teams.size());
        assertEquals(seasonService.findTeamsToSeason(season.getId()).get(0), team);
        assertEquals(seasonService.findTeamsToSeason(season.getId()).get(1), team2);

	}
}