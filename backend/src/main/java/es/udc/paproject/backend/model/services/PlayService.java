package es.udc.paproject.backend.model.services;

import java.util.List;

import es.udc.paproject.backend.model.entities.Play;
import es.udc.paproject.backend.model.exceptions.IncorrectPlayTypeException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedPlayException;

public interface PlayService {
    
    Play addPlay(String title, String playType, String gesture, String pointGuardText, String shootingGuardText,
    String smallForwardText, String powerForwardText, String centerText) throws IncorrectPlayTypeException;

    void addPlayToTeam(Long teamId, Long playId) throws InstanceNotFoundException;

    Play findPlayById(Long playId) throws InstanceNotFoundException;

    List<Play> findPlaysByTeamId(Long teamId) throws InstanceNotFoundException;

    List<Play> findPlaysByTypeAndTeam(Long teamId, String playType) throws InstanceNotFoundException;

    void removePlay(Long playId) throws InstanceNotFoundException, UsedPlayException;

    void removePlayToTeam(Long playId, Long teamId) throws InstanceNotFoundException;


    Play updatePlay(Long playId, Long teamId, String title, String playType, String gesture, String pointGuardText, String shootingGuardText,
    String smallForwardText, String powerForwardText, String centerText) throws InstanceNotFoundException, IncorrectPlayTypeException;

}