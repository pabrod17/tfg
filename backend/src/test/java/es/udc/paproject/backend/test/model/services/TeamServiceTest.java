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
import es.udc.paproject.backend.model.services.SeasonService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class TeamServiceTest {

	private final Long NON_EXISTENT_ID = new Long(-1);

	@Autowired
	private TeamService teamService;

	@Autowired
	private SeasonService seasonService;

	@Autowired
	private SeasonTeamDao seasonTeamDao;

	@Autowired
	private UserService userService;

	private Team createTeam(String teamName) {
		return new Team(teamName);
	}

	private Season createSeason() {

		LocalDateTime startDate = LocalDateTime.of(2020, 5, 12, 15, 56);
		LocalDateTime endDate = LocalDateTime.of(2021, 2, 14, 15, 56);
		return new Season(startDate, endDate, "Calendario");
	}

	private Season createSeason2(){

        LocalDateTime startDate = LocalDateTime.of(2020, 7, 12, 15, 56);    
        LocalDateTime endDate = LocalDateTime.of(2021, 7, 14, 15, 56);    
        return new Season(startDate, endDate, "Calendario");
    }

	private User createUser(String userName) {
		return new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
	}

	@Test
	public void testAddTeamAndFindTeamById() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);

		Team team = createTeam("primero");
		teamService.addTeam(user.getId(),team);

		Long teamId = team.getId();
		Team foundTeam = teamService.findTeamById(user.getId(), teamId);
		List<SeasonTeam> seasonsTeams = seasonTeamDao.findByUserId(user.getId());
		Team foundTeamByUser = seasonsTeams.get(0).getTeam();

		assertEquals(team, foundTeam);
		assertEquals(team, foundTeamByUser);
	}

	@Test
	public void testAddTeamAndFindTeamByName() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);

		Team team = createTeam("segundo");
		teamService.addTeam(user.getId(), team);

		Team foundTeam = teamService.findTeamByName(user.getId(),"segundo");

		List<SeasonTeam> seasonsTeams = seasonTeamDao.findByUserId(user.getId());
		Team foundTeamByUser = seasonsTeams.get(0).getTeam();

		assertEquals(team, foundTeam);
		assertEquals(team, foundTeamByUser);
	}

	@Test
	public void testAddTeamAndFindTeamByIdFromNonExistentId() throws DuplicateInstanceException {
		User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> teamService.findTeamById(user.getId(),NON_EXISTENT_ID));
	}

	@Test
	public void testAddTeamAndFindTeamByIdFromNonExistentName() throws DuplicateInstanceException {
		User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> teamService.findTeamByName(user.getId(),"noexiste"));
	}

	@Test
	public void testFindAllTeams() throws InstanceNotFoundException, DuplicateInstanceException {

		User user = createUser("usuario");
		userService.signUp(user);
		Team team1 = createTeam("primero");
		teamService.addTeam(user.getId(),team1);
		Team team2 = createTeam("segundo");
		teamService.addTeam(user.getId(),team2);
		Team team3 = createTeam("tercero");
		teamService.addTeam(user.getId(),team3);

		User user2 = createUser("usuario2");
		userService.signUp(user2);
		Team team11 = createTeam("primero2");
		teamService.addTeam(user2.getId(),team11);
		Team team22 = createTeam("segundo2");
		teamService.addTeam(user2.getId(),team22);

		List<Team> teams = new ArrayList<>();
		teams.add(team1);
		teams.add(team2);
		teams.add(team3);

		assertEquals(3, teamService.findAllTeams(user.getId()).size());
		assertEquals(2, teamService.findAllTeams(user2.getId()).size());

		assertEquals(teams.get(0), teamService.findAllTeams(user.getId()).get(0));
		assertEquals(teams.get(1), teamService.findAllTeams(user.getId()).get(1));
		assertEquals(teams.get(2), teamService.findAllTeams(user.getId()).get(2));
	}

	@Test
	public void testRemoveTeam() throws InstanceNotFoundException, DuplicateInstanceException {
		
		User user = createUser("usuario");
		userService.signUp(user);
		Team team1 = createTeam("primero");
		teamService.addTeam(user.getId(),team1);
		Team team2 = createTeam("segundo");
		teamService.addTeam(user.getId(),team2);
		Team team3 = createTeam("tercero");
		teamService.addTeam(user.getId(),team3);

		teamService.removeTeam(user.getId(),team2.getId());

		assertEquals(2, teamService.findAllTeams(user.getId()).size());
	}

	@Test
	public void testRemoveTeamFromNonExistentId() throws DuplicateInstanceException {
		User user = createUser("usuario");
		userService.signUp(user);
		assertThrows(InstanceNotFoundException.class, () -> teamService.removeTeam(user.getId(),NON_EXISTENT_ID));
	}

	@Test
	public void testUpdateTeam() throws InstanceNotFoundException, DuplicateInstanceException {
		
		User user = createUser("usuario");
		userService.signUp(user);

		Team team = createTeam("primero");
		teamService.addTeam(user.getId(),team);
		team.setTeamName("segundo");

		teamService.updateTeam(user.getId(),team);

		assertEquals("segundo", teamService.findTeamById(user.getId(),team.getId()).getTeamName());
		assertEquals("segundo", seasonTeamDao.findByUserId(user.getId()).get(0).getTeam().getTeamName());

	}

	@Test
	public void testAddTeamToSeasonAndfindSeasonTeamsByTeamId() throws DuplicateInstanceException,
			InstanceNotFoundException {

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

		teamService.addTeamToSeason(season.getId(),team, user.getId());
		teamService.addTeamToSeason(season.getId(), team2, user.getId());
		teamService.addTeamToSeason(season2.getId(), team, user.getId());

		List<Season> seasons = teamService.findSeasonsToTeam(user.getId(), team.getId());
		
		assertEquals(2, seasons.size());
		assertEquals(teamService.findSeasonsToTeam(user.getId(), team.getId()).get(0), season);
		assertEquals(teamService.findSeasonsToTeam(user.getId(), team.getId()).get(1), season2);
	}
}