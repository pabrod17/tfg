package es.udc.paproject.backend.test.model.services;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.PlayerService;
import es.udc.paproject.backend.model.services.TeamService;
import es.udc.paproject.backend.model.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class PlayerServiceTest {

//https://testingdatagenerator.com/doi.html --> Generador de DNIs
    private final Long NON_EXISTENT_ID = new Long(-1);

    @Autowired
    private PlayerService playerService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    // PointGuard, ShootingGuard, SmallForward, PowerForward, Center

    private User createUser(String userName) throws DuplicateInstanceException {
        User user = new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
        userService.signUp(user);
        return user;
    }

    private Team createTeam(Long userId, String teamName) throws InstanceNotFoundException, DuplicateInstanceException {
        return teamService.addTeam(userId, teamName);
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J");

        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team.getId());

        assertEquals(player, playerFound);
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamFromNonExistentId() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J");

		assertThrows(InstanceNotFoundException.class, () -> playerService.findPlayerByIdOfTeam(NON_EXISTENT_ID, team.getId()));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadPhoneNumber() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(IncorrectPhoneNumberException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "63867706554684", "paco@gmail.com", "46095900J"));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadEmail() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(IncorrectEmailException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco4684", "46095900J"));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadDni() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(IncorrectDniException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900fasedfasdf"));
    }

    @Test
    public void testAddPlayerToTeamAndFindPlayerByIdOfTeamWithBadPosition() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");

		assertThrows(InstanceNotFoundException.class, () -> playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "badPosition", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J"));
    }

    @Test
    public void testChangePlayerToTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "PointGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "46095900J");

        playerService.changePlayerToTeam(player.getId(), team2.getId());
        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team2.getId());

        assertEquals(player, playerFound);
    }

    @Test
    public void testFindPlayersOfTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");

        List<Player> players = playerService.findAPlayersOfTeam(team.getId());

        assertEquals(2, players.size());
        assertEquals(player, players.get(0));
        assertEquals(player2, players.get(1));
    }

    @Test
    public void testFindPlayerByIdOfTeam() throws DuplicateInstanceException, InstanceNotFoundException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");

        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team2.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");

        Player player1Found = playerService.findPlayerByIdOfTeam(player.getId(), team.getId());
        Player player2Found = playerService.findPlayerByIdOfTeam(player2.getId(), team2.getId());
        List<Player> players = playerService.findAPlayersOfTeam(team.getId());
        List<Player> players2 = playerService.findAPlayersOfTeam(team2.getId());

        assertEquals(1, players.size());
        assertEquals(1, players2.size());
        assertEquals(player, player1Found);
        assertEquals(player2, player2Found);
        assertEquals(player2, player2Found);
    }

    @Test
    public void testFindPlayerByCompletedNameOfTeam() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        List<Player> players = playerService.findPlayersByCompletedNameOfTeam(team.getId(), "jugador2", null, "apellido22");

        assertEquals(2, players.size());
        assertEquals(player2, players.get(0));
        assertEquals(player3, players.get(1));
    }

    @Test
    public void testFindPlayerByDniOfTeam() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        Player playerFound = playerService.findPlayerByDniOfTeam(team.getId(), "53984323B");

        assertEquals(player2, playerFound);
    }

    @Test
    public void testFindPlayersByPositionAndTeam() throws InstanceNotFoundException, DuplicateInstanceException,
            IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        List<Player> players = playerService.findPlayersByPositionAndTeam(team.getId(), "SmallForward");

        assertEquals(2, players.size());
        assertEquals(player2, players.get(0));
        assertEquals(player3, players.get(1));
    }

    @Test
    public void testRemovePlayer() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");
        Player player2 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco2@gmail.com", "53984323B");
        Player player3 = playerService.addPlayer(team.getId(), "jugador2", "apellido11", "apellido22", "SmallForward", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco3@gmail.com", "27458552W");

        playerService.removePlayer(team.getId(), player2.getId());
        List<Player> players = playerService.findAPlayersOfTeam(team.getId());

        assertEquals(2, players.size());
        assertEquals(player, players.get(0));
        assertEquals(player3, players.get(1));
    }

    @Test
    public void testUpdatePlayer() throws DuplicateInstanceException, InstanceNotFoundException, IncorrectDniException,
            IncorrectEmailException, IncorrectPhoneNumberException {
        User user = createUser("usuario");
        Team team = createTeam(user.getId(), "team");
        Team team2 = createTeam(user.getId(), "team2");
        Player player = playerService.addPlayer(team.getId(), "jugador1", "apellido1", "apellido2", "ShootingGuard", 
        "Este jugador tiene tendencia a defender bajo, y a salir demasiado rapido al contraataque", "638677065", "paco@gmail.com", "87930523M");

        playerService.updatePlayer(team2.getId(), player.getId(), "updated", "updated2", "updated3", "SmallForward", "Mucha tendencia de tiro de 3", "638677065", "paco3@gmail.com", "53984323B");

        Player playerFound = playerService.findPlayerByIdOfTeam(player.getId(), team2.getId());
        List<Player> players2 = playerService.findAPlayersOfTeam(team2.getId());

        assertEquals(1, players2.size());
        assertEquals(playerFound.getPlayerName(), "updated");
        assertEquals(playerFound.getPrimaryLastName(), "updated2");
        assertEquals(playerFound.getSecondLastName(), "updated3");
        assertEquals(playerFound.getPosition(), "SmallForward");
        assertEquals(playerFound.getTrends(), "Mucha tendencia de tiro de 3");
        assertEquals(playerFound.getPhoneNumber(), "638677065");
        assertEquals(playerFound.getEmail(), "paco3@gmail.com");
        assertEquals(playerFound.getDni(), "53984323B");
    }

//testFindPlayersrWithLesionOfTeam
//testFindPlayersWithOneTypeLesion
//testRemovePlayerWithLesion
}