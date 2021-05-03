package es.udc.paproject.backend.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import es.udc.paproject.backend.model.entities.Play;
import es.udc.paproject.backend.model.entities.PlayDao;
import es.udc.paproject.backend.model.entities.PlayTeam;
import es.udc.paproject.backend.model.entities.PlayTeamDao;
import es.udc.paproject.backend.model.entities.PlayType;
import es.udc.paproject.backend.model.entities.Team;
import es.udc.paproject.backend.model.entities.TeamDao;
import es.udc.paproject.backend.model.exceptions.IncorrectPlayTypeException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.UsedPlayException;

public class PlayServiceImpl implements PlayService {

    @Autowired
    private PlayDao playDao;

    @Autowired
    private PlayTeamDao playTeamDao;

    @Autowired
    private TeamDao teamDao;

    @Override
    public Play addPlay(String title, String playType, String gesture, String pointGuardText, String shootingGuardText,
            String smallForwardText, String powerForwardText, String centerText) throws IncorrectPlayTypeException {

        if (!playType.equals("Attack") && !playType.equals("Defense")) {
            throw new IncorrectPlayTypeException(playType);
        }

        PlayType playTypeEnum = PlayType.valueOf(playType);
        Play play = new Play(title, playTypeEnum, gesture, pointGuardText, shootingGuardText, smallForwardText, powerForwardText, centerText);

        playDao.save(play);

        return play;
    }

    @Override
    public void addPlayToTeam(Long teamId, Long playId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }
        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        Play play = playDao.findById(playId).get();
        Team team = teamDao.findById(teamId).get();
        PlayTeam playTeam = new PlayTeam(play, team);

        playTeamDao.save(playTeam);
    }

    @Override
    public Play findPlayById(Long playId) throws InstanceNotFoundException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        Play play = playDao.findById(playId).get();
        return play;
    }

    @Override
    public List<Play> findPlaysByTeamId(Long teamId) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<PlayTeam> playTeams = playTeamDao.findByTeamId(teamId);

        if (playTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        List<Play> plays = new ArrayList<>();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null) {
                plays.add(playTeam.getPlay());
            }
        }

        if (plays.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.play");
        }
        
        plays = plays.stream().distinct().collect(Collectors.toList());
        return plays;
    }

    @Override
    public List<Play> findPlaysByTypeAndTeam(Long teamId, String playType) throws InstanceNotFoundException {

        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<PlayTeam> playTeams = playTeamDao.findByTeamId(teamId);

        if (playTeams.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        List<Play> plays = new ArrayList<>();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null && playTeam.getPlay().getPlayType().equals(playType)) {
                plays.add(playTeam.getPlay());
            }
        }

        if (plays.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        plays = plays.stream().distinct().collect(Collectors.toList());
        return plays;
    }

    @Override
    public void removePlay(Long playId) throws InstanceNotFoundException, UsedPlayException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        List<PlayTeam> playTeams = (List<PlayTeam>) playTeamDao.findAll();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null && playTeam.getPlay().getId() == playId) {
                throw new UsedPlayException(playTeam.getPlay().getTitle());
            }
        }

        Play play = playDao.findById(playId).get();
        playDao.delete(play);
    }

    @Override
    public void removePlayToTeam(Long playId, Long teamId) throws InstanceNotFoundException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }
        if (!teamDao.existsById(teamId)) {
            throw new InstanceNotFoundException("project.entities.team");
        }

        List<PlayTeam> playTeams = (List<PlayTeam>) playTeamDao.findAll();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null && playTeam.getPlay().getId() == playId) {
                playTeamDao.delete(playTeam);
            }
        }
    }

    @Override
    public Play updatePlay(Long playId, Long teamId, String title, String playType, String gesture,
            String pointGuardText, String shootingGuardText, String smallForwardText, String powerForwardText,
            String centerText) throws InstanceNotFoundException, IncorrectPlayTypeException {

        if (!playDao.existsById(playId)) {
            throw new InstanceNotFoundException("project.entities.play");
        }

        if (!playType.equals("Attack") && !playType.equals("Defense")) {
            throw new IncorrectPlayTypeException(playType);
        }
        Play updatedPlay = null;
        Long id = (long) -1;
        List<PlayTeam> playTeams = (List<PlayTeam>) playTeamDao.findAll();
        for (PlayTeam playTeam : playTeams) {
            if(playTeam.getPlay() != null && playTeam.getPlay().getId() == playId) {
                id = playTeam.getPlay().getId();
                updatedPlay = playTeam.getPlay();
                if(updatedPlay.getTitle() != null)
                    updatedPlay.setTitle(title);
                if(updatedPlay.getPlayType() != null)
                    updatedPlay.setPlayType(playType);
                if(updatedPlay.getGesture() != null)
                    updatedPlay.setGesture(gesture);
                if(updatedPlay.getPointGuardText() != null)
                    updatedPlay.setPointGuardText(pointGuardText);
                if(updatedPlay.getShootingGuardText() != null)
                    updatedPlay.setShootingGuardText(shootingGuardText);
                if(updatedPlay.getSmallForwardText() != null)
                    updatedPlay.setSmallForwardText(smallForwardText);
                if(updatedPlay.getPowerForwardText() != null)
                    updatedPlay.setPowerForwardText(powerForwardText);
                if(updatedPlay.getCenterText() != null)
                    updatedPlay.setCenterText(centerText);
                playTeamDao.save(playTeam);
            }
        }

        if(id == -1){
            updatedPlay = playDao.findById(playId).get();
            if(updatedPlay.getTitle() != null)
                updatedPlay.setTitle(title);
            if(updatedPlay.getPlayType() != null)
                updatedPlay.setPlayType(playType);
            if(updatedPlay.getGesture() != null)
                updatedPlay.setGesture(gesture);
            if(updatedPlay.getPointGuardText() != null)
                updatedPlay.setPointGuardText(pointGuardText);
            if(updatedPlay.getShootingGuardText() != null)
                updatedPlay.setShootingGuardText(shootingGuardText);
            if(updatedPlay.getSmallForwardText() != null)
                updatedPlay.setSmallForwardText(smallForwardText);
            if(updatedPlay.getPowerForwardText() != null)
                updatedPlay.setPowerForwardText(powerForwardText);
            if(updatedPlay.getCenterText() != null)
                updatedPlay.setCenterText(centerText);
            playDao.save(updatedPlay);
        }

        return updatedPlay;
    }
}