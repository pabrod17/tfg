package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.GameStatistics;
import es.udc.paproject.backend.model.entities.PlayerGameStatistics;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;

public interface Statistics {
    
    void createStatisticsToGame(Long gameId, Integer totalPoints, Integer durationMinutes, Integer totalThreePointShots, Integer totalSetShots,
    Integer totalFreeShots, Integer totalRebounds, Integer totalBlockedShot, Integer totalAssists,
    Integer totalPersonalFouls, Integer totalTechnicalFouls, Integer totalUnsportsmanlikeFouls,
    Integer totalPointsRival, Integer totalThreePointShotsRival, Integer totalSetShotsRival,
    Integer totalFreeShotsRival, Integer totalReboundsRival, Integer totalBlockedShotsRival,
    Integer totalAssistsRival, Integer totalPersonalFoulsRival, Integer totalTechnicalFoulsRival,
    Integer totalUnsportsmanlikeFoulsRival);

    //Aqui meto las estadisticas en la fila que cree en addPlayerToGame
    void addStatisticsToPlayer(Long gameId, Long playerId, Integer totalPoints, Integer minutes,
    Integer threePointShots, Integer setShots, Integer freeShots, Integer failThreePointShots,
    Integer failSetShots, Integer failFreeShots, Integer rebounds, Integer blockedShot, Integer assists,
    Integer personalFouls, Integer technicalFouls, Integer unsportsmanlikeFouls);

    GameStatistics findGameStatisticsById(Long gameStatisticsId);

    GameStatistics findStatisticsByGame(Long gameId);
    //habria que crear otro objeto en el front en el reducer que se llame PlayerGameStatistics
    PlayerGameStatistics findStatisticsByPlayerAndGame(Long playerId, Long gameId);

    //se borra el objeto statisticas de game
    void removeStatisticsToGame(Long gameId, Long statisticsId) throws InstanceNotFoundException;

    //no se borra la relacion solo las estadisticas o se ponen a cero
    void removeStatisticsToPlayerOfGame(Long playerId, Long gameId) throws InstanceNotFoundException;

    GameStatistics updateGameStatistics(Long gameId, Integer totalPoints, Integer durationMinutes, Integer totalThreePointShots, Integer totalSetShots,
    Integer totalFreeShots, Integer totalRebounds, Integer totalBlockedShot, Integer totalAssists,
    Integer totalPersonalFouls, Integer totalTechnicalFouls, Integer totalUnsportsmanlikeFouls,
    Integer totalPointsRival, Integer totalThreePointShotsRival, Integer totalSetShotsRival,
    Integer totalFreeShotsRival, Integer totalReboundsRival, Integer totalBlockedShotsRival,
    Integer totalAssistsRival, Integer totalPersonalFoulsRival, Integer totalTechnicalFoulsRival,
    Integer totalUnsportsmanlikeFoulsRival) throws InstanceNotFoundException;
}