package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.TeamService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class TeamServiceTest {

	private final Long NON_EXISTENT_ID = new Long(-1);

	@Autowired
	private TeamService teamService;

	private Team createTeam(String teamName) {
		return new Team(teamName);
	}

	@Test
	public void testAddTeamAndFindTeamById() throws InstanceNotFoundException {

		Team team = createTeam("primero");
		teamService.addTeam(team);

		Long teamId = team.getId();
		Team foundTeam = teamService.findTeamById(teamId);

		assertEquals(team, foundTeam);
	}

	@Test
	public void testAddTeamAndFindTeamByName() throws InstanceNotFoundException {

		Team team = createTeam("segundo");
		teamService.addTeam(team);

		Team foundTeam = teamService.findTeamByName("segundo");

		assertEquals(team, foundTeam);
	}

	@Test
	public void testAddTeamAndFindTeamByIdFromNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () -> teamService.findTeamById(NON_EXISTENT_ID));
	}

	@Test
	public void testAddTeamAndFindTeamByIdFromNonExistentName() {
		assertThrows(InstanceNotFoundException.class, () -> teamService.findTeamByName("noexiste"));
	}

	@Test
	public void testFindAllTeams() {

		Team team1 = createTeam("primero");
		teamService.addTeam(team1);
		Team team2 = createTeam("segundo");
		teamService.addTeam(team2);
		Team team3 = createTeam("tercero");
		teamService.addTeam(team3);

		List<Team> teams = new ArrayList<>();
		teams.add(team1);
		teams.add(team2);
		teams.add(team3);

		assertEquals(3, teamService.findAllTeams().size());
		assertEquals(teams.get(0), teamService.findAllTeams().get(0));
		assertEquals(teams.get(1), teamService.findAllTeams().get(1));
		assertEquals(teams.get(2), teamService.findAllTeams().get(2));
	}

	@Test
	public void testRemoveTeam() throws InstanceNotFoundException {

		Team team1 = createTeam("primero");
		teamService.addTeam(team1);
		Team team2 = createTeam("segundo");
		teamService.addTeam(team2);
		Team team3 = createTeam("tercero");
		teamService.addTeam(team3);

		teamService.removeTeam(team2.getId());

		assertEquals(2, teamService.findAllTeams().size());
	}

	@Test
	public void testRemoveTeamFromNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () -> teamService.removeTeam(NON_EXISTENT_ID));
	}

	@Test
	public void testUpdateTeam() throws InstanceNotFoundException {

		Team team1 = createTeam("primero");
		teamService.addTeam(team1);

		teamService.updateTeam(team1.getId(), "segundo");


		assertEquals("segundo", teamService.findTeamById(team1.getId()).getTeamName());
	}

	public void testUpdateTeamFromNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () -> teamService.updateTeam(NON_EXISTENT_ID, "primero"));
	}
	//FALTA CREAR EL TEST PARA LA FUNCION DE: 
		//--> addTeamToSeason(Season season, Team team, User user)
}