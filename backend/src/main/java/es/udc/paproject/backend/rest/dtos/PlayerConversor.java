package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.stream.Collectors;

import es.udc.paproject.backend.model.entities.Player;

public class PlayerConversor {

    public PlayerConversor() {
    }
    
    public final static PlayerDto toPlayerDto(Player player) {
        return new PlayerDto(player.getId(), player.getPlayerName(), player.getPrimaryLastName(), player.getSecondLastName(), player.getPosition(),
        player.getTrends(), player.getPhoneNumber(), player.getEmail(), player.getDni(), player.getTeam().getId());
    }

    public final static List<PlayerDto> toPlayerDtos(List<Player> players) {
        return players.stream().map(c -> toPlayerDto(c)).collect(Collectors.toList());
    }
}