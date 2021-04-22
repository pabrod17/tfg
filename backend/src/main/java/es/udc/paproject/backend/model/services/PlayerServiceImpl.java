package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Player;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.entities.Position;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.TeamDao;
import es.udc.paproject.backend.model.exceptions.IncorrectDniException;
import es.udc.paproject.backend.model.exceptions.IncorrectEmailException;
import es.udc.paproject.backend.model.exceptions.IncorrectPhoneNumberException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.util.*;

@Service
@Transactional
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private PlayerDao playerDao;

    @Override
    public Player addPlayer(Long teamId, String playerName, String primaryLastName, String secondLastName,
            Position position, String trends, String phoneNumber, String email, String dni)
            throws InstanceNotFoundException, IncorrectDniException, IncorrectEmailException,
            IncorrectPhoneNumberException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!Validations.isValidDni(dni)) {
            throw new IncorrectDniException(dni);
        }
        if (!Validations.isValidEmail(email)) {
            throw new IncorrectEmailException(email);
        }
        if (!Validations.isValidPhoneNumber(phoneNumber)) {
            throw new IncorrectPhoneNumberException(phoneNumber);
        }

        Optional<Team> team = teamDao.findById(teamId);

        Player player = new Player(playerName, primaryLastName, secondLastName, position, trends, phoneNumber, email,
                dni, team.get());
        playerDao.save(player);
        return player;
    }

    @Override
    public void changePlayerToTeam(Long playerId, Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        Player player = playerDao.findById(playerId).get();

        if (teamId != playerDao.findById(playerId).get().getTeam().getId()) {
            player.setTeam(teamDao.findById(teamId).get());
        }
        playerDao.save(player);
    }

    @Override
    public List<Player> findAPlayersOfTeam(Long teamId) throws InstanceNotFoundException {

        if(!teamDao.existsById(teamId)){
            throw new InstanceNotFoundException("project.entities.team");
        }
        List<Player> players = playerDao.findByTeamId(teamId);

        if (players.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.player");
        }
        return players;
    }

    @Override
    public Player findPlayerById(Long playerId, Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        Player player = playerDao.findById(playerId).get();
        return player;
    }

    @Override
    public List<Player> findPlayerByCompletedName(Long teamId, String name, String primaryLastName, String secondLastName)
            throws InstanceNotFoundException {
        
        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<Player> playersResult = new ArrayList<>();
        List<Player> players = playerDao.findByTeamId(teamId);



        for (Player player : players) {

            if(name != null && primaryLastName != null && secondLastName != null){
                if(player.getPlayerName().equals(name) && 
                player.getPrimaryLastName().equals(primaryLastName) && player.getSecondLastName().equals(secondLastName)){
                    playersResult.add(player);
                }
            }

            if(name == null){
                if(primaryLastName != null){
                    if(secondLastName != null){
                        if(player.getPrimaryLastName().equals(primaryLastName) && player.getSecondLastName().equals(secondLastName)){
                            playersResult.add(player);
                        }
                    } else{
                        if(player.getPrimaryLastName().equals(primaryLastName)){
                            playersResult.add(player);
                        }
                    }
                } else {
                    if(player.getSecondLastName().equals(secondLastName)){
                        playersResult.add(player);
                    }
                }
            } else {
                if(primaryLastName != null){
                    if(secondLastName != null){
                        if(player.getPrimaryLastName().equals(primaryLastName) && player.getSecondLastName().equals(secondLastName) && 
                        player.getPlayerName().equals(name)){
                            playersResult.add(player);
                        }
                    } else{
                        if(player.getPrimaryLastName().equals(primaryLastName) && player.getPlayerName().equals(name)){
                            playersResult.add(player);
                        }
                    }
                } else {
                    if(secondLastName != null){
                        if(player.getSecondLastName().equals(secondLastName) && player.getPlayerName().equals(name)){
                            playersResult.add(player);
                        }
                    } else{
                        if(player.getPlayerName().equals(name)){
                            playersResult.add(player);
                        }
                    }
                }
            }
        }
        return playersResult;
    }

    @Override
    public Player findPlayerByDni(Long teamId, String dni) throws InstanceNotFoundException, IncorrectDniException {
        
        if (!Validations.isValidDni(dni)) {
            throw new IncorrectDniException(dni);
        }

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        Player playerFound = null;
        List<Player> players = playerDao.findByTeamId(teamId);
        
        for (Player player : players) {
            if(player.getDni().equals(dni)){
                playerFound = player;
            }
        }

        if (playerFound == null) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        return playerFound;
    }

    @Override
    public List<Player> findPlayersByPositionAndTeam(Long teamId, Position position) {
        return null;
    }

    @Override
    public void removePlayer(Long teamId, Long playerId) {
    }

    @Override
    public Player updatePlayer(Long teamId, Long playerId, String playerName, String primaryLastName,
            String secondLastName, Position position, String trends, String phoneNumber, String email, String dni) {
        return null;
    }
}