package es.udc.paproject.backend.model.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.entities.Game;
import es.udc.paproject.backend.model.entities.GameDao;
import es.udc.paproject.backend.model.entities.GameStatistics;
import es.udc.paproject.backend.model.entities.GameStatisticsDao;
import es.udc.paproject.backend.model.entities.PlayerDao;
import es.udc.paproject.backend.model.entities.PlayerGameStatistics;
import es.udc.paproject.backend.model.entities.PlayerGameStatisticsDao;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private PlayerDao playerDao;

    @Autowired
    private GameDao gameDao;

    @Autowired
    private PlayerGameStatisticsDao playerGameStatisticsDao;

    @Autowired
    private GameStatisticsDao gameStatisticsDao;

    @Override
    public void addStatisticsToGame(Long gameId, Integer totalPoints, Integer durationMinutes,
            Integer totalThreePointShots, Integer totalSetShots, Integer totalFreeShots, Integer totalRebounds,
            Integer totalBlockedShot, Integer totalAssists, Integer totalPersonalFouls, Integer totalTechnicalFouls,
            Integer totalUnsportsmanlikeFouls, Integer totalPointsRival, Integer totalThreePointShotsRival,
            Integer totalSetShotsRival, Integer totalFreeShotsRival, Integer totalReboundsRival,
            Integer totalBlockedShotsRival, Integer totalAssistsRival, Integer totalPersonalFoulsRival,
            Integer totalTechnicalFoulsRival, Integer totalUnsportsmanlikeFoulsRival) throws InstanceNotFoundException {
                
        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }

        GameStatistics gameStatistics =  new GameStatistics(totalPoints, durationMinutes, totalThreePointShots, totalSetShots, totalFreeShots, totalRebounds, totalBlockedShot, totalAssists, totalPersonalFouls, totalTechnicalFouls, totalUnsportsmanlikeFouls, totalPointsRival, totalThreePointShotsRival, totalSetShotsRival, totalFreeShotsRival, totalReboundsRival, totalBlockedShotsRival, totalAssistsRival, totalPersonalFoulsRival, totalTechnicalFoulsRival, totalUnsportsmanlikeFoulsRival);
        Game game = gameDao.findById(gameId).get();
        //al tener cascade ALL lo creo statistics en game y ya se pasa a gameStatistics
        game.setGameStatistics(gameStatistics);
        gameDao.save(game);
    }

    @Override
    public void addStatisticsToPlayer(Long gameId, Long playerId, Integer totalPoints, Integer minutes,
            Integer threePointShots, Integer setShots, Integer freeShots, Integer failThreePointShots,
            Integer failSetShots, Integer failFreeShots, Integer rebounds, Integer blockedShot, Integer assists,
            Integer personalFouls, Integer technicalFouls, Integer unsportsmanlikeFouls)
            throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<PlayerGameStatistics> playerGameStatistics = playerGameStatisticsDao.findByPlayerIdAndGameId(playerId, gameId);

        if(totalPoints != null) {
            playerGameStatistics.get(0).setTotalPoints(totalPoints);
        }
        if(minutes != null) {
            playerGameStatistics.get(0).setMinutes(minutes);
        }
        if(threePointShots != null) {
            playerGameStatistics.get(0).setThreePointShots(threePointShots);
        }
        if(setShots != null) {
            playerGameStatistics.get(0).setSetShots(setShots);
        }
        if(freeShots != null) {
            playerGameStatistics.get(0).setFreeShots(freeShots);
        }
        if(failThreePointShots != null) {
            playerGameStatistics.get(0).setFailThreePointShots(failThreePointShots);
        }
        if(failSetShots != null) {
            playerGameStatistics.get(0).setFailSetShots(failSetShots);
        }
        if(failFreeShots != null) {
            playerGameStatistics.get(0).setFailFreeShots(failFreeShots);
        }
        if(rebounds != null) {
            playerGameStatistics.get(0).setRebounds(rebounds);
        }
        if(blockedShot != null) {
            playerGameStatistics.get(0).setBlockedShot(blockedShot);
        }
        if(assists != null) {
            playerGameStatistics.get(0).setAssists(assists);
        }
        if(personalFouls != null) {
            playerGameStatistics.get(0).setPersonalFouls(personalFouls);
        }
        if(technicalFouls != null) {
            playerGameStatistics.get(0).setTechnicalFouls(technicalFouls);
        }
        if(unsportsmanlikeFouls != null) {
            playerGameStatistics.get(0).setUnsportsmanlikeFouls(unsportsmanlikeFouls);
        }
        
        playerGameStatisticsDao.save(playerGameStatistics.get(0));
    }

    @Override
    public GameStatistics findGameStatisticsById(Long gameStatisticsId) throws InstanceNotFoundException {

        if (!gameStatisticsDao.existsById(gameStatisticsId)) {
            throw new InstanceNotFoundException("project.entities.statistics");
        }

        GameStatistics gameStatistics = gameStatisticsDao.findById(gameStatisticsId).get();

        return gameStatistics;
    }

    @Override
    public GameStatistics findStatisticsByGame(Long gameId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        Game game = gameDao.findById(gameId).get();

        if (!gameStatisticsDao.existsById(game.getGameStatistics().getId())) {
            throw new InstanceNotFoundException("project.entities.statistics");
        }

        GameStatistics gameStatistics = game.getGameStatistics();
        return gameStatistics;
    }

    @Override
    public void removeStatisticsToGame(Long gameId, Long statisticsId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        Game game = gameDao.findById(gameId).get();
        GameStatistics gameStatistics = game.getGameStatistics();

        game.setGameStatistics(null);
        gameDao.save(game);
        gameStatisticsDao.delete(gameStatistics);
    }

    @Override
    public void removeStatisticsToPlayerOfGame(Long playerId, Long gameId) throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<PlayerGameStatistics> playerGameStatisticsPrev = playerGameStatisticsDao.findByPlayerIdAndGameId(playerId, gameId);

        PlayerGameStatistics playerGameStatistics =  playerGameStatisticsPrev.get(0);
        playerGameStatistics.setTotalPoints(null);
        playerGameStatistics.setMinutes(null);
        playerGameStatistics.setThreePointShots(null);
        playerGameStatistics.setSetShots(null);
        playerGameStatistics.setFreeShots(null);
        playerGameStatistics.setFailThreePointShots(null);
        playerGameStatistics.setFailSetShots(null);
        playerGameStatistics.setFailFreeShots(null);
        playerGameStatistics.setRebounds(null);
        playerGameStatistics.setBlockedShot(null);
        playerGameStatistics.setAssists(null);
        playerGameStatistics.setPersonalFouls(null);
        playerGameStatistics.setTechnicalFouls(null);
        playerGameStatistics.setUnsportsmanlikeFouls(null);
    }

    @Override
    public GameStatistics updateGameStatistics(Long gameId, Integer totalPoints, Integer durationMinutes,
            Integer totalThreePointShots, Integer totalSetShots, Integer totalFreeShots, Integer totalRebounds,
            Integer totalBlockedShot, Integer totalAssists, Integer totalPersonalFouls, Integer totalTechnicalFouls,
            Integer totalUnsportsmanlikeFouls, Integer totalPointsRival, Integer totalThreePointShotsRival,
            Integer totalSetShotsRival, Integer totalFreeShotsRival, Integer totalReboundsRival,
            Integer totalBlockedShotsRival, Integer totalAssistsRival, Integer totalPersonalFoulsRival,
            Integer totalTechnicalFoulsRival, Integer totalUnsportsmanlikeFoulsRival) throws InstanceNotFoundException {

                

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        Game game = gameDao.findById(gameId).get();
        GameStatistics gameStatistics = new GameStatistics(totalPoints, durationMinutes, totalThreePointShots, totalSetShots, totalFreeShots, totalRebounds, totalBlockedShot, totalAssists, totalPersonalFouls, totalTechnicalFouls, totalUnsportsmanlikeFouls, totalPointsRival, totalThreePointShotsRival, totalSetShotsRival, totalFreeShotsRival, totalReboundsRival, totalBlockedShotsRival, totalAssistsRival, totalPersonalFoulsRival, totalTechnicalFoulsRival, totalUnsportsmanlikeFoulsRival);

        game.setGameStatistics(gameStatistics);
        gameDao.save(game);
        return gameStatistics;
    }

    @Override
    public PlayerGameStatistics findStatisticsByPlayerAndGame(Long playerId, Long gameId)
            throws InstanceNotFoundException {

        if (!gameDao.existsById(gameId)) {
            throw new InstanceNotFoundException("project.entities.game");
        }
        if (!playerDao.existsById(playerId)) {
            throw new InstanceNotFoundException("project.entities.player");
        }

        List<PlayerGameStatistics> playerGameStatisticsPrev = playerGameStatisticsDao.findByPlayerIdAndGameId(playerId, gameId);

        return playerGameStatisticsPrev.get(0);
    }

    @Override
    public PlayerGameStatistics updatePlayerGameStatistics(Long playerId, Long gameId, Integer totalPoints, Integer minutes,
            Integer threePointShots, Integer setShots, Integer freeShots, Integer failThreePointShots,
            Integer failSetShots, Integer failFreeShots, Integer rebounds, Integer blockedShot, Integer assists,
            Integer personalFouls, Integer technicalFouls, Integer unsportsmanlikeFouls)
            throws InstanceNotFoundException {

                if (!gameDao.existsById(gameId)) {
                    throw new InstanceNotFoundException("project.entities.game");
                }
                if (!playerDao.existsById(playerId)) {
                    throw new InstanceNotFoundException("project.entities.player");
                }
        
                List<PlayerGameStatistics> playerGameStatisticsPrev = playerGameStatisticsDao.findByPlayerIdAndGameId(playerId, gameId);
                PlayerGameStatistics playerGameStatistics =  playerGameStatisticsPrev.get(0);

                if(totalPoints != null) {
                    playerGameStatistics.setTotalPoints(totalPoints);
                }
                if(minutes != null) {
                    playerGameStatistics.setMinutes(minutes);
                }
                if(threePointShots != null) {
                    playerGameStatistics.setThreePointShots(threePointShots);
                }
                if(setShots != null) {
                    playerGameStatistics.setSetShots(setShots);
                }
                if(freeShots != null) {
                    playerGameStatistics.setFreeShots(freeShots);
                }
                if(failThreePointShots != null) {
                    playerGameStatistics.setFailThreePointShots(failThreePointShots);
                }
                if(failSetShots != null) {
                    playerGameStatistics.setFailSetShots(failSetShots);
                }
                if(failFreeShots != null) {
                    playerGameStatistics.setFailFreeShots(failFreeShots);
                }
                if(rebounds != null) {
                    playerGameStatistics.setRebounds(rebounds);
                }
                if(blockedShot != null) {
                    playerGameStatistics.setBlockedShot(blockedShot);
                }
                if(assists != null) {
                    playerGameStatistics.setAssists(assists);
                }
                if(personalFouls != null) {
                    playerGameStatistics.setPersonalFouls(personalFouls);
                }
                if(technicalFouls != null) {
                    playerGameStatistics.setTechnicalFouls(technicalFouls);
                }
                if(unsportsmanlikeFouls != null) {
                    playerGameStatistics.setUnsportsmanlikeFouls(unsportsmanlikeFouls);
                }

                playerGameStatisticsDao.save(playerGameStatistics);

                return playerGameStatistics;
    }
    
}