package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.Position;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface PlayerService {
    
    Player addPlayer(Long teamId, String playerName, String primaryLastName, String secondLastName,
    Position position, String trends, String phoneNumber, String email, String dni) throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException, IncorrectPhoneNumberException;

    void changePlayerToTeam(Long playerId, Long teamId) throws InstanceNotFoundException;

    Player findPlayerById(Long playerId, Long teamId) throws InstanceNotFoundException;

    Player findPlayerByDni(Long teamId, String dni) throws InstanceNotFoundException, IncorrectDniException;

    List<Player> findPlayerByCompletedName(Long teamId, String name, String primaryLastName, String secondLastName) throws InstanceNotFoundException;
    
    List<Player> findAPlayersOfTeam(Long teamId) throws InstanceNotFoundException;

    List<Player> findPlayersByPositionAndTeam(Long teamId, Position position);

    void removePlayer(Long teamId, Long playerId);

    Player updatePlayer(Long teamId, Long playerId, String playerName, String primaryLastName, String secondLastName,
    Position position, String trends, String phoneNumber, String email, String dni);
}